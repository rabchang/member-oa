package com.daq.domain.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.daq.domain.dto.FormApplicationAndApply;
import com.daq.domain.entity.FormApplication;
import com.daq.domain.mapper.FormApplicationMapper;
import com.daq.domain.service.FormApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */
@Service
public class FormApplicationServiceImpl extends ServiceImpl<FormApplicationMapper, FormApplication> implements FormApplicationService {

    @Autowired
    private FormApplicationMapper formApplicationMapper;

    @Override
    public int insertFormApplication(FormApplication formApplication) {
        return formApplicationMapper.insertFormApplication(formApplication);
    }

    @Override
    public FormApplication getFormApplicationById(Integer id) {
        return formApplicationMapper.getFormApplicationInfoById(id);
    }

    @Override
    public List<FormApplicationAndApply> getApplicationsByApplicantId(Integer id) {
        return formApplicationMapper.getApplicationsByApplicantId(id);
    }
}
