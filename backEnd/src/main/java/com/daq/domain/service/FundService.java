package com.daq.domain.service;

import com.daq.domain.entity.Fund;

import java.util.List;

public interface FundService {
    List<Fund> getAllFunds(int group_id);

    List<Fund> getFundById(int id);
}
