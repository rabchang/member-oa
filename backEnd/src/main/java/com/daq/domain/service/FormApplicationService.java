package com.daq.domain.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.daq.domain.dto.FormApplicationAndApply;
import com.daq.domain.entity.FormApplication;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */

public interface FormApplicationService extends IService<FormApplication> {

    //FormApplicationAndApply getById(Serializable id);
    int insertFormApplication(FormApplication formApplication);

    FormApplication getFormApplicationById(Integer id);

    List<FormApplicationAndApply> getApplicationsByApplicantId(Integer id);
}
