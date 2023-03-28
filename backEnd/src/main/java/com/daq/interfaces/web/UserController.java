package com.daq.interfaces.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.daq.domain.entity.User;
import com.daq.domain.entity.UserInstGroupRelation;
import com.daq.domain.service.InstitutionService;
import com.daq.domain.service.UserInstGroupRelationService;
import com.daq.domain.service.UserService;
import com.daq.infrastructure.result.JsonResultWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private UserInstGroupRelationService userInstGroupRelationService;

    @Autowired
    private InstitutionService institutionService;

    @GetMapping("/api/users")
    public JsonResultWrapper getUserInfo(@RequestParam(value = "role") String role) {
        return new JsonResultWrapper(true, userService.getUserList(role));
    }

    @GetMapping("/api/show-user-name")
    public JsonResultWrapper getUserNameByUserId(@RequestParam(value="user_id") String user_id){
        Integer userId = Integer.parseInt(user_id);
        String userName = userService.getUserFisrtNameById(userId) + " " + userService.getUserLastNameById(userId);
        JSONObject formJson = new JSONObject();
        formJson.put("userName", userName);
        return new JsonResultWrapper(true, formJson);
    }

    @GetMapping("/api/open/check-initials-dup")
    public JsonResultWrapper checkInitialsDup(@RequestParam(value = "initials") String initials){
        if(userService.checkInitialsDuplication(initials)){
            return new JsonResultWrapper(true, "Initials duplicate, please replace!");
        }else{
            return new JsonResultWrapper(true,"is OK to use");
        }

    }





}
