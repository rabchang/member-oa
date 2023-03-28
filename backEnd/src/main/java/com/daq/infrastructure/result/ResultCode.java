package com.daq.infrastructure.result;

/**
 * @Author: zhanghc
 * @Description: 返回码定义
 * 规定:
 * #1表示成功
 * #1001～1999 区间表示参数错误
 * #2001～2999 区间表示用户错误
 * #3001～3999 区间表示接口异常
 */
public enum ResultCode {
    /* 成功 */
    SUCCESS(200, "ok"),
    SUCCESS_login(200, "login success"),
    SUCCESS_logout(200, "logout success"),

    /* 默认失败 */
    COMMON_FAIL(500, "internal server error"),
    USER_NOT_LOGIN(401, "unauthorized"),
    NO_PERMISSION(403, "user no permission"),
    NOT_FOUND(404, "not found"),

    /* 参数错误：1000～1999 */
    PARAM_NOT_VALID(1001, "param not valid"),
    PARAM_IS_BLANK(1002, "missing param"),
    PARAM_TYPE_ERROR(1003, "param type error"),
    PARAM_NOT_COMPLETE(1004, "param missing"),

    /* 用户错误 */

    USER_ACCOUNT_EXPIRED(2001, "account expired"),
    USER_CREDENTIALS_ERROR(2002, "password error"),
    USER_CREDENTIALS_EXPIRED(2003, "password expired"),
    USER_ACCOUNT_DISABLE(2004, "account disabled"),
    USER_ACCOUNT_NOT_EXIST(2005, "account missing"),
    USER_ACCOUNT_ALREADY_EXIST(2006, "account exists");

    private Integer code;
    private String msg;

    ResultCode(Integer code, String message) {
        this.code = code;
        this.msg = message;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    /**
     * 根据code获取message
     *
     * @param code
     * @return
     */
    public static String getMessageByCode(Integer code) {
        for (ResultCode ele : values()) {
            if (ele.getCode().equals(code)) {
                return ele.getMsg();
            }
        }
        return null;
    }
}