package com.daq.domain.service.impl;


import com.daq.domain.entity.JoinInstRequest;
import com.daq.domain.mapper.JoinInstRequestMapper;
import com.daq.domain.service.JoinInstRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JoinInstRequestServiceImpl implements JoinInstRequestService {

    @Autowired
    private JoinInstRequestMapper joinInstRequestMapper;

    @Override
    public int insertJoinInstRequest(JoinInstRequest joinInstRequest){
        return joinInstRequestMapper.insertJoinInstRequest(joinInstRequest);
    }

    @Override
    public List<JoinInstRequest> getRequestsByIbIdAndStatus(int ib, String status) {
        return joinInstRequestMapper.getRequestsByIbIdAndStatus(ib,status);
    }

    @Override
    public List<JoinInstRequest> getRequestsByUser(int id) {
        return joinInstRequestMapper.getRequestsByUser(id);
    }

    @Override
    public List<JoinInstRequest> getRequestsByUserAndStatus(int id, String status) {
        return joinInstRequestMapper.getRequestsByUserAndStatus(id,status);
    }

    @Override
    public JoinInstRequest getRequestById(int id) {
        return joinInstRequestMapper.getRequestById(id);
    }

    @Override
    public boolean updateRequest(JoinInstRequest joinInstRequest) {
        return joinInstRequestMapper.updateRequest(joinInstRequest);
    }

    @Override
    public Integer getMyInstRequestsNumber(int id, String status) {
        return joinInstRequestMapper.getMyInstRequestsNumber(id, status);
    }

    @Override
    public Integer getMyInstApprovalsNumber(int id, String status) {
        return joinInstRequestMapper.getMyInstApprovalsNumber(id, status);
    }


}
