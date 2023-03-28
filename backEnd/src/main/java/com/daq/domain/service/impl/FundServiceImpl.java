package com.daq.domain.service.impl;

import com.daq.domain.entity.Fund;
import com.daq.domain.mapper.FundMapper;
import com.daq.domain.service.FundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundServiceImpl implements FundService {
    @Autowired
    private FundMapper fundMapper;

    @Override
    public List<Fund> getAllFunds(int group_id) {
        return fundMapper.getAllFunds(group_id);
    }

    @Override
    public List<Fund> getFundById(int id) {
        return fundMapper.getFundById(id);
    }
}
