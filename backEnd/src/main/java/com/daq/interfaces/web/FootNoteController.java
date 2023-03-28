package com.daq.interfaces.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.daq.domain.entity.AlsoAt;
import com.daq.domain.entity.UserInstGroupRelation;
import com.daq.domain.service.*;
import com.daq.infrastructure.result.JsonResultWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;

@RestController
public class FootNoteController {
    @Autowired
    UserService userService;

    @Autowired
    private UserInstGroupRelationService userInstGroupRelationService;

    @Autowired
    private InstitutionService institutionService;

    @Autowired
    private AlsoAtService alsoAtService;

    @Autowired
    private GroupService groupService;

    // TODO: 如何处理权限问题
    // 发送Foot Note
    @PostMapping("/api/users/foot-note")
    public JsonResultWrapper postUserFootNote(@RequestParam(value = "user_id", required = false) String user_id, @RequestBody String body){
        JSONObject bodyMap = (JSONObject) JSON.parse(body);
        Integer userId = Integer.parseInt(user_id);
        if(userId == null){
            userId = userService.getCurrentUser().getId();
        }
        Integer groupId = (Integer) bodyMap.get("group_id");
        String foot_note = (String) bodyMap.get("foot_note");
        String also_at = (String) bodyMap.get("also_at");
        UserInstGroupRelation userInstGroupRelation = userInstGroupRelationService.getUserInfoEnabledByUserIdAndGroupId(userId,groupId);
        userInstGroupRelation.setFoot_note(foot_note);
        userInstGroupRelation.setAlso_at(also_at);
        return new JsonResultWrapper(true, userInstGroupRelationService.updateFootNoteAndAlsoAt(userInstGroupRelation));
    }


    @GetMapping("/api/users/group-foot-note")
    public JsonResultWrapper getUserFootNoteByGroupId(@RequestParam(value = "group_id") String group_id){
        Integer groupId = Integer.parseInt(group_id);
        List<UserInstGroupRelation> returnList = userInstGroupRelationService.getUsersEnabledByGroupId(groupId);
        List<JSON> formJsonList = new ArrayList<JSON>();
        returnList.forEach(one->{
            JSONObject formJson = new JSONObject();
            formJson.put("userId", one.getUser_id());
            formJson.put("instId", one.getInstitution_id());
            formJson.put("instFullName", institutionService.getInstitutionInfoByInstId(one.getInstitution_id()).getFull_name());
            formJson.put("daughterInstId", one.getDaughter_institution_id());
            formJson.put("initials", userService.getUserById(one.getUser_id()).getInitials());
            formJson.put("lastName", userService.getUserById(one.getUser_id()).getLast_name());
            formJson.put("footNote", one.getFoot_note());
            formJsonList.add(formJson);
        });
        return new JsonResultWrapper(true, formJsonList);
    }
    // 获得Foot Note
    @GetMapping("/api/users/foot-note")
    public JsonResultWrapper getUserFootNote(@RequestParam(value = "group_id") String group_id, @RequestParam(value="user_id", required = false) String user_id){
        Integer userId = null;
        if(user_id != null){
            userId = Integer.parseInt(user_id);
        }else{
            userId = userService.getCurrentUser().getId();
        }
        Integer groupId = Integer.parseInt(group_id);
        UserInstGroupRelation userInstGroupRelation =  userInstGroupRelationService.getUserInfoEnabledByUserIdAndGroupId(userId,groupId);
        String foot_note = userInstGroupRelation.getFoot_note();
        if(foot_note != null){
            List<JSON> formJsonList = new ArrayList<JSON>();
            List<Integer> footNoteList = new ArrayList<>();
            List<String> footNoteListWithLetter = new ArrayList<>();
            if(foot_note!=null) {
                String[] arr = foot_note.split(",");
                //Classfication
                for (String number : arr) {
                    if (number.endsWith("A") || number.endsWith("B") || number.endsWith("C") || number.endsWith("D") || number.endsWith("E")) {
                        footNoteListWithLetter.add(number);
                    } else {
                        footNoteList.add(Integer.parseInt(number));
                    }
                }
                //For those which hava ONE address
                footNoteList.forEach(one -> {
                    JSONObject formJson = new JSONObject();
                    formJson.put("instId", one);
                    formJson.put("instFullName", institutionService.getInstitutionInfoByInstId(one).getFull_name());
                    formJson.put("instAddress", institutionService.getInstitutionInfoByInstId(one));
                    formJson.put("instAbbreviationName", institutionService.getInstitutionInfoByInstId(one).getAbbreviation_name());
                    formJsonList.add(formJson);
                });
                //For those which have Different address
                footNoteListWithLetter.forEach(one -> {
                    char endLetter = one.charAt(one.length() - 1);
                    Integer instId = Integer.parseInt(one.substring(0, one.length() - 1));
                    JSONObject formJson = new JSONObject();
                    formJson.put("instId", instId);
                    formJson.put("instFullName", institutionService.getInstitutionInfoByInstId(instId).getFull_name());
                    formJson.put("instAbbreviationName", institutionService.getInstitutionInfoByInstId(instId).getAbbreviation_name());
                    switch (endLetter) {
                        case 'A':
                            formJson.put("instAddress", institutionService.getInstitutionInfoByInstId(instId).getAddress1());
                            break;
                        case 'B':
                            formJson.put("instAddress", institutionService.getInstitutionInfoByInstId(instId).getAddress2());
                            break;
                        case 'C':
                            formJson.put("instAddress", institutionService.getInstitutionInfoByInstId(instId).getAddress3());
                            break;
                        case 'D':
                            formJson.put("instAddress", institutionService.getInstitutionInfoByInstId(instId).getAddress4());
                            break;
                        case 'E':
                            formJson.put("instAddress", institutionService.getInstitutionInfoByInstId(instId).getAddress5());
                            break;
                        default:
                            formJson.put("instAddress", "SystemError, please contact system admin.");
                    }
                    formJsonList.add(formJson);
                });
                return new JsonResultWrapper(true, formJsonList);
            }else{
                return new JsonResultWrapper(true);
            }
        }
        else{
            return new JsonResultWrapper(true, "Error! No FootNote Info. Please contact system admin.");
        }
    }

    @GetMapping("/api/users/also-at")
    public JsonResultWrapper getUserAlsoAt(@RequestParam(value = "group_id") String group_id, @RequestParam(value="user_id", required = false) String user_id){
        Integer userId = null;
        if(user_id != null){
            userId = Integer.parseInt(user_id);
        }else{
            userId = userService.getCurrentUser().getId();
        }
        Integer groupId = null;
        if(group_id!=null) {
            groupId = Integer.parseInt(group_id);
        }
        UserInstGroupRelation userInstGroupRelation =  userInstGroupRelationService.getUserInfoEnabledByUserIdAndGroupId(userId,groupId);
        String also_at = userInstGroupRelation.getAlso_at();
        if(also_at != null) {
            String[] arr = also_at.split(",");
            List<Integer> alsoAtList = new ArrayList<>();
            for (String str : arr) {
                alsoAtList.add(Integer.parseInt(str));
            }
            List<JSON> formJsonList = new ArrayList<JSON>();
            alsoAtList.forEach(one -> {
                JSONObject formJson = new JSONObject();
                formJson.put("id", one);
                formJson.put("alsoAt", alsoAtService.getAlsoAtById(one).getName());
                formJson.put("groupId", alsoAtService.getAlsoAtById(one).getGroup_id());
                formJson.put("groupName", groupService.getGroupNameByGroupId(alsoAtService.getAlsoAtById(one).getGroup_id()));
                formJsonList.add(formJson);
            });
            return new JsonResultWrapper(true, formJsonList);
        }else{
            return new JsonResultWrapper(true);
        }
    }

    @GetMapping("/api/users/also-ats")
    public JsonResultWrapper getAllAlsoAts(@RequestParam(value = "group_id", required = false) String group_id){
        Integer groupId = Integer.parseInt(group_id);
        List<AlsoAt> returnList = null;
        if(groupId != null) {
            returnList = alsoAtService.getAlsoAtsByGroupId(groupId);
        }else{
            returnList = alsoAtService.getAlsoAts();
        }
        return new JsonResultWrapper(true, returnList);
    }
}
