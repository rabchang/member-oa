package com.daq.domain.service;

import com.daq.domain.dto.InstitutionInfo;
import com.daq.domain.entity.Institution;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;


public interface InstitutionService {
    List<Institution> getAll();
    Institution getInstitutionInfoByInstId(Integer instId);
    String getInstitutionByUserId(Integer userId);
    Integer getInstitutionIdByUserId(Integer userId);
    Institution getInstitutionInfoByUserId(Integer userId);
    List<InstitutionInfo> getInstInfoByGroupId(Integer groupId);
}
