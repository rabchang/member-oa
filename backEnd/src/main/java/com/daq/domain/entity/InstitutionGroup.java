package com.daq.domain.entity;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("institution_group_relation")
public class InstitutionGroup {
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private Integer institution_id;
    private Integer group_id;
    private Date join_date;
    private Date leave_date;
    private Integer enabled;


}
