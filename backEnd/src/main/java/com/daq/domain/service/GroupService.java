package com.daq.domain.service;

import com.daq.domain.entity.Group;

import java.util.List;

public interface GroupService {
    String getGroupNameByGroupId(Integer id);
    List<Group> getGroups();
}
