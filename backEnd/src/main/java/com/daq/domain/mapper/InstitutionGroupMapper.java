package com.daq.domain.mapper;

import com.daq.domain.entity.InstitutionGroup;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InstitutionGroupMapper {
    @Select("select * from institution_group_relation where group_id=#{group_id} AND enabled = 1")
    List<InstitutionGroup> getAllInstitutionGroupEnabled(Integer group_id);

    @Select("select count(*) from institution_group_relation where group_id=#{group_id} AND enabled=1")
    Integer getGroupInstsNumberByGroupId(Integer group_id);


}
