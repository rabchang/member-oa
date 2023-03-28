package com.daq.domain.service.impl;

import com.daq.domain.entity.AlsoAt;
import com.daq.domain.mapper.AlsoAtMapper;
import com.daq.domain.service.AlsoAtService;
import com.daq.domain.service.FormApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlsoAtServiceImpl implements AlsoAtService {
    @Autowired
    private AlsoAtMapper alsoAtMapper;

    @Override
    public List<AlsoAt> getAlsoAtsByGroupId(int group_id) {
        return alsoAtMapper.getAlsoAtsByGroupId(group_id);
    }

    @Override
    public AlsoAt getAlsoAtById(int id) {
        return alsoAtMapper.getAlsoAtById(id);
    }

    @Override
    public List<AlsoAt> getAlsoAts() {
        return alsoAtMapper.getAlsoAts();
    }
}
