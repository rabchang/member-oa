package com.daq.domain.service.impl;

import com.daq.domain.dto.UserInfo;
import com.daq.domain.entity.UserInstGroupRelation;
import com.daq.domain.mapper.UserInstGroupRelationMapper;
import com.daq.domain.service.UserInstGroupRelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInstGroupRelationServiceImpl implements UserInstGroupRelationService {
    @Autowired
    private UserInstGroupRelationMapper userInstGroupRelationMapper;

    @Override
    public List<UserInstGroupRelation> getUserInstGroupEnabledByUserId(Integer userId) {
        return userInstGroupRelationMapper.getUserInstGroupEnabledByUserId(userId);
    }

    @Override
    public List<UserInstGroupRelation> getUserInstGroupByUserId(Integer userId) {
        return userInstGroupRelationMapper.getUserInstGroupByUserId(userId);
    }

    @Override
    public UserInstGroupRelation getUserInstGroupEnabledByInstId(Integer userId) {
        return userInstGroupRelationMapper.getUserInstGroupEnabledByInstId(userId);
    }

    @Override
    public List<UserInstGroupRelation> getUserInstGroupByInstId(Integer userId) {
        return userInstGroupRelationMapper.getUserInstGroupByInstId(userId);
    }

    @Override
    public List<Integer> getUserListEnabledByInstId(Integer userId) {
        return userInstGroupRelationMapper.getUserListEnabledByInstId(userId);
    }

    @Override
    public List<Integer> getUserListByInstId(Integer userId) {
        return userInstGroupRelationMapper.getUserListByInstId(userId);
    }

    @Override
    public Integer getUserIdByInstIdAndGroupIdAndIdentity(Integer instId, Integer groupId, String identity) {
        return userInstGroupRelationMapper.getUserIdByInstIdAndGroupIdAndIdentity(instId,groupId,identity);
    }

    @Override
    public Integer getIBChairIdByGroupIdAndIdentity(Integer groupId) {
        return userInstGroupRelationMapper.getIBChairIdByGroupId(groupId);
    }

    @Override
    public List<UserInstGroupRelation> getUsersEnabledByGroupIdAndWorktype(Integer groupId, String worktype) {
        return userInstGroupRelationMapper.getUsersEnabledByGroupIdAndWorktype(groupId,worktype);
    }

    @Override
    public Integer getGroupUserNumber(Integer group_id) {
        return userInstGroupRelationMapper.getGroupUserNumber(group_id);
    }

    @Override
    public List<UserInfo> getUsersInfoEnabledByGroupId(Integer groupId) {
        return userInstGroupRelationMapper.getUsersInfoEnabledByGroupId(groupId);
    }

    @Override
    public List<UserInfo> getUserInfoEnabledByGroupIdAndWorktype(Integer groupId, String worktype) {
        return userInstGroupRelationMapper.getUserInfoEnabledByGroupIdAndWorktype(groupId,worktype);
    }

    @Override
    public List<UserInfo> getUserInfoEnabledByGroupIdAndInstId(Integer groupId, Integer institution_id) {
        return userInstGroupRelationMapper.getUserInfoEnabledByGroupIdAndInstId(groupId,institution_id);
    }

    @Override
    public List<UserInfo> getUserInfoEnabledByGroupIdAndWorktypeAndInstId(Integer groupId, String worktype, Integer institution_id) {
        return userInstGroupRelationMapper.getUserInfoEnabledByGroupIdAndWorktypeAndInstId(groupId,worktype,institution_id);
    }


    @Override
    public int insertUserInstGroup(UserInstGroupRelation userInstGroupRelation) {
        return userInstGroupRelationMapper.insertUserInstGroup(userInstGroupRelation);
    }

    @Override
    public UserInstGroupRelation getUserInfoByInstIdAndGroupId(Integer userId, Integer instId, Integer groupId) {
        return userInstGroupRelationMapper.getUserInfoByInstIdAndGroupIdAndIdentity(userId,instId,groupId);
    }

    @Override
    public UserInstGroupRelation getUserInfoEnabledByUserIdAndGroupId(Integer userId, Integer groupId) {
        return userInstGroupRelationMapper.getUserInfoEnabledByUserIdAndGroupId(userId,groupId);
    }

    @Override
    public List<UserInstGroupRelation> getUsersEnabledByGroupId(Integer groupId) {
        return userInstGroupRelationMapper.getUsersEnabledByGroupId(groupId);
    }

    @Override
    public List<UserInstGroupRelation> getLastMonthJoinList(Integer group_id) {
        return userInstGroupRelationMapper.getLastMonthJoinList(group_id);
    }

    @Override
    public List<UserInstGroupRelation> getLastMonthExitList(Integer group_id) {
        return userInstGroupRelationMapper.getLastMonthExitList(group_id);
    }

    @Override
    public boolean updateFootNoteAndAlsoAt(UserInstGroupRelation userInstGroupRelation) {
        return userInstGroupRelationMapper.updateFootNoteAndAlsoAt(userInstGroupRelation);
    }

}
