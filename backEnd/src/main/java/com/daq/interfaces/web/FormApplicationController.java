package com.daq.interfaces.web;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.daq.domain.dto.FormApplicationAndApply;
import com.daq.domain.entity.FormApplication;
import com.daq.domain.entity.FormApply;
import com.daq.domain.entity.FormAudit;
import com.daq.domain.service.FormApplicationService;
import com.daq.domain.service.FormApplyService;
import com.daq.domain.service.FormAuditService;
import com.daq.domain.service.UserService;
import com.daq.infrastructure.result.JsonResultWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */
@RestController
public class FormApplicationController {
    @Autowired
    private FormApplicationService formApplicationService;

    @Autowired
    private FormAuditService formAuditService;

    @Autowired
    private FormApplyService formApplyService;


    @Autowired
    private UserService userService;


    /**
     * 插入申请
     *
     * @param request
     * @return
     */
    @PostMapping("/api/applications")
    public JsonResultWrapper insertForm(@RequestBody String body) {
        JSONObject bodyMap = (JSONObject) JSON.parse(body);
        JSONObject formData = (JSONObject) bodyMap.get("formData");

        FormApplication formApplication = new FormApplication();
        formApplication.setApplicant_id(userService.getCurrentUserId());
        formApplication.setForm_id((int) bodyMap.get("formId"));
        formApplication.setSubmit(JSON.toJSONString(bodyMap.get("formData")));
        formApplication.setSubmission_date(new Date());
        formApplicationService.insertFormApplication(formApplication);
        Map<String, Object> rst = new HashMap<>();

        FormApply formApply = formApplyService.getFormApplyById((int) bodyMap.get("formId"));
        ArrayList<String> keys = new ArrayList<>();
        ArrayList<Integer> auditorIds = new ArrayList<>();
        ArrayList<String> roles = new ArrayList<>();
        JSONObject o = JSON.parseObject(formApply.getDesign());
        JSONArray inputs = (JSONArray) o.get("input");
        inputs.forEach((i) -> {
            JSONObject row = (JSONObject) i;
            if (row.get("type").equals("selectAuditor")) {
                keys.add((String) row.get("key"));
                auditorIds.add((Integer) formData.get(row.get("key")));
                roles.add((String) row.get("role"));
                // TODO: check role valid
            }
        });

        for (int i = 0; i < keys.size(); i++) {
            FormAudit formAudit = new FormAudit();
            formAudit.setStatus("pending");
            formAudit.setAuditor_id(auditorIds.get(i));
            formAudit.setNote("");
            formAudit.setApplication_id(formApplication.getId());
            formAudit.setAuditor_order(i + 1);
            formAuditService.insertAuditInfo(formAudit);
        }

        rst.put("id", formApplication.getId());
        return new JsonResultWrapper(true, rst);
    }

    /**
     * 获取表单信息
     *
     * @param id
     * @return
     */
    @GetMapping("/api/application/{Id}")
    public JsonResultWrapper getApplication(@PathVariable("Id") Integer id, @RequestParam("joinAudit") Boolean joinAudit, @RequestParam("joinAudit") Boolean joinForm) {
        FormApplication formApplication = formApplicationService.getFormApplicationById(id);


        FormApply formApply = formApplyService.getFormApplyById(formApplication.getForm_id());
        Map<String, Object> form = new HashMap<>();
        form.put("id", formApply.getId());
        form.put("title", formApply.getTitle());
        form.put("design", JSON.parseObject(formApply.getDesign()));

        Map<String, Object> rst = new HashMap<>();
        rst.put("formId", id);
        rst.put("form", form);
        rst.put("applicantId", formApplication.getApplicant_id());
        rst.put("id", formApplication.getId());
        rst.put("formData", JSON.parseObject(formApplication.getSubmit()));
        if (joinAudit.equals(Boolean.TRUE)) {
            List<FormAudit> formAuditList = formAuditService.getAuditInfoByApplicationId(id);
            rst.put("audits", formAuditList);
            JSONObject auditorNameMap = new JSONObject();
            formAuditList.forEach((x) -> {
                auditorNameMap.put(x.getAuditor_id().toString(), userService.getUserById(x.getAuditor_id()).getUsername());
            });
            rst.put("auditorNameMap", auditorNameMap);
        }
        return new JsonResultWrapper(true, rst);
    }

//    @PostMapping("/api/form/application/{applicationId}/grant")
//    public JsonResultWrapper audit(@PathVariable Integer applicationId, @RequestParam(value = "status")Integer status, @RequestParam(value = "note")String note){
//        //Subject currentUser = SecurityUtils.getSubject();
//        //currentUser = currentUser.getPrincipal();
//        FormAudit formAudit = new FormAudit();
//        formAudit.setApplication_id(applicationId);
//        formAudit.setNote(note);
//        formAudit.setStatus(status);
//
//        int rst = formAuditService.insertAuditInfo(formAudit);
//        return new JsonResultWrapper(true);
//    }

    @GetMapping("/api/myApplications")
    public JsonResultWrapper getMyApplications() {
        //Map<String, Object> rst = new HashMap<>();
        Integer currentUserId = userService.getCurrentUser().getId();
        List<FormApplicationAndApply> returnList = formApplicationService.getApplicationsByApplicantId(currentUserId);
        List<JSON> formJsonList = new ArrayList<JSON>();
        returnList.forEach(one -> {
            JSONObject formJson = new JSONObject();
            formJson.put("id", one.getId());
            formJson.put("submit", JSON.parseObject(one.getSubmit()));
            formJson.put("applicantId", one.getApplicant_id());
            formJson.put("title", one.getTitle());
            formJson.put("submissionTime", one.getSubmission_date());
            formJsonList.add(formJson);
        });
        return new JsonResultWrapper(true, formJsonList);
    }


}
