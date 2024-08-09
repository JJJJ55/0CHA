package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.model.ItemDto;
import com.ssafy.back_end.sns.model.ItemListDto;
import com.ssafy.back_end.sns.service.SnsItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
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
    public ResponseEntity<?> getItems(HttpServletRequest request, @RequestParam (value = "user-id", defaultValue = "0") int userId,
                                      @RequestParam (value = "district", defaultValue = "") String district,
                                      @RequestParam (value = "si-gun-gu", defaultValue = "") String siGunGu,
                                      @RequestParam (value = "title", defaultValue = "") String title,
                                      @RequestParam (value = "page", defaultValue = "1") int page,
                                      @RequestParam (value = "limit", defaultValue = "20") int limit) {
        int ID = (Integer)request.getAttribute("userId");
        int offset = (page - 1) * limit;

        ItemListDto list = new ItemListDto();
        List<ItemDto> items = snsItemService.getItems(ID, userId, district, siGunGu, title, offset, limit);
        list.setSize(snsItemService.getItems(ID, userId, district, siGunGu, title, 0, 9999999).size());
        list.setItems(items);

        if (items != null) {
            if (items.isEmpty()) {
                return ResponseEntity.ok("중고장터 0개입니다");
            }
            return ResponseEntity.ok(list);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고장터 조회 오류");
    }

    @Operation (summary = "중고장터 자세히보기-완")
    @GetMapping ("/{itemId}")
    public ResponseEntity<?> getItemDetail(HttpServletRequest request, @PathVariable ("itemId") int itemId) {
        int ID = (Integer)request.getAttribute("userId");
        ItemDto item = snsItemService.getItemDetail(ID, itemId);

        if (item != null) {
            return ResponseEntity.ok(item);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고장터 세부조회 오류");
    }

    @Operation(summary = "중고장터 글쓰기-완")
    @PostMapping("/write")
    public ResponseEntity<?> writeItem(HttpServletRequest request, @RequestPart("item") ItemDto item, @RequestParam("images") List<MultipartFile> images) {
        int userID = (Integer) request.getAttribute("userId");
        item.setUserId(userID);

        // 작성된 게시글 번호
        int itemID = snsItemService.writeItem(item);

        // 받은 이미지로 서버에 저장하고 저장된 경로를 list로 반환
        List<String> savedImagePath = new ArrayList<>();

        String uploadDir = "/home/ubuntu/images/item/";

        for (int i = 0; i < images.size(); i++) {
            MultipartFile image = images.get(i);
            if (!image.isEmpty()) {
                try {
                    String originalImageName = image.getOriginalFilename();
                    String imageExtension = "";

                    // 파일 확장자 추출
                    if (originalImageName != null && originalImageName.contains(".")) {
                        imageExtension = originalImageName.substring(originalImageName.lastIndexOf("."));
                    }

                    // 고유한 파일 이름 생성
                    // 사용자 ID-게시물 번호-해당 게시물에서 이미지 순서.확장자
                    String newFileName = userID + "-" + itemID + "-" + i + imageExtension;

                    // 파일 저장
                    image.transferTo(new File(uploadDir + newFileName));

                    // 이미지 정보 DB에 저장
                    String imageUrl = uploadDir + newFileName;
                    snsItemService.saveImageDetails(itemID, userID, imageUrl, originalImageName, newFileName);

                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 오류");
                }
            }
        }

        // 이미지 경로 DB에 저장 (필요 시 코드 추가)
        // insert into item_details(item_id, detail_type, user_id, image_url, origin_name, save_name)
        // value(itemId, 'image', userId, uploadDir+newFileName, originalImageName, newFileName);


        if (itemID > 0) {
            return ResponseEntity.ok("중고마켓 작성 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고마켓 작성 오류");
    }


    @Operation (summary = "중고장터 글수정-완")
    @PutMapping ("/{itemId}")
    public ResponseEntity<?> updateItem(HttpServletRequest request, @PathVariable int itemId, @RequestBody ItemDto item) {
        int ID = (Integer)request.getAttribute("userId");
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
    public ResponseEntity<?> deleteItem(@PathVariable int itemId) {
        int result = snsItemService.deleteItem(itemId);

        if (result != 0) {
            return ResponseEntity.ok("중고장터 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고장터 삭제 오류");
    }

    @Operation (summary = "중고장터 좋아요-완")
    @PostMapping ("/{itemId}/like")
    public ResponseEntity<?> likeItem(HttpServletRequest request, @PathVariable int itemId) {
        int ID = (Integer)request.getAttribute("userId");
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
    public ResponseEntity<?> dislikeItem(HttpServletRequest request, @PathVariable int itemId) {
        int ID = (Integer)request.getAttribute("userId");
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
    public ResponseEntity<?> soldOut(@PathVariable int itemId) {
        int id = snsItemService.soldOut(itemId);

        if (id > 0) {
            return ResponseEntity.ok("중고마켓 판매상태 변경 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고마켓 판매상태 변경 오류");
    }
}
