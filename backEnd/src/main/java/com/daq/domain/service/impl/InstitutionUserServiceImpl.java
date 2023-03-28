package com.daq.domain.service.impl;

import com.daq.domain.entity.InstitutionUser;
import com.daq.domain.mapper.InstitutionUserMapper;
import com.daq.domain.service.InstitutionUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstitutionUserServiceImpl implements InstitutionUserService {
    @Autowired
    private InstitutionUserMapper institutionUserMapper;


    @Override
    public InstitutionUser getInstitutionUserEnabledByUserId(Integer userId) {
        return institutionUserMapper.getInstitutionUserEnabledByUserId(userId);
    }

    @Override
    public List<InstitutionUser> getInstitutionUserByUserId(Integer userId) {
        return institutionUserMapper.getInstitutionUserByUserId(userId);
    }

    @Override
    public List<InstitutionUser> getUsersByInstId(Integer instId) {
        return institutionUserMapper.getUsersByInstId(instId);
    }

    @Override
    public int insertInstitutionUser(InstitutionUser institutionUser) {
        return institutionUserMapper.insertInstitutionUser(institutionUser);
    }

}
