package com.daq.domain.entity;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Table;

/**
 * <p>
 * 
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("form_apply")
public class FormApply implements Serializable {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private String title;

    private String design;


}
