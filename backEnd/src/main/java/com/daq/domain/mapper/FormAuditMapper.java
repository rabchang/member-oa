package com.daq.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.daq.domain.dto.FormAuditAndApplication;
import com.daq.domain.entity.FormAudit;
import org.apache.ibatis.annotations.*;

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
public interface FormAuditMapper extends BaseMapper<FormAudit> {


    @Select("select * from form_audit where application_id=#{id}")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    List<FormAudit> getAuditInfoByApplicationId(Integer id);

    @Select("select * from form_audit where auditor_id=#{id}")
    List<FormAudit> getAuditInfoByAuditorId(Integer id);

    @Select("select form_application.applicant_id, form_application.submission_date, form_apply.title, form_audit.auditor_id, form_audit.application_id, form_audit.status\n" +
            "from form_application inner join form_apply on form_apply.id=form_application.form_id inner join form_audit on form_audit.application_id=form_application.id\n" +
            "where form_audit.auditor_id=#{id} and form_audit.status=#{status}")
    List<FormAuditAndApplication> getApplicationsByAuditorIdAndStatus(Integer id, String status);

    @Update("update form_audit set status=#{status}, note=#{note}, submission_time=#{submission_time} where id=#{id}")
    boolean updateAuditInfo(FormAudit formAudit);

    @Insert("INSERT INTO form_audit (status, note, auditor_id, application_id, auditor_order)\n" +
            "VALUES (#{status}, #{note}, #{auditor_id}, #{application_id}, #{auditor_order});")
    int insertFormAudit(FormAudit formAudit);

    @Select("select * from form_audit where id=#{id}")
    FormAudit getFormAuditById(int id);

    @Select("select count(*) from form_audit inner join form_application on form_audit.application_id=form_application.id" +
            " inner join form_apply on form_application.form_id=form_apply.id" +
            " where form_audit.auditor_id=#{id} and form_apply.title=#{title} and form_audit.status=#{status}")
    Integer getAuditNumberByAuditorId(int id, String title, String status);

    @Select("select form_apply.title from form_apply inner join form_apply on form_apply.id=form_application.form_id" +
            " inner join form_audit on form_application.id=form_audit.application_id" +
            " where form_audit.id=#{id}")
    String getFormTitleByAuditId(int id);

    @Select("select form_application.submit from form_application inner join form_apply on form_apply.id=form_application.form_id" +
            " inner join form_audit on form_application.id=form_audit.application_id" +
            " where form_audit.id=#{id}")
    String getFormDetailsByAuditId(int id);

    @Select("select form_application.applicant_id from form_application inner join form_apply on form_apply.id=form_application.form_id" +
            " inner join form_audit on form_application.id=form_audit.application_id" +
            " where form_audit.id=#{id}")
    Integer getApplicantIdByAuditId(int id);

    @Select("select count(*) from form_audit where application_id=#{application_id}")
    Integer getAuditNumberByApplicationId(int application_id);

}
