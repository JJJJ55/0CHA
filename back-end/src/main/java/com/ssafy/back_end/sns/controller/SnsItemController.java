package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.model.ItemDto;
import com.ssafy.back_end.sns.service.SnsItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag (name = "SNS중고장터")
@RestController
@RequestMapping (value = "/api/sns/item")
public class SnsItemController {
    private final SnsItemService snsItemService;

    @Autowired
    public SnsItemController(SnsItemService snsItemService) {
        this.snsItemService = snsItemService;
    }

    @Operation (summary = "전체or유저 중고장터 목록보기-완")
    @GetMapping ("/list")
    public ResponseEntity<?> getItems(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        List<ItemDto> items = snsItemService.getItems(userId);

        if (items != null) {
            if (items.isEmpty()) {
                return ResponseEntity.ok("중고장터 0개입니다");
            }
            return ResponseEntity.ok(items);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고장터 조회 오류");
    }

    @Operation (summary = "중고장터 자세히보기-완")
    @GetMapping ("/{itemId}")
    public ResponseEntity<?> getItemDetail(@RequestHeader ("ID") int ID, @PathVariable ("itemId") int itemId) {
        ItemDto item = snsItemService.getItemDetail(itemId);

        if (item != null) {
            return ResponseEntity.ok(item);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고장터 세부조회 오류");
    }

    @Operation (summary = "중고장터 글쓰기-완")
    @PostMapping ("/write")
    public ResponseEntity<?> writeItem(@RequestHeader ("ID") int ID, @RequestBody ItemDto item) {
        item.setUserId(ID);
        int id = snsItemService.writeItem(item);

        if (id > 0) {
            return ResponseEntity.ok("중고마켓 작성 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고마켓 작성 오류");
    }

    @Operation (summary = "중고장터 글수정-완")
    @PutMapping ("/{itemId}")
    public ResponseEntity<?> updateItem(@RequestHeader ("ID") int ID, @PathVariable int itemId, @RequestBody ItemDto item) {
        item.setUserId(ID);
        item.setId(itemId);
        int id = snsItemService.updateItem(item);

        if (id > 0) {
            return ResponseEntity.ok("중고마켓 수정 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고마켓 수정 오류");
    }

    @Operation (summary = "중고장터 글삭제-완")
    @DeleteMapping ("/{itemId}")
    public ResponseEntity<?> deleteItem(@RequestHeader ("ID") int ID, @PathVariable int itemId) {
        int result = snsItemService.deleteItem(itemId);

        if (result != 0) {
            return ResponseEntity.ok("중고장터 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고장터 삭제 오류");
    }

    @Operation (summary = "중고장터 좋아요-완")
    @PostMapping ("/{itemId}/like")
    public ResponseEntity<?> likeItem(@RequestHeader ("ID") int ID, @PathVariable int itemId) {
        int isLike = snsItemService.isLike(itemId, ID);

        if (isLike == 0) {   //좋아요 안눌려있음
            int result = snsItemService.likeItem(itemId, ID);
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

    @Operation (summary = "중고장터 좋아요삭제-완")
    @DeleteMapping ("/{itemId}/like")
    public ResponseEntity<?> dislikeItem(@RequestHeader ("ID") int ID, @PathVariable int itemId) {
        int isLike = snsItemService.isLike(itemId, ID);

        if (isLike == 1) {   //좋아요 눌려있음
            int result = snsItemService.dislikeItem(itemId, ID);
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

    @Operation (summary = "중고장터 판매완료-완")
    @PutMapping ("/{itemId}/soldout")
    public ResponseEntity<?> soldOut(@RequestHeader ("ID") int ID, @PathVariable int itemId) {
        int id = snsItemService.soldOut(itemId);

        if (id > 0) {
            return ResponseEntity.ok("중고마켓 판매상태 변경 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고마켓 판매상태 변경 오류");
    }
}
