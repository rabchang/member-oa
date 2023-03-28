package com.daq.domain.service;

import com.daq.domain.entity.AlsoAt;

import java.util.List;

public interface AlsoAtService {

    List<AlsoAt> getAlsoAtsByGroupId(int group_id);

    AlsoAt getAlsoAtById(int id);

    List<AlsoAt> getAlsoAts();
}
