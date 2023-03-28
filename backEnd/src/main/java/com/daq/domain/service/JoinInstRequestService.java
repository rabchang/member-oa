package com.daq.domain.service;

import com.daq.domain.entity.JoinInstRequest;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface JoinInstRequestService {
    int insertJoinInstRequest(JoinInstRequest joinInstRequest);
    List<JoinInstRequest> getRequestsByIbIdAndStatus(int ib, String status);

    List<JoinInstRequest> getRequestsByUser(int id);

    List<JoinInstRequest> getRequestsByUserAndStatus(int id, String status);
    JoinInstRequest getRequestById(int id);
    boolean updateRequest(JoinInstRequest joinInstRequest);
    Integer getMyInstRequestsNumber(int id, String status);
    Integer getMyInstApprovalsNumber(int id, String status);
}
