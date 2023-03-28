package com.daq.interfaces.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.daq.domain.dto.FormAuditAndApplication;
import com.daq.domain.entity.FormAudit;
import com.daq.domain.entity.User;
import com.daq.domain.service.FormAuditService;
import com.daq.domain.service.JoinGroupRequestService;
import com.daq.domain.service.JoinInstRequestService;
import com.daq.domain.service.UserService;
import com.daq.infrastructure.result.JsonResultWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.swing.event.ChangeEvent;
import java.util.*;

@RestController

public class FormAuditController {
    @Autowired
    private FormAuditService formAuditService;

    @Autowired
    private UserService userService;

    @Autowired
    private JoinInstRequestService joinInstRequestService;

    @Autowired
    private JoinGroupRequestService joinGroupRequestService;

    /**
     * 查看审核信息
     *
     * @param status
     * @param forMe
     * @return
     */
//    @GetMapping("/api/audit")
//    public JsonResultWrapper getAuditInfo(@RequestParam(value = "status") String status, @RequestParam(value = "forMe") Boolean forMe) {
//        Map<String, Object> rst = new HashMap<>();
//
//        List<FormAudit> returnList = formAuditService.getAuditInfoByAuditorId(userService.getCurrentUser().getId());
//        rst.put("data", returnList);
//
//        return new JsonResultWrapper(true, rst);
//    }

    @GetMapping("/api/audit")
    public JsonResultWrapper getAuditInfo(@RequestParam(value = "status") String status, @RequestParam(value = "forMe") Boolean forMe) {
        Map<String, Object> rst = new HashMap<>();

        List<FormAuditAndApplication> returnList = formAuditService.getApplicationsByAuditorIdAndStatus(userService.getCurrentUser().getId(), status);
        List<JSON> formJsonList = new ArrayList<JSON>();
        returnList.forEach(one -> {
            JSONObject formJson = new JSONObject();
            formJson.put("status",one.getStatus());
            formJson.put("applicantId",one.getApplicant_id());
            formJson.put("applicationId",one.getApplication_id());
            formJson.put("applicantName",userService.getUserById(one.getApplicant_id()).getUsername());
            formJson.put("submissionTime",one.getSubmission_date());
            formJson.put("title", one.getTitle());
            formJson.put("auditorId",one.getAuditor_id());
            formJsonList.add(formJson);
        });
        return new JsonResultWrapper(true, formJsonList);
    }

    /**
     * 插入审批结果
     *
     * @param id
     * @param request
     * @return
     */
    @PostMapping("/api/audit/{id}")
    public JsonResultWrapper postAuditInfo(@PathVariable(value = "id") Integer id, HttpServletRequest request) {
        Integer currentUserId = userService.getCurrentUser().getId();
        String status = request.getParameter("status");
        String note = request.getParameter("note");
        FormAudit formAudit = formAuditService.getFormAuditById(id);
        if(formAudit.getAuditor_id().equals(currentUserId)) {
            formAudit.setStatus(status);
            formAudit.setNote(note);
            formAudit.setSubmission_time(new Date());
            formAuditService.updateAuditInfo(formAudit);
            //TODO: After Pass

            //判断自己是否是最后一级,以及之前的是否都pass
            //Differ from EventType
            //获得总的审批人个数，判断自己是不是最后一个
            Integer formAuditorsNumber = formAuditService.getAuditNumberByApplicationId(formAudit.getApplication_id());
            if(formAuditorsNumber.equals(formAudit.getAuditor_order()) && Objects.equals(status, "pass")){
                Integer applicantId = formAuditService.getApplicantIdByAuditId(id);

                String formDetailsString = formAuditService.getFormDetailsByAuditId(id);
                JSONObject formDetailsJson = JSONObject.parseObject(formDetailsString);
                switch(formAuditService.getFormTitleByAuditId(id)){
                    case "Change Inst.":
                        Date planTime = formDetailsJson.getDate("planTime");
                        //String
                        break;
                    case "Exit Inst.":

                        break;
                    case "New Fund":
                        break;
                    case "Change Identity":
                        break;
                    case "Change WorkType":
                        break;
                    case "Change Information":
                        String title = formDetailsJson.getString("title");
                        String address = formDetailsJson.getString("address");
                        String initials = formDetailsJson.getString("initials");
                        String tel_phone = formDetailsJson.getString("tel_phone");
                        String last_name = formDetailsJson.getString("last_name");
                        String first_name = formDetailsJson.getString("first_name");
                        String contact_email = formDetailsJson.getString("contact_email");
                        User user = userService.getUserById(applicantId);
                        user.setTitle(title);
                        user.setAddress(address);
                        user.setInitials(initials);
                        user.setTel_phone(tel_phone);
                        user.setLast_name(last_name);
                        user.setFirst_name(first_name);
                        user.setContact_email(contact_email);



                        break;
                    default:
                        break;

                }
            }




            return new JsonResultWrapper(true);


        }
        else{
            return new JsonResultWrapper(false);
        }
    }

    /**
     * 审批大厅，返回未审批的数量
     */
    @GetMapping("/api/audit-hall-prompt-count")
    public JsonResultWrapper getHallPromptCount(){
        Integer currentUserId = userService.getCurrentUser().getId();
        Integer groupRequestNumber = joinGroupRequestService.getMyGroupRequestsNumber(currentUserId, "pending");
        Integer groupApprovalNumber = joinGroupRequestService.getMyGroupApprovalsNumber(currentUserId, "pending");
        Integer instRequestNumber = joinInstRequestService.getMyInstRequestsNumber(currentUserId, "pending");
        Integer instApprovalNumber = joinInstRequestService.getMyInstApprovalsNumber(currentUserId, "pending");
        Integer personalInfoNumber = formAuditService.getAuditNumberByAuditorId(currentUserId, "Change Information", "pending");
        Integer newFundNumber = formAuditService.getAuditNumberByAuditorId(currentUserId, "New Fund", "pending");
        Integer changeInstNumber = formAuditService.getAuditNumberByAuditorId(currentUserId, "Change Inst.", "pending");
        Integer exitInstNumber = formAuditService.getAuditNumberByAuditorId(currentUserId, "Exit Inst.", "pending");
        Integer identityNumber = formAuditService.getAuditNumberByAuditorId(currentUserId, "Change Identity", "pending");
        Integer worktypeNumber = formAuditService.getAuditNumberByAuditorId(currentUserId, "Change WorkType", "pending");
        JSONObject formJson = new JSONObject();
        formJson.put("join_group_request", groupApprovalNumber);
        formJson.put("join_inst_request", instApprovalNumber);
        formJson.put("generic_request", personalInfoNumber + newFundNumber + changeInstNumber + exitInstNumber + identityNumber + worktypeNumber);
        return new JsonResultWrapper(true, formJson);
    }



}
