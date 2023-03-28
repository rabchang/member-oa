package com.daq.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("institution")
public class Institution implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private String full_name;
    private String abbreviation_name;
    private String address1;
    private String address2;
    private String address3;
    private String address4;
    private String address5;
    private String description;
    private String country;
    private Integer contact_person_id;
    private String continent;
    private Integer location;
    private String inspire_name1;
    private String inspire_name2;
    private String inspire_name3;
    private String inspire_name4;
    private String inspire_name5;


}