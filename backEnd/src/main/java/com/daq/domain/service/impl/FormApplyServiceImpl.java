package com.daq.domain.service.impl;

import com.daq.domain.entity.FormApply;
import com.daq.domain.service.FormApplyService;
import com.daq.domain.mapper.FormApplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */
@Service
public class FormApplyServiceImpl implements FormApplyService {

    @Autowired
    private FormApplyMapper formApplyMapper;

    @Override
    public FormApply getFormApplyByTitle(String title) {
        return formApplyMapper.getFormApplyByTitle(title);
    }

    @Override
    public FormApply getFormApplyById(int id) {
        return formApplyMapper.getFormApplyById(id);
    }
}
