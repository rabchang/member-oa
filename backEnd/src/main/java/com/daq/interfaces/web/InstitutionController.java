package com.daq.interfaces.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.daq.domain.dto.FormAuditAndApplication;
import com.daq.domain.dto.InstitutionInfo;
import com.daq.domain.entity.Institution;
import com.daq.domain.entity.InstitutionUser;
import com.daq.domain.entity.JoinGroupRequest;
import com.daq.domain.entity.JoinInstRequest;
import com.daq.domain.service.*;
import com.daq.infrastructure.result.JsonResultWrapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.swing.*;
import java.util.*;

@RestController
@Slf4j
public class InstitutionController {

    @Autowired
    private InstitutionService institutionService;

    @Autowired
    private JoinInstRequestService joinInstRequestService;

    @Autowired
    private UserService userService;

    @Autowired
    private InstitutionUserService institutionUserService;

    @Autowired
    private UserInstGroupRelationService userInstGroupRelationService;

    @GetMapping("/api/institutions")
    public JsonResultWrapper getInstituions(@RequestParam(value = "group_id", required = false) String group_id){
        Map<String, Object> rst = new HashMap<>();
        List<Institution> returnList = institutionService.getAll();
        if(returnList != null) {
            List<JSON> formJsonList = new ArrayList<JSON>();
            returnList.forEach(one -> {
                JSONObject formJson = new JSONObject();
                formJson.put("id", one.getId());
                formJson.put("name", one.getAbbreviation_name());
                formJson.put("fullName", one.getFull_name());
                formJson.put("address", one.getAddress1());
                formJson.put("address2", one.getAddress2());
                formJson.put("address3", one.getAddress3());
                formJson.put("address4", one.getAddress4());
                formJson.put("address5", one.getAddress5());
                formJsonList.add(formJson);
            });
            return new JsonResultWrapper(true, formJsonList);
        }else {
            List list = new ArrayList();
            return new JsonResultWrapper(false, list);
        }
    }

    @GetMapping("/api/institutions-info")
    public JsonResultWrapper getInstituionsInfo(@RequestParam(value = "group_id") String group_id){
        Integer groupId = Integer.parseInt(group_id);
        List<InstitutionInfo> returnList = institutionService.getInstInfoByGroupId(groupId);
        return new JsonResultWrapper(true, returnList);
    }

    @GetMapping("/api/institution/{id}")
    public JsonResultWrapper getInstitutionById(@PathVariable("id") Integer id){

        return new JsonResultWrapper(true, institutionService.getInstitutionInfoByInstId(id));
    }

    //Apply to join Inst
    @PostMapping("/api/joinInstRequest")
    public JsonResultWrapper postjoinInstRequest(@RequestBody String body){
        JSONObject bodyMap = (JSONObject) JSON.parse(body);

        Integer currentUserId = userService.getCurrentUser().getId();
        JoinInstRequest joinInstRequest = new JoinInstRequest();
        Integer user_id = currentUserId;
        String identity =  (String)bodyMap.get("identity");
        String note = (String)bodyMap.get("note");
        String join_time = (String)bodyMap.get("joinTime");
        String leave_time = (String)bodyMap.get("leaveTime");
        String status = "pending";
        Integer inst_id = (Integer) bodyMap.get("inst_id");
        String worktype = (String)bodyMap.get("worktype");
        Date create_time = new Date();
        Integer group_id = (Integer)bodyMap.get("group_id");
        Integer ibId = userInstGroupRelationService.getUserIdByInstIdAndGroupIdAndIdentity(inst_id,group_id,"ib");

        joinInstRequest.setUser_id(user_id);
        joinInstRequest.setIdentity(identity);
        joinInstRequest.setNote(note);
        joinInstRequest.setJoin_time(new Date(Long.parseLong(join_time)));
        joinInstRequest.setLeave_time(new Date(Long.parseLong(leave_time)));
        joinInstRequest.setStatus(status);
        joinInstRequest.setCreate_time(create_time);
        joinInstRequest.setInst_id(inst_id);
        joinInstRequest.setWorktype(worktype);
        joinInstRequest.setIb(ibId);

        return new JsonResultWrapper(true, joinInstRequestService.insertJoinInstRequest(joinInstRequest));
    }

    // Get Join Inst Request List
    @GetMapping("/api/joinInstRequest")
    public JsonResultWrapper getJoinInstRequest(@RequestParam(value = "status", required = false) String status){
        Integer currentUserId = userService.getCurrentUser().getId();
        if(status != null) {
            List<JoinInstRequest> returnList = joinInstRequestService.getRequestsByUserAndStatus(currentUserId, status);
            if (returnList != null) {
                List<JSON> formJsonList = new ArrayList<JSON>();
                returnList.forEach(one -> {
                    JSONObject formJson = new JSONObject();
                    formJson.put("id", one.getId());
                    formJson.put("identity", one.getIdentity());
                    formJson.put("instId", one.getInst_id());
                    formJson.put("instName", institutionService.getInstitutionInfoByInstId(one.getInst_id()).getAbbreviation_name());
                    formJson.put("worktype", one.getWorktype());
                    formJson.put("createTime", one.getCreate_time());
                    formJson.put("joinTime", one.getJoin_time());
                    formJson.put("leaveTime", one.getLeave_time());
                    formJson.put("note", one.getNote());
                    formJson.put("userId", one.getUser_id());
                    formJson.put("userName", userService.getUserFisrtNameById(one.getUser_id()) + " " + userService.getUserLastNameById(one.getUser_id()));
                    formJson.put("status", one.getStatus());
                    formJsonList.add(formJson);
                });
                return new JsonResultWrapper(true, formJsonList);
            } else {
                List list = new ArrayList();
                return new JsonResultWrapper(false, list);
            }
        }else{
            List<JoinInstRequest> returnList = joinInstRequestService.getRequestsByUser(currentUserId);
            if (returnList != null) {
                List<JSON> formJsonList = new ArrayList<JSON>();
                returnList.forEach(one -> {
                    JSONObject formJson = new JSONObject();
                    formJson.put("id", one.getId());
                    formJson.put("identity", one.getIdentity());
                    formJson.put("instId", one.getInst_id());
                    formJson.put("instName", institutionService.getInstitutionInfoByInstId(one.getInst_id()).getAbbreviation_name());
                    formJson.put("worktype", one.getWorktype());
                    formJson.put("createTime", one.getCreate_time());
                    formJson.put("joinTime", one.getJoin_time());
                    formJson.put("leaveTime", one.getLeave_time());
                    formJson.put("note", one.getNote());
                    formJson.put("userId", one.getUser_id());
                    formJson.put("userName", userService.getUserFisrtNameById(one.getUser_id()) + " " + userService.getUserLastNameById(one.getUser_id()));
                    formJson.put("status", one.getStatus());
                    formJsonList.add(formJson);
                });
                return new JsonResultWrapper(true, formJsonList);
            } else {
                List list = new ArrayList();
                return new JsonResultWrapper(false, list);
            }
        }
    }
    @GetMapping("/api/joinInstRequest/{id}")
    public JsonResultWrapper getJoinInstRequestId(@PathVariable(value = "id") Integer id){
        JoinInstRequest joinInstRequest = joinInstRequestService.getRequestById(id);
        JSONObject formJson = new JSONObject();
        formJson.put("id", joinInstRequest.getId());
        formJson.put("identity", joinInstRequest.getIdentity());
        formJson.put("instId", joinInstRequest.getInst_id());
        formJson.put("instName", institutionService.getInstitutionInfoByInstId(joinInstRequest.getInst_id()).getAbbreviation_name());
        formJson.put("worktype", joinInstRequest.getWorktype());
        formJson.put("createTime", joinInstRequest.getCreate_time());
        formJson.put("joinTime", joinInstRequest.getJoin_time());
        formJson.put("leaveTime", joinInstRequest.getLeave_time());
        formJson.put("note", joinInstRequest.getNote());
        formJson.put("userId", joinInstRequest.getUser_id());
        formJson.put("userName", userService.getUserFisrtNameById(joinInstRequest.getUser_id()) + " " + userService.getUserLastNameById(joinInstRequest.getUser_id()));
        formJson.put("ibId", joinInstRequest.getIb());
        formJson.put("ibName", userService.getUserFisrtNameById(joinInstRequest.getIb()) + " " + userService.getUserLastNameById(joinInstRequest.getIb()));
        formJson.put("status", joinInstRequest.getStatus());
        return new JsonResultWrapper(true, joinInstRequest);
    }

    // Update Request By id and Action
    @PostMapping("/api/joinInstRequest/{id}/{action}")
    public JsonResultWrapper postRequestAdvice(@PathVariable(value = "id") Integer id, @PathVariable(value = "action") String action){
        JoinInstRequest joinInstRequest = joinInstRequestService.getRequestById(id);
        joinInstRequest.setStatus(action);
        joinInstRequest.setStatus_update_time(new Date());
        InstitutionUser institutionUser = new InstitutionUser();
        institutionUser.setUser_id(joinInstRequest.getUser_id());
        institutionUser.setBegin_time(joinInstRequest.getJoin_time());
        institutionUser.setExit_time(joinInstRequest.getLeave_time());
        institutionUser.setInstitution_id(joinInstRequest.getInst_id());
        institutionUser.setEnabled(1);
        if(joinInstRequest.getIb() ==  userService.getCurrentUser().getId()) {
            joinInstRequestService.updateRequest(joinInstRequest);
            if (Objects.equals(action, "pass")) {
                List<InstitutionUser> oldDataList = institutionUserService.getInstitutionUserByUserId(joinInstRequest.getUser_id());
                if(oldDataList.size() != 0){
                    oldDataList.forEach(one->one.setEnabled(0));
                }
                institutionUserService.insertInstitutionUser(institutionUser);
            }
            return new JsonResultWrapper(true);
        }
        else{
            return new JsonResultWrapper(false);
        }
    }


    // Return the user's inst
    @GetMapping("/api/my/inst")
    public JsonResultWrapper getUserInst(){
        Integer currentUserId = userService.getCurrentUser().getId();
        Institution institution = institutionService.getInstitutionInfoByUserId(currentUserId);
        String institutionAbbreviation_name = null;
        String full_name = null;
        Date joinTime = null;
        Date leaveTime = null;
        if(institution != null) {
            institutionAbbreviation_name = institution.getAbbreviation_name();
            full_name = institution.getFull_name();
            Map<String, Object> rst = new HashMap<>();
            rst.put("userId", currentUserId);
            rst.put("name", institutionAbbreviation_name);
            rst.put("fullName",full_name);
            rst.put("instId", institution.getId());
            return new JsonResultWrapper(true,rst);
        }else{
            return new JsonResultWrapper(true);
        }




    }

    // Return the Institution's Users
    @GetMapping("/api/inst_users")
    public JsonResultWrapper getInstUsers(@RequestParam(value = "inst_id") String inst_id,@RequestParam(value = "group_id") String group_id){
        Integer instId = Integer.parseInt(inst_id);
        Integer groupId = Integer.parseInt(group_id);
        List<InstitutionUser> institutionUserList = institutionUserService.getUsersByInstId(instId);
        List<JSON> formJsonList = new ArrayList<JSON>();
        if(institutionUserList != null){
            institutionUserList.forEach(one->{
                JSONObject formJson = new JSONObject();
                formJson.put("userId",one.getUser_id());
                formJson.put("userName",userService.getUserFisrtNameById(one.getUser_id())+" " +userService.getUserLastNameById(one.getUser_id()));
                formJson.put("identity", userInstGroupRelationService.getUserInfoByInstIdAndGroupId(one.getUser_id(), instId, groupId));
                formJsonList.add(formJson);
            });
            return new JsonResultWrapper(true,formJsonList);
        }else{
            return new JsonResultWrapper(false, "No institutionUser Result");
        }

    }


    // Return Inst IB by Inst ID
    @GetMapping("/api/inst_ib")
    public JsonResultWrapper getInstIBByInstId(@RequestParam(value = "inst_id") String inst_id, @RequestParam(value = "group_id") String group_id){
        Integer instId = Integer.parseInt(inst_id);
        Integer groupId = Integer.parseInt(group_id);
        Map<String, Object> rst = new HashMap<>();
        Integer ibId = userInstGroupRelationService.getUserIdByInstIdAndGroupIdAndIdentity(instId,groupId,"ib");
        if(ibId != null){
            rst.put("userId", ibId);
            rst.put("username",userService.getUserFisrtNameById(ibId)+" " +userService.getUserLastNameById(ibId));
            rst.put("email",userService.getUserById(ibId).getUsername());
            return new JsonResultWrapper(true,rst);
        }
        else{
            return new JsonResultWrapper(false,null);
        }
    }



//    @GetMapping("/api/current-auditor")
//    public JsonResultWrapper getCurrentAuditor(@RequestParam(value = "identity") String identity){
//        Integer currentUserId = userService.getCurrentUser().getId();
//        Integer currentInstId = institutionUserService.getInstitutionUserEnabledByUserId(currentUserId).getInstitution_id();
//
//    }


}
