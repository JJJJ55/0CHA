package com.ssafy.back_end.redis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    //@Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void save(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public Object findByKey(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteByKey(String key) {
        redisTemplate.delete(key);
    }

    public boolean existsByKey(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
}
