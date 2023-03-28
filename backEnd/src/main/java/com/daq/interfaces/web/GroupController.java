package com.daq.interfaces.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.daq.domain.dto.UserInfo;
import com.daq.domain.entity.*;
import com.daq.domain.service.*;
import com.daq.infrastructure.result.JsonResultWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;

@RestController
public class GroupController {

    @Autowired
    private JoinGroupRequestService joinGroupRequestService;

    @Autowired
    private UserService userService;

    @Autowired
    private InstitutionService institutionService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserInstGroupRelationService userInstGroupRelationService;

    @Autowired
    private InstitutionGroupService institutionGroupService;


    @GetMapping("/api/groups")
    public JsonResultWrapper getGroupsInfo(){
        return new JsonResultWrapper(true, groupService.getGroups());
    }
    

   @PostMapping("/api/joinGroupRequest")
    public JsonResultWrapper postjoinGroupRequest(@RequestBody String body){
        JSONObject bodyMap = (JSONObject) JSON.parse(body);
        JoinGroupRequest joinGroupRequest = new JoinGroupRequest();

        Integer currentUserId = userService.getCurrentUser().getId();

        String identity = (String) bodyMap.get("identity");
        String note = (String) bodyMap.get("note");
        String join_time = (String) bodyMap.get("joinTime");
        String leave_time = (String) bodyMap.get("leaveTime");
        String status = "pending";
        Integer group_id = (Integer) bodyMap.get("group_id");
        String worktype = (String) bodyMap.get("worktype");
        Date create_time = new Date();
        Integer inst_id = (Integer) bodyMap.get("inst_id");
        //Integer groupId = (Integer) bodyMap.get("group_id");
        Integer ibId = userInstGroupRelationService.getUserIdByInstIdAndGroupIdAndIdentity(inst_id,group_id,"ib");

        joinGroupRequest.setUser_id(currentUserId);
        joinGroupRequest.setIdentity(identity);
        joinGroupRequest.setNote(note);
        joinGroupRequest.setJoin_time(new Date(Long.parseLong(join_time)));
        joinGroupRequest.setLeave_time(new Date(Long.parseLong(leave_time)));
        joinGroupRequest.setStatus(status);
        joinGroupRequest.setCreate_time(create_time);
        joinGroupRequest.setGroup_id(group_id);
        joinGroupRequest.setWorktype(worktype);
        joinGroupRequest.setIb(ibId);
        joinGroupRequest.setStatus_update_time(new Date());
        //joinGroupRequest.setGroup_id(group_id);

       return new JsonResultWrapper(true, joinGroupRequestService.insertJoinGroupRequest(joinGroupRequest));

    }

   @GetMapping("/api/joinGroupRequest")
    public JsonResultWrapper getJoinGroupRequest(@RequestParam(value = "status", required = false) String status){
       Integer currentUserId = userService.getCurrentUser().getId();
       if(status != null) {
           List<JoinGroupRequest> returnList = joinGroupRequestService.getRequestsByUserAndStatus(currentUserId, status);
           if (returnList != null) {
               List<JSON> formJsonList = new ArrayList<JSON>();
               returnList.forEach(one -> {
                   JSONObject formJson = new JSONObject();
                   formJson.put("id",one.getId());
                   formJson.put("identity", one.getIdentity());
                   formJson.put("groupId", one.getGroup_id());
                   formJson.put("groupName", groupService.getGroupNameByGroupId(one.getGroup_id()));
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
           }else {
               List list = new ArrayList();
               return new JsonResultWrapper(false, list);
           }
       }else{
           List<JoinGroupRequest> returnList = joinGroupRequestService.getRequestsByUser(currentUserId);
           if (returnList != null) {
               List<JSON> formJsonList = new ArrayList<JSON>();
               returnList.forEach(one -> {
                   JSONObject formJson = new JSONObject();
                   formJson.put("id",one.getId());
                   formJson.put("identity", one.getIdentity());
                   formJson.put("groupId", one.getGroup_id());
                   formJson.put("groupName", groupService.getGroupNameByGroupId(one.getGroup_id()));
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
           }else {
               List list = new ArrayList();
               return new JsonResultWrapper(false, list);
           }
       }
    }

    @GetMapping("/api/joinGroupRequest/{id}")
    public JsonResultWrapper getJoinGroupRequestId(@PathVariable(value = "id") Integer id){
        JoinGroupRequest joinGroupRequest = joinGroupRequestService.getRequestById(id);
        JSONObject formJson = new JSONObject();
        formJson.put("id",joinGroupRequest.getId());
        formJson.put("identity", joinGroupRequest.getIdentity());
        formJson.put("groupId", joinGroupRequest.getGroup_id());
        formJson.put("groupName", groupService.getGroupNameByGroupId(joinGroupRequest.getGroup_id()));
        formJson.put("worktype", joinGroupRequest.getWorktype());
        formJson.put("createTime", joinGroupRequest.getCreate_time());
        formJson.put("joinTime", joinGroupRequest.getJoin_time());
        formJson.put("leaveTime", joinGroupRequest.getLeave_time());
        formJson.put("note", joinGroupRequest.getNote());
        formJson.put("userId", joinGroupRequest.getUser_id());
        formJson.put("userName", userService.getUserFisrtNameById(joinGroupRequest.getUser_id()) + " " + userService.getUserLastNameById(joinGroupRequest.getUser_id()));
        formJson.put("ibId", joinGroupRequest.getIb());
        formJson.put("ibName", userService.getUserFisrtNameById(joinGroupRequest.getIb()) + " " + userService.getUserLastNameById(joinGroupRequest.getIb()));
        formJson.put("status", joinGroupRequest.getStatus());
        return new JsonResultWrapper(true, formJson);
    }

    @PostMapping("/api/joinGroupRequest/{id}/{action}")
    public JsonResultWrapper postRequestAdvice(@PathVariable(value = "id") Integer id, @PathVariable(value = "action") String action){
        JoinGroupRequest joinGroupRequest = joinGroupRequestService.getRequestById(id);
        joinGroupRequest.setStatus(action);
        joinGroupRequest.setStatus_update_time(new Date());

        UserInstGroupRelation userInstGroupRelation = new UserInstGroupRelation();
        userInstGroupRelation.setUser_id(joinGroupRequest.getUser_id());
        userInstGroupRelation.setInstitution_id(institutionService.getInstitutionIdByUserId(joinGroupRequest.getUser_id()));
        userInstGroupRelation.setGroup_id(joinGroupRequest.getGroup_id());
        userInstGroupRelation.setIdentity(joinGroupRequest.getIdentity());
        userInstGroupRelation.setWorktype(joinGroupRequest.getWorktype());
        userInstGroupRelation.setBegin_time(new Date());
        userInstGroupRelation.setEnd_time(joinGroupRequest.getLeave_time());
        userInstGroupRelation.setEnabled(1);
        userInstGroupRelation.setFoot_note(String.valueOf(institutionService.getInstitutionIdByUserId(joinGroupRequest.getUser_id())));

        if(joinGroupRequest.getIb() ==  userService.getCurrentUser().getId()
                && institutionService.getInstitutionIdByUserId(joinGroupRequest.getUser_id()) != null) {
            joinGroupRequestService.updateRequest(joinGroupRequest);
            if(Objects.equals(action, "pass")) {
                userInstGroupRelationService.insertUserInstGroup(userInstGroupRelation);
            }
            return new JsonResultWrapper(true);
        }
        else{
            return new JsonResultWrapper(false,"Approval Request Failure.");
        }
    }

    @GetMapping("/api/my/groups")
    public JsonResultWrapper getUserInst(){
        Integer currentUserId = userService.getCurrentUser().getId();
        List<UserInstGroupRelation> userInstGroupList = userInstGroupRelationService.getUserInstGroupEnabledByUserId(currentUserId);
        if(userInstGroupList != null){
            List<JSON> formJsonList = new ArrayList<JSON>();
            userInstGroupList.forEach(one->{
                JSONObject formJson = new JSONObject();
                formJson.put("groupId",one.getGroup_id());
                formJson.put("groupName", groupService.getGroupNameByGroupId(one.getGroup_id()));
                formJson.put("identity", one.getIdentity());
                formJson.put("worktype",one.getWorktype());
                formJson.put("beginTime",one.getBegin_time());
                //formJson.put("authorTime",one.getAuthor_time());
                formJson.put("endTime",one.getEnd_time());
                formJsonList.add(formJson);
            });
            return new JsonResultWrapper(true, formJsonList);
        }else{
            return new JsonResultWrapper(false, "userInstGroupList is Null.");
        }
    }

    /*
    TO Get group users
    hope this api is quicker
     */
    @GetMapping("/api/group-users-info")
    public JsonResultWrapper getGroupUsersInfo(@RequestParam(value = "group_id") String group_id,@RequestParam(value = "worktype", required = false) String worktype, @RequestParam(value = "inst_id", required = false) String inst_id) {
        Integer groupId = Integer.parseInt(group_id);
        List<UserInfo> returnList = null;
        Integer instId = null;
        if(inst_id!=null) {
            instId = Integer.parseInt(inst_id);
        }

        if(worktype == null && instId == null){
            returnList = userInstGroupRelationService.getUsersInfoEnabledByGroupId(groupId);
        }
        if(worktype == null && instId != null){
            returnList = userInstGroupRelationService.getUserInfoEnabledByGroupIdAndInstId(groupId,instId);
        }
        if(worktype != null && instId == null){
            returnList = userInstGroupRelationService.getUserInfoEnabledByGroupIdAndWorktype(groupId,worktype);
        }
        if(worktype != null && instId != null){
            returnList = userInstGroupRelationService.getUserInfoEnabledByGroupIdAndWorktypeAndInstId(groupId,worktype,instId);
        }

        if(returnList != null){
            return new JsonResultWrapper(true, returnList);
        }else{
            return new JsonResultWrapper(false, "userInstGroupList is Null.");
        }
    }


    @GetMapping("/api/group_users")
    public JsonResultWrapper getGroupUsers(@RequestParam(value = "group_id") String group_id,@RequestParam(value = "worktype", required = false) String worktype){
        Integer groupId = Integer.parseInt(group_id);
        List<UserInstGroupRelation> returnList = null;
        if(worktype != null){
            returnList =  userInstGroupRelationService.getUsersEnabledByGroupIdAndWorktype(groupId, worktype);
        }else{
            returnList =  userInstGroupRelationService.getUsersEnabledByGroupId(groupId);
        }
        if(returnList != null){
            List<JSON> formJsonList = new ArrayList<JSON>();
            returnList.forEach(one->{
                JSONObject formJson = new JSONObject();
                formJson.put("userId", one.getUser_id());
                formJson.put("userName", userService.getUserFisrtNameById(one.getUser_id())+" " +userService.getUserLastNameById(one.getUser_id()));
                formJson.put("identity", one.getIdentity());
                formJson.put("worktype",one.getWorktype());
                formJson.put("beginTime",one.getBegin_time());
                formJson.put("endTime",one.getEnd_time());
                //formJson.put("authorTime",one.getAuthor_time());
                formJsonList.add(formJson);
            });
            return new JsonResultWrapper(true, formJsonList);

        }else{
            return new JsonResultWrapper(false, "userInstGroupList is Null.");
        }
    }

    @GetMapping("/api/groups/show-last-month-join")
    public JsonResultWrapper getLastMonthJoinList(@RequestParam(value = "group_id") String group_id){
        Integer groupId = Integer.parseInt(group_id);
        List<UserInstGroupRelation> returnList = userInstGroupRelationService.getLastMonthJoinList(groupId);
        List<JSON> formJsonList = new ArrayList<JSON>();
        if(returnList.size()>0) {
            returnList.forEach(one -> {
                JSONObject formJson = new JSONObject();
                formJson.put("worktype", one.getWorktype());
                formJson.put("user_id", one.getUser_id());
                formJson.put("identity", one.getIdentity());
                formJson.put("institution_id", one.getInstitution_id());
                formJson.put("institution_name",institutionService.getInstitutionInfoByInstId(one.getInstitution_id()).getAbbreviation_name());
                formJson.put("begin_time", one.getBegin_time());
                formJson.put("end_time", one.getEnd_time());
                formJson.put("user_name", userService.getUserFisrtNameById(one.getUser_id()) + " " + userService.getUserLastNameById(one.getUser_id()));
                formJson.put("user_email", userService.getUserById(one.getUser_id()).getUsername());
                formJsonList.add(formJson);
            });
            return new JsonResultWrapper(true, formJsonList);
        }else{
            List temp = new ArrayList();
            return new JsonResultWrapper(true,temp);
        }
    }

    @GetMapping("/api/groups/show-last-month-exit")
    public JsonResultWrapper getLastMonthJoinExit(@RequestParam(value = "group_id") String group_id){
        Integer groupId = Integer.parseInt(group_id);
        List<UserInstGroupRelation> returnList = userInstGroupRelationService.getLastMonthExitList(groupId);
        List<JSON> formJsonList = new ArrayList<JSON>();
        if(returnList.size()>0) {
            returnList.forEach(one -> {
                JSONObject formJson = new JSONObject();
                formJson.put("worktype", one.getWorktype());
                formJson.put("user_id", one.getUser_id());
                formJson.put("identity", one.getIdentity());
                formJson.put("institution_id", one.getInstitution_id());
                formJson.put("institution_name",institutionService.getInstitutionInfoByInstId(one.getInstitution_id()).getAbbreviation_name());
                formJson.put("begin_time", one.getBegin_time());
                formJson.put("end_time", one.getEnd_time());
                formJson.put("user_name", userService.getUserFisrtNameById(one.getUser_id()) + " " + userService.getUserLastNameById(one.getUser_id()));
                formJson.put("user_email", userService.getUserById(one.getUser_id()).getUsername());
                formJsonList.add(formJson);
            });
            return new JsonResultWrapper(true, formJsonList);
        }else{
            List temp = new ArrayList();
            return new JsonResultWrapper(true,temp);
        }
    }

    @GetMapping("/api/group-ib-chair")
    public JsonResultWrapper getIBChairByGroupId(@RequestParam(value = "group_id") String group_id){
        Integer groupId = Integer.parseInt(group_id);
        Integer ibChairId = userInstGroupRelationService.getIBChairIdByGroupIdAndIdentity(groupId);
        String ibChairName = userService.getUserFisrtNameById(ibChairId) + " " + userService.getUserLastNameById(ibChairId);
        if(ibChairId != null){
            JSONObject jsonFrom = new JSONObject();
            jsonFrom.put("ibChairId", ibChairId);
            jsonFrom.put("ibChairName", ibChairName);
            return new JsonResultWrapper(true,jsonFrom);
        }else{
            return new JsonResultWrapper(true);
        }
    }


    @GetMapping("/api/group-insts-number")
    public JsonResultWrapper getGroupInstsNumber(@RequestParam(value = "group_id") String group_id) {
        Integer groupId = Integer.parseInt(group_id);
        JSONObject jsonFrom = new JSONObject();
        jsonFrom.put("instsNumber", institutionGroupService.getGroupInstsNumberByGroupId(groupId));
        return new JsonResultWrapper(true,jsonFrom);
    }

    @GetMapping("/api/group-users-number")
    public JsonResultWrapper getGroupUsersNumber(@RequestParam(value = "group_id") String group_id) {
        Integer groupId = Integer.parseInt(group_id);
        JSONObject jsonFrom = new JSONObject();
        jsonFrom.put("usersNumber", userInstGroupRelationService.getGroupUserNumber(groupId));
        return new JsonResultWrapper(true,jsonFrom);
    }


}
