package com.daq.domain.service.impl;


import com.daq.domain.entity.JoinGroupRequest;
import com.daq.domain.entity.JoinInstRequest;
import com.daq.domain.mapper.JoinGroupRequestMapper;
import com.daq.domain.service.JoinGroupRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JoinGroupRequestServiceImpl implements JoinGroupRequestService {

    @Autowired
    private JoinGroupRequestMapper joinGroupRequestMapper;

    @Override
    public int insertJoinGroupRequest(JoinGroupRequest joinGroupRequest){
        return joinGroupRequestMapper.insertJoinGroupRequest(joinGroupRequest);
    }

    @Override
    public List<JoinGroupRequest> getRequestsByIbIdAndStatus(int ib, String status) {
        return joinGroupRequestMapper.getRequestsByIbIdAndStatus(ib,status);
    }

    @Override
    public List<JoinGroupRequest> getRequestsByUser(int id) {
        return joinGroupRequestMapper.getRequestsByUser(id);
    }

    @Override
    public List<JoinGroupRequest> getRequestsByUserAndStatus(int id, String status) {
        return joinGroupRequestMapper.getRequestsByUserAndStatus(id, status);
    }

    @Override
    public JoinGroupRequest getRequestById(int id) {
        return joinGroupRequestMapper.getRequestById(id);
    }

    @Override
    public boolean updateRequest(JoinGroupRequest joinGroupRequest) {
        return joinGroupRequestMapper.updateRequest(joinGroupRequest);
    }

    @Override
    public Integer getMyGroupRequestsNumber(int id, String status) {
        return joinGroupRequestMapper.getMyGroupRequestsNumber(id, status);
    }

    @Override
    public Integer getMyGroupApprovalsNumber(int id, String status) {
        return joinGroupRequestMapper.getMyGroupApprovalsNumber(id, status);
    }



}
