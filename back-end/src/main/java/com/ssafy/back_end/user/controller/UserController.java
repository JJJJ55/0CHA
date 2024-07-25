package com.ssafy.back_end.user.controller;

import com.ssafy.back_end.user.model.UserDto;
import com.ssafy.back_end.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/")
    public Map<String, String> index() {
        Map<String, String> map = new HashMap<>();
        map.put("1", "가");
        map.put("2", "나");
        map.put("3", "다");
        return map;
    }

    @GetMapping("/user")
    public List<UserDto> user() {
        return userService.selectAll();
    }
}
