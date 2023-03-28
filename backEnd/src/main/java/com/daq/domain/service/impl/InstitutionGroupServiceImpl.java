package com.daq.domain.service.impl;

import com.daq.domain.entity.InstitutionGroup;
import com.daq.domain.mapper.InstitutionGroupMapper;
import com.daq.domain.service.InstitutionGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstitutionGroupServiceImpl implements InstitutionGroupService {
    @Autowired
    private InstitutionGroupMapper institutionGroupMapper;

    @Override
    public List<InstitutionGroup> getAllInstitutionGroupEnabled(int group_id) {
        return institutionGroupMapper.getAllInstitutionGroupEnabled(group_id);
    }

    @Override
    public Integer getGroupInstsNumberByGroupId(Integer group_id) {
        return institutionGroupMapper.getGroupInstsNumberByGroupId(group_id);
    }
}
