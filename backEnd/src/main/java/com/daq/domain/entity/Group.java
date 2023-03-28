package com.daq.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("group")
public class Group {
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private String group_name;
    private String address;
    private String homepage;
}
