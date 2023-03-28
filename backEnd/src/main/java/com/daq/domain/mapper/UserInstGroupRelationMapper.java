package com.daq.domain.mapper;

import com.daq.domain.dto.UserInfo;
import com.daq.domain.entity.JoinGroupRequest;
import com.daq.domain.entity.JoinInstRequest;
import com.daq.domain.entity.User;
import com.daq.domain.entity.UserInstGroupRelation;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Date;
import java.util.List;


@Mapper
public interface UserInstGroupRelationMapper {
    @Select("select * from user_inst_group_relation where user_id=#{userId} and enabled=1")
    List<UserInstGroupRelation> getUserInstGroupEnabledByUserId(Integer userId);

    @Select("select * from user_inst_group_relation where user_id=#{userId}")
    List<UserInstGroupRelation> getUserInstGroupByUserId(Integer userId);

    @Select("select * from user_inst_group_relation where institution_id=#{instId} and enabled=1")
    UserInstGroupRelation getUserInstGroupEnabledByInstId(Integer userId);


    @Select("select * from user_inst_group_relation where institution_id=#{instId}")
    List<UserInstGroupRelation> getUserInstGroupByInstId(Integer userId);

    @Select("select user_id from user_inst_group_relation where institution_id=#{instId} and enabled=1")
    List<Integer> getUserListEnabledByInstId(Integer userId);

    @Select("select user_id from user_inst_group_relation where institution_id=#{instId}")
    List<Integer> getUserListByInstId(Integer userId);

    @Select("select * from user_inst_group_relation where user_id=#{userId} and group_id=#{groupId} and enabled=1")
    UserInstGroupRelation getUserInfoEnabledByUserIdAndGroupId(Integer userId, Integer groupId);
    @Select("select user_id from user_inst_group_relation where institution_id=#{instId} and group_id=#{groupId} and identity=#{identity} and enabled=1")
    Integer getUserIdByInstIdAndGroupIdAndIdentity(Integer instId, Integer groupId, String identity);

    @Select("select user_id from user_inst_group_relation where group_id=#{groupId} and identity='IB Chair'")
    Integer getIBChairIdByGroupId(int groupId);
    @Insert("insert into user_inst_group_relation(user_id, institution_id, group_id, identity, worktype, begin_time, end_time, enabled, foot_note)\n"+
            " values (#{user_id}, #{institution_id}, #{group_id}, #{identity}, #{worktype}, #{begin_time}, #{end_time}, #{enabled}, #{foot_note});")
    int insertUserInstGroup(UserInstGroupRelation userInstGroupRelation);

    @Update("update into user_inst_group_relation set foot_note=#{foot_note}, also_at=#{also_at} where user_id=#{user_id}")
    boolean updateFootNoteAndAlsoAt(UserInstGroupRelation userInstGroupRelation);

    @Select("select * from user_inst_group_relation where user_id=#{userId} and institution_id=#{instId} and group_id=#{groupId} and enabled=1")
    UserInstGroupRelation getUserInfoByInstIdAndGroupIdAndIdentity(Integer userId, Integer instId, Integer groupId);

    @Select("select * from user_inst_group_relation where group_id=#{groupId} and enabled = 1")
    List<UserInstGroupRelation> getUsersEnabledByGroupId(Integer groupId);

    @Select("select * from user_inst_group_relation where group_id=#{groupId} and worktype=#{worktype} and enabled = 1")
    List<UserInstGroupRelation> getUsersEnabledByGroupIdAndWorktype(Integer groupId, String worktype);

    @Select(" SELECT * FROM user_inst_group_relation WHERE begin_time BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND DATE_ADD(NOW(), INTERVAL 1 DAY) AND group_id=#{group_id} AND enabled=1;")
    List<UserInstGroupRelation> getLastMonthJoinList(Integer group_id);

    @Select(" SELECT * FROM user_inst_group_relation WHERE end_time BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND DATE_ADD(NOW(), INTERVAL 1 DAY) AND group_id=#{group_id} AND enabled=1;")
    List<UserInstGroupRelation> getLastMonthExitList(Integer group_id);

    @Select("SELECT count(*) from user_inst_group_relation WHERE group_id=#{groupId} AND is_main_institution_id=1 AND  enabled=1")
    Integer getGroupUserNumber(Integer group_id);

    @Select("SELECT user_inst_group_relation.user_id, system_shiro_user.first_name, system_shiro_user.last_name, system_shiro_user.username, institution.abbreviation_name, user_inst_group_relation.begin_time, user_inst_group_relation.end_time, user_inst_group_relation.worktype, user_inst_group_relation.identity" +
            " from user_inst_group_relation inner join system_shiro_user on user_inst_group_relation.user_id=system_shiro_user.id" +
            " inner join institution on user_inst_group_relation.institution_id = institution.id where group_id=#{groupId} and user_inst_group_relation.enabled=1")
    List<UserInfo> getUsersInfoEnabledByGroupId(Integer groupId);
    @Select("SELECT user_inst_group_relation.user_id, system_shiro_user.first_name, system_shiro_user.last_name, system_shiro_user.username, institution.abbreviation_name, user_inst_group_relation.begin_time, user_inst_group_relation.end_time, user_inst_group_relation.worktype, user_inst_group_relation.identity" +
            " from user_inst_group_relation inner join system_shiro_user on user_inst_group_relation.user_id=system_shiro_user.id" +
            " inner join institution on user_inst_group_relation.institution_id = institution.id where group_id=#{groupId} and worktype=#{worktype} and user_inst_group_relation.enabled=1")
    List<UserInfo> getUserInfoEnabledByGroupIdAndWorktype(Integer groupId, String worktype);

    @Select("SELECT user_inst_group_relation.user_id, system_shiro_user.first_name, system_shiro_user.last_name, system_shiro_user.username, institution.abbreviation_name, user_inst_group_relation.begin_time, user_inst_group_relation.end_time, user_inst_group_relation.worktype, user_inst_group_relation.identity" +
            " from user_inst_group_relation inner join system_shiro_user on user_inst_group_relation.user_id=system_shiro_user.id" +
            " inner join institution on user_inst_group_relation.institution_id = institution.id where group_id=#{groupId} and user_inst_group_relation.institution_id=#{institution_id} and user_inst_group_relation.enabled=1")
    List<UserInfo> getUserInfoEnabledByGroupIdAndInstId(Integer groupId, Integer institution_id);

    @Select("SELECT user_inst_group_relation.user_id, system_shiro_user.first_name, system_shiro_user.last_name, system_shiro_user.username, institution.abbreviation_name, user_inst_group_relation.begin_time, user_inst_group_relation.end_time, user_inst_group_relation.worktype, user_inst_group_relation.identity" +
            " from user_inst_group_relation inner join system_shiro_user on user_inst_group_relation.user_id=system_shiro_user.id" +
            " inner join institution on user_inst_group_relation.institution_id = institution.id where group_id=#{groupId} and user_inst_group_relation.institution_id=#{institution_id} and worktype=#{worktype} and user_inst_group_relation.enabled=1")
    List<UserInfo> getUserInfoEnabledByGroupIdAndWorktypeAndInstId(Integer groupId, String worktype, Integer institution_id);
}
