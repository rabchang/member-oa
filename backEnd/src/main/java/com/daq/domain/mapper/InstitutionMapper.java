package com.daq.domain.mapper;


import com.daq.domain.dto.InstitutionInfo;
import com.daq.domain.entity.Institution;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Date;
import java.util.List;

@Mapper
public interface InstitutionMapper {

    @Select("select * from institution")
    List<Institution> getAll();

    @Select("select institution.abbreviation_name from institution inner join institution_user_relation on institution.id=institution_user_relation.institution_id" +
            " where institution_user_relation.user_id=#{userId} and institution_user_relation.enabled=1")
    String getInstitutionNameByUserId(Integer userId);

    @Select("select * from institution inner join institution_user_relation on institution.id=institution_user_relation.institution_id" +
            " where institution_user_relation.user_id=#{userId} and institution_user_relation.enabled=1")
    Institution getInstitutionByUserId(Integer userId);

    @Select("select institution_user_relation.institution_id from institution_user_relation" +
            " where institution_user_relation.enabled=1 and institution_user_relation.user_id=#{userId};")
    Integer getInstitutionIdByUserId(Integer userId);

    @Select("select * from institution where id=#{id}")
    Institution getInstitutionInfoByInstId(Integer id);

    @Select("select institution_group_relation.institution_id, institution.abbreviation_name, institution.full_name, institution.address1, " +
            " institution.address2, institution.address3, institution.address4, institution.address5, institution.description," +
            " institution.continent, institution.contact_person_id, institution.country, institution_group_relation.join_date, institution_group_relation.leave_date" +
            " from institution inner join institution_group_relation on institution.id=institution_group_relation.institution_id" +
            " where group_id=#{groupId} and institution_group_relation.enabled=1;")
    List<InstitutionInfo> getInstInfoByGroupId(Integer groupId);



}
