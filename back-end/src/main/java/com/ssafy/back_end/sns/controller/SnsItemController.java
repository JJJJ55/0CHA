package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.model.ItemDto;
import com.ssafy.back_end.sns.service.SnsItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 전체조회 -> 상세조회 -> DTO -> resultMap -> builder -> 테스트
@RestController
@RequestMapping(value = "/api/sns/item/")
public class SnsItemController {
    private final SnsItemService snsItemService;

    @Autowired
    public SnsItemController(SnsItemService snsItemService) {
        this.snsItemService = snsItemService;
    }

    @PostMapping("/")
    public ResponseEntity<?> writeItem(@RequestBody ItemDto item, @RequestBody List<String> images) {
        int id = snsItemService.writeItem(item, images);

        if(id > 0) {
            return ResponseEntity.ok("중고마켓 작성 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고마켓 작성 오류");
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<?> updateItem(@PathVariable int itemId, @RequestBody ItemDto item, @RequestBody List<String> images) {
        item.setId(itemId);
        int id = snsItemService.updateItem(item, images);
        if(itemId > 0) {
            return ResponseEntity.ok("중고마켓 수정 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고마켓 수정 오류");
    }

    @DeleteMapping ("/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable int itemId) {
        int result = snsItemService.deleteItem(itemId);

        if (result != 0) {
            return ResponseEntity.ok("중고장터 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고장터 삭제 오류");
    }

    @PostMapping ("/{itemId}/like")
    public ResponseEntity<?> likeFeed(@PathVariable int itemId, @RequestParam int userId) {
        int isLike = snsItemService.isLike(itemId, userId);

        if (isLike == 0) {   //좋아요 안눌려있음
            int result = snsItemService.likeItem(itemId, userId);
            if (result != 0) {
                return ResponseEntity.ok("좋아요성공");
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("좋아요 오류");
            }
        }
        else {
            return ResponseEntity.ok("이미 좋아요 되어 있음");
        }
    }

    @DeleteMapping ("/{itemId}/like")
    public ResponseEntity<?> dislikeFeed(@PathVariable int itemId, @RequestParam int userId) {
        int isLike = snsItemService.isLike(itemId, userId);

        if (isLike == 1) {   //좋아요 눌려있음
            int result = snsItemService.dislikeItem(itemId, userId);
            if (result != 0) {
                return ResponseEntity.ok("좋아요취소성공");
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("좋아요취소 오류");
            }
        }
        else {
            return ResponseEntity.ok("좋아요 안눌려 있음");
        }
    }
}
