package com.daq.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("fund")
public class Fund {
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private Integer institution_id;
    private String fund_source;
    private String contract_no;
    private Integer source_level;
    private Integer contract_level;
    private Date start_time;
    private Date end_time;
    private String description;
    private Integer creator_id;
    private Date create_time;
}
