package com.daq.domain.service;

import com.daq.domain.dto.UserInfo;
import com.daq.domain.entity.UserInstGroupRelation;
import org.apache.ibatis.annotations.Select;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface UserInstGroupRelationService {
    List<UserInstGroupRelation> getUserInstGroupEnabledByUserId(Integer userId);

    List<UserInstGroupRelation> getUserInstGroupByUserId(Integer userId);

    UserInstGroupRelation getUserInstGroupEnabledByInstId(Integer userId);

    List<UserInstGroupRelation> getUserInstGroupByInstId(Integer userId);

    List<Integer> getUserListEnabledByInstId(Integer userId);

    List<Integer> getUserListByInstId(Integer userId);

    Integer getUserIdByInstIdAndGroupIdAndIdentity(Integer instId, Integer groupId, String identity);

    int insertUserInstGroup(UserInstGroupRelation userInstGroupRelation);

    UserInstGroupRelation getUserInfoByInstIdAndGroupId(Integer userId, Integer instId, Integer groupId);

    UserInstGroupRelation getUserInfoEnabledByUserIdAndGroupId(Integer userId, Integer groupId);

    List<UserInstGroupRelation> getUsersEnabledByGroupId(Integer groupId);

    List<UserInstGroupRelation> getLastMonthJoinList(Integer group_id);

    List<UserInstGroupRelation> getLastMonthExitList(Integer group_id);

    boolean updateFootNoteAndAlsoAt(UserInstGroupRelation userInstGroupRelation);

    Integer getIBChairIdByGroupIdAndIdentity(Integer groupId);

    List<UserInstGroupRelation> getUsersEnabledByGroupIdAndWorktype(Integer groupId, String worktype);

    Integer getGroupUserNumber(Integer group_id);
    List<UserInfo> getUsersInfoEnabledByGroupId(Integer groupId);
    List<UserInfo> getUserInfoEnabledByGroupIdAndWorktype(Integer groupId, String worktype);
    List<UserInfo> getUserInfoEnabledByGroupIdAndInstId(Integer groupId, Integer institution_id);
    List<UserInfo> getUserInfoEnabledByGroupIdAndWorktypeAndInstId(Integer groupId, String worktype, Integer institution_id);
}
