package com.daq.infrastructure.config;

import lombok.Data;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.RememberMeAuthenticationToken;

@Data
public class OAuth2Token implements AuthenticationToken, RememberMeAuthenticationToken {

    public OAuth2Token(String username, String access_code) {
        this.username = username;
        this.access_code = access_code;
    }

    private String username;
    private String access_code;
    private String principal;

    private boolean rememberMe;

    @Override
    public boolean isRememberMe() {
        return this.rememberMe;
    }

    public void setRememberMe(boolean rememberMe) {
        this.rememberMe = rememberMe;
    }

    @Override
    public Object getCredentials() {
        return access_code;
    }
}