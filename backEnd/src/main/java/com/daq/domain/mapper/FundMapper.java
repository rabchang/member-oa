package com.daq.domain.mapper;

import com.daq.domain.entity.Fund;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface FundMapper {
    @Select("select * from fund where group_id=#{group_id}")
    List<Fund> getAllFunds(int group_id);


    @Select("select * from fund where id=#{id}")
    List<Fund> getFundById(int id);

}
