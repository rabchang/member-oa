package com.daq;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.daq.domain.mapper.FormApplyMapper;
import com.daq.domain.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;

@SpringBootApplication
@Slf4j
public class ShiroRbacSystemApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ShiroRbacSystemApplication.class, args);
    }

    @Autowired
    UserMapper userMapper;

    @Autowired
    FormApplyMapper formApplyMapper;

    @Override
    public void run(String... args) throws Exception {


    }
}
