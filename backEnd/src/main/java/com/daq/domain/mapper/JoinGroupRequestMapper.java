package com.daq.domain.mapper;


import com.daq.domain.entity.JoinGroupRequest;
import com.daq.domain.entity.JoinInstRequest;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface JoinGroupRequestMapper {

    @Insert("INSERT INTO join_group_request(user_id,ib,identity, worktype, note, join_time, leave_time, status, create_time, group_id)\n" +
            " values (#{user_id},#{ib}, #{identity}, #{worktype}, #{note}, #{join_time}, #{leave_time}, #{status}, #{create_time}, #{group_id});")
    int insertJoinGroupRequest(JoinGroupRequest joinGroupRequest);

    @Select("select * from join_group_request where ib=#{ib} and status=#{status}")
    List<JoinGroupRequest> getRequestsByIbIdAndStatus(int ib, String status);

    @Select("select * from join_group_request where ib=#{param1} or user_id=#{param1}")
    List<JoinGroupRequest> getRequestsByUser(int id);

    @Select("select * from join_group_request where (ib=#{param1} or user_id=#{param1}) and status=#{param2}")
    List<JoinGroupRequest> getRequestsByUserAndStatus(int id, String status);

    @Update("update join_group_request set status=#{status}, status_update_time=#{status_update_time} where id=#{id}")
    boolean updateRequest(JoinGroupRequest joinGroupRequest);

    @Select("select * from join_group_request where id=#{id}")
    JoinGroupRequest getRequestById(int id);

    @Select("select count(*) from join_inst_request where user_id=#{param1} and status=#{param2}")
    Integer getMyGroupRequestsNumber(int id, String status);

    @Select("select count(*) from join_inst_request where ib=#{param1} and status=#{param2}")
    Integer getMyGroupApprovalsNumber(int id, String status);
}
