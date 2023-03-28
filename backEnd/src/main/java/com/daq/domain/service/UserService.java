package com.daq.domain.service;

import com.daq.domain.entity.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {


    User getUserById(int id);
    User getCurrentUser();
    String getUserFisrtNameById(int id);
    String getUserLastNameById(int id);
    int getCurrentUserId();
    List<User> getUserList(String role);
    Boolean checkInitialsDuplication(String initials);
}
