package com.daq.domain.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserInfo {
    private Integer user_id;
    private String username;
    private String first_name;
    private String last_name;
    private String abbreviation_name;
    private Date begin_time;
    private Date end_time;
    private String worktype;
    private String identity;
}
