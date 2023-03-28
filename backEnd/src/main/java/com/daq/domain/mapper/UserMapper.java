package com.daq.domain.mapper;


import com.daq.domain.entity.User;
import org.springframework.data.repository.query.Param;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM system_shiro_user WHERE id = #{id}")
    User findById(@Param("id") Number id);

    @Select("SELECT first_name FROM system_shiro_user WHERE id = #{id}")
    String findFirstNameById(@Param("id") Number id);

    @Select("SELECT last_name FROM system_shiro_user WHERE id = #{id}")
    String findLastNameById(@Param("id") Number id);

    @Select("select u.username, u.id, u.first_name, u.last_name, r.name\n" +
            "        from system_shiro_user as u inner join system_shiro_user_roles as ur on u.id = ur.user_id\n" +
            "        inner join system_shiro_role as r on r.id = ur.roles_id\n" +
            "        where r.name=#{role}")
    List<User> getRoles(@Param("role")String role);

    @Select("select * from system_shiro_user where initials=#{initials}")
    List<User> checkInitialsDuplication(String initials);

    // TODO: UPDATE personal info
    // @Select("UPDATE INTO")
}
