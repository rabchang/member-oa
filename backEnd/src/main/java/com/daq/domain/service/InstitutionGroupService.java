package com.daq.domain.service;

import com.daq.domain.entity.InstitutionGroup;

import java.util.List;

public interface InstitutionGroupService {
    List<InstitutionGroup> getAllInstitutionGroupEnabled(int group_id);
    Integer getGroupInstsNumberByGroupId(Integer group_id);
}
