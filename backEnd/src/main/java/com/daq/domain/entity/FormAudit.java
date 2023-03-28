package com.daq.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

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
@TableName("form_audit")
public class FormAudit implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * pending; pass; reject
     */
    private String status;

    private String note;

    private Integer auditor_id;

    private Integer application_id;

    private Integer auditor_order;

    private Date submission_time;


}
