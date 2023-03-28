package com.daq.domain.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.daq.domain.dto.FormAuditAndApplication;
import com.daq.domain.entity.FormAudit;
import com.daq.domain.mapper.FormAuditMapper;
import com.daq.domain.service.FormAuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */
@Service
public class FormAuditServiceImpl extends ServiceImpl<FormAuditMapper, FormAudit> implements FormAuditService {
    @Autowired
    private FormAuditMapper formAuditMapper;

    @Override
    public int insertAuditInfo(FormAudit formAudit) {
        return formAuditMapper.insertFormAudit(formAudit);
    }

    @Override
    public List<FormAudit> getAuditInfoByApplicationId(Integer applicationId) {
        return formAuditMapper.getAuditInfoByApplicationId(applicationId);
    }

    @Override
    public List<FormAudit> getAuditInfoByAuditorId(Integer auditorId) {
        return formAuditMapper.getAuditInfoByAuditorId(auditorId);
    }

    @Override
    public boolean updateAuditInfo(FormAudit formAudit) {
        return formAuditMapper.updateAuditInfo(formAudit);
    }

    @Override
    public List<FormAuditAndApplication> getApplicationsByAuditorIdAndStatus(Integer id, String status) {
        return formAuditMapper.getApplicationsByAuditorIdAndStatus(id,status);
    }

    @Override
    public FormAudit getFormAuditById(int id) {
        return formAuditMapper.getFormAuditById(id);
    }

    @Override
    public Integer getAuditNumberByAuditorId(Integer id, String title, String status) {
        return formAuditMapper.getAuditNumberByAuditorId(id, title, status);
    }

    @Override
    public String getFormTitleByAuditId(int id) {
        return formAuditMapper.getFormTitleByAuditId(id);
    }

    @Override
    public String getFormDetailsByAuditId(int id) {
        return formAuditMapper.getFormDetailsByAuditId(id);
    }


    @Override
    public Integer getAuditNumberByApplicationId(int application_id) {
        return formAuditMapper.getAuditNumberByApplicationId(application_id);
    }

    @Override
    public Integer getApplicantIdByAuditId(int id) {
        return formAuditMapper.getApplicantIdByAuditId(id);
    }


}
