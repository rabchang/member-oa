package com.daq.domain.service;

import com.daq.domain.entity.InstitutionUser;

import java.util.List;

public interface InstitutionUserService {
    InstitutionUser getInstitutionUserEnabledByUserId(Integer userId);

    List<InstitutionUser> getInstitutionUserByUserId(Integer userId);

    List<InstitutionUser> getUsersByInstId(Integer instId);

    int insertInstitutionUser(InstitutionUser institutionUser);
}
