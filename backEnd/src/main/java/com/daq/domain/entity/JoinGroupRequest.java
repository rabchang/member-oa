package com.daq.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("join_inst_request")
public class JoinGroupRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private Integer user_id;

    private Integer group_id;

    private String identity;

    private String worktype;

    private String note;

    private Date join_time;

    private Date leave_time;

    private Integer ib;

    private String status;

    private Date create_time;

    private Date status_update_time;

}