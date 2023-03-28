package com.daq.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.daq.domain.dto.FormApplicationAndApply;
import com.daq.domain.entity.FormApplication;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */
@Mapper
public interface FormApplicationMapper extends BaseMapper<FormApplication> {
    @Select("select * from form_application where id=#{id}")
    FormApplication getFormApplicationInfoById(Serializable id);

    @Insert("INSERT INTO form_application (submit, form_id, applicant_id, submission_date)\n" +
            "VALUES (#{submit}, #{form_id}, #{applicant_id}, #{submission_date});")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertFormApplication(FormApplication formApplication);

    @Select("select form_application.id, form_application.submit, form_application.form_id, form_application.applicant_id, form_application.submission_date, form_apply.title" +
            " from form_application inner join form_apply on form_apply.id=form_application.form_id where applicant_id=#{id}")
    List<FormApplicationAndApply> getApplicationsByApplicantId(Serializable id);



}
