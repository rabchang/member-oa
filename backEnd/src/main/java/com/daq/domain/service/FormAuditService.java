package com.daq.domain.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.daq.domain.dto.FormAuditAndApplication;
import com.daq.domain.entity.FormAudit;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */

public interface FormAuditService extends IService<FormAudit> {

    int insertAuditInfo(FormAudit formAudit);

    List<FormAudit> getAuditInfoByApplicationId(Integer applicationId);

    List<FormAudit> getAuditInfoByAuditorId(Integer auditorId);

    boolean updateAuditInfo(FormAudit formAudit);

    List<FormAuditAndApplication> getApplicationsByAuditorIdAndStatus(Integer id, String status);

    FormAudit getFormAuditById(int id);

    Integer getAuditNumberByAuditorId(Integer id, String title, String status);

    String getFormTitleByAuditId(int id);

    String getFormDetailsByAuditId(int id);

    Integer getAuditNumberByApplicationId(int application_id);

    Integer getApplicantIdByAuditId(int id);

}
