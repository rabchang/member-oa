package com.daq.domain.mapper;

import com.daq.domain.entity.AlsoAt;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AlsoAtMapper {
    @Select("select * from also_at where group_id=#{group_id}")
    List<AlsoAt> getAlsoAtsByGroupId(int group_id);

    @Select("select * from also_at where id=#{id}")
    AlsoAt getAlsoAtById(int id);

    @Select("select * from also_at")
   List<AlsoAt> getAlsoAts();
}
