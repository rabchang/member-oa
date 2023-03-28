package com.daq.infrastructure.result;

import lombok.Data;

import java.io.Serializable;

/**
 * @Author: zhanghc
 * @Description: 统一返回实体
 */
@Data
public class JsonResultWrapper<T> implements Serializable {
    private Boolean ok;
    private Integer code;
    private String msg;
    private T data;

    public JsonResultWrapper() {
    }

    // 成功或者失败都能走这个
    public JsonResultWrapper(boolean ok) {
        this.ok = ok;
        this.msg = ok ? ResultCode.SUCCESS.getMsg() : ResultCode.COMMON_FAIL.getMsg();
        this.code = ok ? ResultCode.SUCCESS.getCode() : ResultCode.COMMON_FAIL.getCode();
    }

    // 成功或者失败都能走这个，并且可以传一个枚举来改变默认枚举的值
    public JsonResultWrapper(boolean ok, ResultCode resultEnum) {
        this.ok = ok;
        // 传来的枚举为null就用默认的，不为null就用传来的枚举
        this.code = ok ? (resultEnum==null?ResultCode.SUCCESS.getCode():resultEnum.getCode()) : (resultEnum == null ? ResultCode.COMMON_FAIL.getCode() : resultEnum.getCode());
        this.msg = ok ? (resultEnum==null?ResultCode.SUCCESS.getMsg():resultEnum.getMsg()): (resultEnum == null ? ResultCode.COMMON_FAIL.getMsg() : resultEnum.getMsg());
    }

    // 成功或者失败都能用
    // 用户可以传一个任意对象过来，用默认的成功或者失败的枚举
    public JsonResultWrapper(boolean ok, T data) {
        this.ok = ok;
        this.code = ok ? ResultCode.SUCCESS.getCode() : ResultCode.COMMON_FAIL.getCode();
        this.msg = ok ? ResultCode.SUCCESS.getMsg() : ResultCode.COMMON_FAIL.getMsg();
        this.data = data;
    }

    // 成功或者失败都能用
    // 用户可以传一个任意对象和自定义枚举过来
    public JsonResultWrapper(boolean ok, ResultCode resultEnum, T data) {
        this.ok = ok;
        this.code = ok ? (resultEnum==null ? ResultCode.SUCCESS.getCode() : resultEnum.getCode()): (resultEnum == null ? ResultCode.COMMON_FAIL.getCode() : resultEnum.getCode());
        this.msg = ok ? (resultEnum==null ? ResultCode.SUCCESS.getMsg() : resultEnum.getMsg()) : (resultEnum == null ? ResultCode.COMMON_FAIL.getMsg() : resultEnum.getMsg());
        this.data = data;
    }
}