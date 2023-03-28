package com.daq.domain.dto;


import lombok.Data;

import java.util.Date;

@Data
public class FormAuditAndApplication {
    private String status;
    private Integer applicant_id;
    private Date submission_date;
    private String title;
    private Integer application_id;
    private Integer auditor_id;
}
