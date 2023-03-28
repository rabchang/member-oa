package com.daq.domain.mapper;


import com.daq.domain.entity.InstitutionUser;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InstitutionUserMapper {

    @Select("select * from institution_user_relation where user_id=#{userId} and enabled=1")
    InstitutionUser getInstitutionUserEnabledByUserId(Integer userId);

    @Select("select * from institution_user_relation where user_id=#{userId}")
    List<InstitutionUser> getInstitutionUserByUserId(Integer userId);

    @Select("select * from institution_user_relation where institution_id=#{instId}")
    List<InstitutionUser> getUsersByInstId(Integer instId);


    @Insert("INSERT INTO institution_user_relation(id, exit_time, begin_time, enabled, user_id, institution_id)\n" +
            " values (#{id}, #{exit_time}, #{begin_time}, #{enabled}, #{user_id}, #{institution_id});")
    int insertInstitutionUser(InstitutionUser institutionUser);

}
