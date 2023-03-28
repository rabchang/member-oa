package com.daq.domain.service.impl;

import com.daq.domain.dto.InstitutionInfo;
import com.daq.domain.entity.Institution;
import com.daq.domain.mapper.InstitutionMapper;
import com.daq.domain.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class InstituionServiceImpl implements InstitutionService {
    @Autowired
    private InstitutionMapper institutionMapper;

    @Override
    public List<Institution> getAll() {
        return institutionMapper.getAll();
    }

    @Override
    public Institution getInstitutionInfoByInstId(Integer instId) {
        return institutionMapper.getInstitutionInfoByInstId(instId);
    }

    @Override
    public String getInstitutionByUserId(Integer userId) {
        return institutionMapper.getInstitutionNameByUserId(userId) ;
    }

    @Override
    public Institution getInstitutionInfoByUserId(Integer userId){
        return institutionMapper.getInstitutionByUserId(userId);
    }

    @Override
    public List<InstitutionInfo> getInstInfoByGroupId(Integer groupId) {
        return institutionMapper.getInstInfoByGroupId(groupId);
    }


    @Override
    public Integer getInstitutionIdByUserId(Integer userId) {
        return institutionMapper.getInstitutionIdByUserId(userId);
    }
}
