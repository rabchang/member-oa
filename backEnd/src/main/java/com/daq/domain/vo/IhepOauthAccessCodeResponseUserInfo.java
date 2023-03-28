package com.daq.domain.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class IhepOauthAccessCodeResponseUserInfo implements Serializable {
    String lastName;
    String truename;
    String passwordOUtTime;
    String cstnetId;
    String sex;
    String securityEmail;
    String language;
    String shortAccount;
    String type;
    String encPassword;
    String password;
    String umtId;
    String passwordType;
    String cstnetIdStatus;
}
