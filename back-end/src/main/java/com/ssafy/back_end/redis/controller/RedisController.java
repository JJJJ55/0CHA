package com.ssafy.back_end.redis.controller;

import com.ssafy.back_end.redis.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/redis")
public class RedisController {

    @Autowired
    private RedisService  redisService;

    @PostMapping("/")
    public void save(@RequestParam("key") String key, @RequestBody Object value){
        redisService.save(key, value);
    }

    @GetMapping("/")
    public Object get(@RequestParam("key") String key){
        return redisService.findByKey(key);
    }

    @DeleteMapping("/")
    public void delete(@RequestParam("key") String key){
        redisService.deleteByKey(key);
    }
}
