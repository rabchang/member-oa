package com.daq.domain.vo;

import com.alibaba.fastjson.JSON;
import lombok.Data;

import java.io.Serializable;


@Data
public class IhepOauthAccessCodeResponse implements Serializable {


    String access_token;
    String userInfo;

    public IhepOauthAccessCodeResponseUserInfo getUserInfo() {
        return JSON.parseObject(userInfo, IhepOauthAccessCodeResponseUserInfo.class);
    }

    String refresh_token;
    int expires_in;

}
