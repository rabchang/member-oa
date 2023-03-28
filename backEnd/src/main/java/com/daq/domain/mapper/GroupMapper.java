package com.daq.domain.mapper;

import com.daq.domain.entity.Group;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface GroupMapper {

    @Select("select group_name from `group` where id=#{id}")
    String getGroupNameByGroupId(Integer id);

    @Select("select * from `group`")
    List<Group> getGroups();


}
