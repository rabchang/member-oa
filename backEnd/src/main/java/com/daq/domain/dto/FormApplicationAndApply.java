package com.daq.domain.dto;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data

public class FormApplicationAndApply {
    private String id;
    private String submit;
    private Integer applicant_id;
    private Integer form_id;
    private String title;
    private Date submission_date;
}
