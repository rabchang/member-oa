package com.daq.infrastructure.config;

import com.daq.domain.dao.UserRepository;
import com.daq.domain.entity.Permission;
import com.daq.domain.entity.Role;
import com.daq.domain.entity.User;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by EalenXie on 2019/3/25 15:19.
 */
@Component
public class  Oauth2AuthRealm extends AuthorizingRealm {

    @Resource
    private UserRepository userRepository;

    @Override
    public boolean supports(AuthenticationToken token) {
        return token instanceof OAuth2Token;//表示此Realm只支持OAuth2Token类型
    }

    /**
     * 权限核心配置 根据数据库中的该用户 角色 和 权限
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        User user = (User) principals.getPrimaryPrincipal();
        for (Role role : user.getRoles()) {                                 //获取 角色
            authorizationInfo.addRole(role.getName());                      //添加 角色
            for (Permission permission : role.getPermissions()) {           //获取 权限
                authorizationInfo.addStringPermission(permission.getName());//添加 权限
            }
        }
        return authorizationInfo;
    }

    /**
     * 用户登陆 凭证信息
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        OAuth2Token ot = (OAuth2Token) token;
        User user = userRepository.findByUsername(ot.getUsername());
        return new SimpleAuthenticationInfo(
                user, //用户名
                ot.getAccess_code(), //密码
                getName()  //realm name
        );
    }


}
