package com.daq.interfaces.web;

import com.daq.domain.service.FundService;
import com.daq.infrastructure.result.JsonResultWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class FundController {
    @Autowired
    private FundService fundService;

    @GetMapping("/api/funds")
    public JsonResultWrapper getAllFunds(@RequestParam(value = "group_id") String group_id){
        return new JsonResultWrapper(true, fundService.getAllFunds(Integer.parseInt(group_id)));
    }

    @GetMapping("/api/funds/{id}")
    public JsonResultWrapper getAllFunds(@PathVariable(value = "id") Integer id){
        return new JsonResultWrapper(true, fundService.getFundById(id));
    }



}
