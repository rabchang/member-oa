package com.daq.domain.mapper;


import com.daq.domain.entity.FormAudit;
import com.daq.domain.entity.JoinInstRequest;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface JoinInstRequestMapper {

    @Insert("INSERT INTO join_inst_request(user_id,ib, identity, inst_id, worktype, note, join_time, leave_time, status, create_time)\n" +
            " values (#{user_id}, #{ib}, #{identity}, #{inst_id}, #{worktype}, #{note}, #{join_time}, #{leave_time}, #{status}, #{create_time});")
    int insertJoinInstRequest(JoinInstRequest joinInstRequest);

    @Select("select * from join_inst_request where ib=#{param1} and status=#{param2}")
    List<JoinInstRequest> getRequestsByIbIdAndStatus(int ib, String status);

    @Select("select * from join_inst_request where ib=#{param1} or user_id=#{param1}")
    List<JoinInstRequest> getRequestsByUser(int id);

    @Select("select * from join_inst_request where (ib=#{param1} or user_id=#{param1}) and status=#{param2}")
    List<JoinInstRequest> getRequestsByUserAndStatus(int id, String status);

    @Update("update join_inst_request set status=#{status} where id=#{id}")
    boolean updateRequest(JoinInstRequest joinInstRequest);


    @Select("select * from join_inst_request where id=#{id}")
    JoinInstRequest getRequestById(int id);

    @Select("select count(*) from join_inst_request where user_id=#{param1} and status=#{param2}")
    Integer getMyInstRequestsNumber(int id, String status);

    @Select("select count(*) from join_inst_request where ib=#{param1} and status=#{param2}")
    Integer getMyInstApprovalsNumber(int id, String status);
}
