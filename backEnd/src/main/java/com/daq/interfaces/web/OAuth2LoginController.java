package com.daq.interfaces.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.daq.domain.dao.UserRepository;
import com.daq.domain.entity.Institution;
import com.daq.domain.entity.User;
import com.daq.domain.service.InstitutionService;
import com.daq.domain.service.UserService;
import com.daq.domain.vo.IhepOauthAccessCodeResponse;
import com.daq.infrastructure.config.OAuth2Token;
import com.daq.infrastructure.result.JsonResultWrapper;
import com.daq.infrastructure.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSON;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
public class OAuth2LoginController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    InstitutionService institutionService;

    // 接入第三方登录的配置
    String client_id3 = "";
    String appSecret3 = "";
    String backEndCallback3 = "";
    String frontEndLoginSuccess = "";
    String frontEndSignup = "";
    String uniAuthorize = "";
    String uniAccessCode = "";


    @RequestMapping("/api/oauth/login/ihep")
    public RedirectView login() {
        return new RedirectView(String.format("%s?redirect_uri=%s&client_id=%s&theme=full&response_type=code", uniAuthorize, backEndCallback3, client_id3));
    }

    @RequestMapping("/callback")
    public RedirectView logout(@RequestParam String code) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("code", code);
        map.add("client_id", client_id3);
        map.add("client_secret", appSecret3);
        map.add("grant_type", "authorization_code");
        map.add("redirect_uri", backEndCallback3);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        ResponseEntity<IhepOauthAccessCodeResponse> response = restTemplate.postForEntity(uniAccessCode, request, IhepOauthAccessCodeResponse.class);

        String email = response.getBody().getUserInfo().getCstnetId();
        //email as username
        User user = userRepository.findByUsername(email);
        if (user != null) {
            Subject currentUser = SecurityUtils.getSubject();
            OAuth2Token token = new OAuth2Token(email, "");
            token.setRememberMe(true);
            currentUser.login(token);
            return new RedirectView(frontEndLoginSuccess);
        } else {
            return new RedirectView(frontEndSignup + "?signupJwt=" + JwtUtils.createSignupJwt(email) + "&email=" + email);
        }
    }

    @RequestMapping("/api/oauth/signup/ihep")
    public JsonResultWrapper<User> signup(@RequestParam String signupJwt, @RequestBody String body) {
        String email = JwtUtils.getEmailFromSignupJwt(signupJwt);
        JSONObject bodyMap = (JSONObject) JSON.parse(body);
        JSONObject formData = (JSONObject) bodyMap;
        User user = new User();
        user.setUsername(email);
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        user.setLast_name((String) formData.get("lastName"));
        user.setFirst_name((String) formData.get("firstName"));
        if (formData.get("chineseName") != null) {
            user.setChineseName((String) formData.get("chineseName"));
        }
        if (formData.get("contactEmail") != null){
            user.setContact_email((String) formData.get("contactEmail"));
        }
        if (formData.get("title") != null){
            user.setTitle((String) formData.get("title"));
        }
        if (formData.get("tel") != null){
            user.setTel_phone((String) formData.get("tel"));
        }
        if (formData.get("address") != null){
            user.setAddress((String) formData.get("address"));
        }
        if (formData.get("initials") != null){
            user.setInitials((String) formData.get("initials"));
        }
        if (formData.get("inspire_id") != null){
            user.setInspire_id((String) formData.get("inspire_id"));
        }
        if (formData.get("ORCID") != null){
            user.setORCID((String) formData.get("ORCID"));
        }
        userRepository.save(user);

        Subject currentUser = SecurityUtils.getSubject();
        OAuth2Token token = new OAuth2Token(email, "");
        token.setRememberMe(true);
        currentUser.login(token);

        return new JsonResultWrapper(true, user);
    }

    @RequestMapping("/api/oauth/forceLogin")
    public JsonResultWrapper<User> forceLogin(@RequestParam String username) {
        User user = userRepository.findByUsername(username);

        if (user != null) {
            Subject currentUser = SecurityUtils.getSubject();
            OAuth2Token token = new OAuth2Token(username, "");
            token.setRememberMe(true);
            currentUser.login(token);

            return new JsonResultWrapper(true, user);
        }
        return new JsonResultWrapper(false);
    }

    @RequestMapping("/api/me")
    @RequiresAuthentication
    public JsonResultWrapper<User> me() throws IllegalAccessException {
        User user = userService.getCurrentUser();
        return new JsonResultWrapper(true, user);
    }

    @RequestMapping("/api/myInstitution")
    @RequiresAuthentication
    public JsonResultWrapper<User> myInstitution() {
        Integer institutionId = institutionService.getInstitutionIdByUserId(userService.getCurrentUser().getId());
        Institution institution = institutionService.getInstitutionInfoByInstId(institutionId);
        return new JsonResultWrapper(true, institution);
    }
}
