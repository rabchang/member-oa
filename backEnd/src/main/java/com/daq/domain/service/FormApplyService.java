package com.daq.domain.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.daq.domain.entity.FormApplication;
import com.daq.domain.entity.FormApply;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */

public interface FormApplyService{
    FormApply getFormApplyByTitle(String title);

    FormApply getFormApplyById(int id);

}
