package com.daq.domain.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.daq.domain.entity.User;
import com.daq.domain.mapper.UserMapper;
import com.daq.domain.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User getUserById(int id) {
        return userMapper.findById(id);
    }

    @Override
    public User getCurrentUser() {
        Subject currentUser = SecurityUtils.getSubject();
        return (User) currentUser.getPrincipal();
    }

    @Override
    public String getUserFisrtNameById(int id) {
        return userMapper.findFirstNameById(id);
    }

    @Override
    public String getUserLastNameById(int id) {
        return userMapper.findLastNameById(id);
    }


    @Override
    public int getCurrentUserId() {
        Subject currentUser = SecurityUtils.getSubject();
        return ((User) currentUser.getPrincipal()).getId();
    }

    @Override
    public List<User> getUserList(String role) {
        return userMapper.getRoles(role);
    }

    @Override
    public Boolean checkInitialsDuplication(String initials) {
        return (userMapper.checkInitialsDuplication(initials).size() > 0);
    }


}
