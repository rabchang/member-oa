package com.daq.domain.service;

import com.daq.domain.entity.JoinGroupRequest;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface JoinGroupRequestService {
    int insertJoinGroupRequest(JoinGroupRequest joinGroupRequest);
    List<JoinGroupRequest> getRequestsByIbIdAndStatus(int ib, String status);
    List<JoinGroupRequest> getRequestsByUser(int id);
    List<JoinGroupRequest> getRequestsByUserAndStatus(int id, String status);
    JoinGroupRequest getRequestById(int id);
    boolean updateRequest(JoinGroupRequest joinGroupRequest);
    Integer getMyGroupRequestsNumber(int id, String status);

    Integer getMyGroupApprovalsNumber(int id, String status);
}
