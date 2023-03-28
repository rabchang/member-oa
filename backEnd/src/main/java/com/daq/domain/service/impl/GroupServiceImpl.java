package com.daq.domain.service.impl;

import com.daq.domain.entity.Group;
import com.daq.domain.mapper.GroupMapper;
import com.daq.domain.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {
    @Autowired
    private GroupMapper groupMapper;
    @Override
    public String getGroupNameByGroupId(Integer id) {
        return groupMapper.getGroupNameByGroupId(id);
    }

    @Override
    public List<Group> getGroups() {
        return groupMapper.getGroups();
    }
}
