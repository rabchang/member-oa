package com.daq.domain.dao;

import com.daq.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by EalenXie on 2019/3/25 15:11.
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
