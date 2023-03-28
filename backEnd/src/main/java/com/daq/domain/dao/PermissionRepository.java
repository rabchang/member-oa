package com.daq.domain.dao;

import com.daq.domain.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by EalenXie on 2019/3/27 10:57.
 */
public interface PermissionRepository extends JpaRepository<Permission, Integer> {
    Permission findByName(String name);
}
