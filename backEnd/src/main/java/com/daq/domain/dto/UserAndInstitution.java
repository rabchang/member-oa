package com.daq.domain.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserAndInstitution {
    private Date exit_time;

    private Date begin_time;

    private Integer enabled;

    private Integer user_id;

    private Integer instution_id;

    private String identity;

    private String worktype;

    private String full_name;

    private String abbreviation_name;

    private String address;

    private String country;

    private String description;
}
