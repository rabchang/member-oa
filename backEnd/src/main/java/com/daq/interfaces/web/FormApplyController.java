package com.daq.interfaces.web;


import com.alibaba.fastjson.JSON;
import com.daq.domain.entity.FormApply;
import com.daq.domain.service.FormApplyService;
import com.daq.infrastructure.result.JsonResultWrapper;
import com.daq.infrastructure.result.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */
@RestController
public class FormApplyController {
    @Autowired
    private FormApplyService formApplyService;

    @RequestMapping("/api/form")
    public JsonResultWrapper getFormApplyByTitle(@RequestParam(value = "title") String title, HttpServletResponse res) {

        FormApply formApply = formApplyService.getFormApplyByTitle(title);
        if (formApply != null) {
            Map<String, Object> rst = new HashMap<>();
            rst.put("id", formApply.getId());
            rst.put("title", formApply.getTitle());
            rst.put("design", JSON.parseObject(formApply.getDesign()));
            return new JsonResultWrapper(true, rst);
        } else {
            res.setStatus(404);
            return new JsonResultWrapper(false, ResultCode.NOT_FOUND);
        }

    }


}
