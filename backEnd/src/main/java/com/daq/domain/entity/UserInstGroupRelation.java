package com.daq.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("user_inst_group_relation")
public class UserInstGroupRelation {
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private Integer user_id;
    private Integer institution_id;
    private String daughter_institution_id;
    private Integer group_id;
    private String identity;
    private String worktype;
    private Date begin_time;
    private Date end_time;
    private Integer enabled;
    private Date join_author_time;
    private Date leave_author_time;
    private String foot_note;
    private String also_at;
    private String is_main_institution_id;



}
