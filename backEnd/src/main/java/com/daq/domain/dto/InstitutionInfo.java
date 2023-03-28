package com.daq.domain.dto;

import lombok.Data;

import java.util.Date;

@Data
public class InstitutionInfo {
    private Integer institution_id;
    private String abbreviation_name;
    private String full_name;
    private String address1;
    private String address2;
    private String address3;
    private String address4;
    private String address5;
    private String description;
    private String continent;
    private String contact_person_id;
    private String country;
    private Date join_date;
    private Date leave_date;


}
