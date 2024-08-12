package com.ssafy.back_end.sns.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.back_end.sns.model.ItemDto;
import com.ssafy.back_end.sns.model.ItemListDto;
import com.ssafy.back_end.sns.service.SnsItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag (name = "SNS중고장터")
@RestController
@RequestMapping (value = "/api/sns/item")
public class SnsItemController {
    private static final Logger log = LoggerFactory.getLogger(SnsItemController.class);
    private final SnsItemService snsItemService;

    @Autowired
    public SnsItemController(SnsItemService snsItemService) {
        this.snsItemService = snsItemService;
    }

    @Operation(summary = "전체or유저 중고장터 목록보기-완")
    @GetMapping("/list")
    public ResponseEntity<?> getItems(HttpServletRequest request,
                                      @RequestParam(value = "user-id", defaultValue = "0") int userId,
                                      @RequestParam(value = "district", defaultValue = "") String district,
                                      @RequestParam(value = "si-gun-gu", defaultValue = "") String siGunGu,
                                      @RequestParam(value = "title", defaultValue = "") String title,
                                      @RequestParam(value = "page", defaultValue = "1") int page,
                                      @RequestParam(value = "limit", defaultValue = "20") int limit) {
        int ID = (Integer) request.getAttribute("userId");
        int offset = (page - 1) * limit;

        // 로그 추가
        log.info("User ID: {}, District: {}, SiGunGu: {}, Title: {}, Page: {}, Limit: {}, Offset: {}",
                userId, district, siGunGu, title, page, limit, offset);
        log.info("Requesting user ID: {}", ID);

        ItemListDto list = new ItemListDto();
        List<ItemDto> items = snsItemService.getItems(ID, userId, district, siGunGu, title, offset, limit);

        // 로그 추가
        log.debug("Retrieved {} items", items != null ? items.size() : 0);

        list.setSize(snsItemService.getItems(ID, userId, district, siGunGu, title, 0, 9999999).size());
        list.setItems(items);

        if (items != null && !items.isEmpty()) {
            log.debug("Retrieved {} items", items.size());
            for (ItemDto item : items) {
                log.debug("Item {}", item);
            }
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            log.debug("No items retrieved or items list is null");
        }
        log.error("Item retrieval failed");
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
    public ResponseEntity<?> writeItem(HttpServletRequest request,
                                       @RequestPart("item") ItemDto item,
                                       @RequestPart("images") List<MultipartFile> images) {

        log.debug("[SnsItemController] writeItem - 시작");

        int userID = (Integer) request.getAttribute("userId");
        item.setUserId(userID);

        snsItemService.validateImages(images.size());

        log.debug("[SnsItemController] item 정보: {}", item.toString());

        // 작성된 게시글 번호
        int itemID = snsItemService.writeItem(item);
        log.debug("[SnsItemController] itemID : {}", itemID);

        String uploadDir = "/home/ubuntu/images/item/";
        File uploadDirectory = new File(uploadDir);

        // 디렉토리가 존재하지 않으면 생성
        if (!uploadDirectory.exists()) {
            log.debug("[SnsItemController] 디렉토리 {} 가 존재하지 않음", uploadDirectory.getAbsolutePath());
            boolean isCreated = uploadDirectory.mkdirs();
            if (!isCreated) {
                log.debug("[SnsItemController] 디렉토리 {} 생성 실패", uploadDirectory.getAbsolutePath());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("디렉토리 생성 실패");
            } else {
                log.debug("[SnsItemController] 디렉토리 {} 생성 완료", uploadDirectory.getAbsolutePath());
            }
        }
        log.debug("[SnsItemController] 디렉토리 {} 가 존재함", uploadDirectory.getAbsolutePath());

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
                    log.debug("[SnsItemController] 새 파일 이름 생성: {}", newFileName);

                    // 파일 저장
                    image.transferTo(new File(uploadDir + newFileName));

                    // 이미지 정보 DB에 저장
                    String imageUrl = uploadDir + newFileName;
                    log.debug("[SnsItemController] 이미지 저장 경로: {}", imageUrl);

                    snsItemService.saveImageDetail(itemID, userID, imageUrl, originalImageName, newFileName);
                    log.debug("[SnsItemController] 이미지 업로드 성공: {}", newFileName);

                } catch (IOException e) {
                    log.error("[SnsItemController] 이미지 업로드 오류", e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 오류");
                }
            }
        }

        if (itemID > 0) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "중고마켓 작성 성공");
            response.put("itemID", itemID);
            log.debug("[SnsItemController] 중고마켓 작성 성공, itemID: {}", itemID);
            return ResponseEntity.ok(response);
        }
        log.debug("[SnsItemController] 중고마켓 작성 오류");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고마켓 작성 오류");
    }



    @Operation (summary = "중고장터 글수정-완")
    @PutMapping ("/{itemId}")
    public ResponseEntity<?> updateItem(HttpServletRequest request,
                                        @PathVariable int itemId,
                                        @RequestPart("item") ItemDto item,
                                        @RequestPart(value = "removeImagePaths", required = false) List<String> removeImagePaths,
                                        @RequestPart(value = "addImages", required = false) List<MultipartFile> addImages) {
        // 사용자 ID를 request에서 추출
        int ID = (Integer)request.getAttribute("userId");
        log.debug("SnsItemContoller UserID: {}", ID);

        // itemId 로그 출력
        log.debug("SnsItemController Item ID: {}", itemId);

        // ItemDto 객체 로그 출력
        log.debug("SnsItemController ItemDto: {}", item);

        // 제거할 이미지 경로 목록 로그 출력
        if (removeImagePaths != null && !removeImagePaths.isEmpty()) {
            log.debug("SnsItemController Remove Image Paths: {}", removeImagePaths);
        } else {
            log.debug("SnsItemController No images to remove.");
        }

        // 추가할 이미지 파일 목록 로그 출력
        if (addImages != null && !addImages.isEmpty()) {
            log.debug("SnsItemController Add Images: {} files", addImages.size());
            for (MultipartFile file : addImages) {
                log.debug("SnsItemController File Name: {}, Size: {} bytes", file.getOriginalFilename(), file.getSize());
            }
        } else {
            log.debug("SnsItemController No images to add.");
        }

        // 1. 받은 삭제할 파일 인덱스 or 파일 저장 경로를 기준으로 호스트 디렉토리에서 이미지 제거
        // 2. DB에 저장된 파일 정보 삭제
        int deleteCnt = snsItemService.deleteImagesByImageUrl(removeImagePaths);
        log.debug("SnsItemController {} images removed from DB and file system.", deleteCnt);

        // 3. 이미지 저장 경로 설정
        String uploadDir = "/home/ubuntu/images/item/";
        File uploadDirectory = new File(uploadDir);

        // 디렉토리가 존재하지 않으면 생성
        if (!uploadDirectory.exists()) {
            log.debug("[SnsItemController] 디렉토리 {} 가 존재하지 않음", uploadDirectory.getAbsolutePath());
            boolean isCreated = uploadDirectory.mkdirs();
            if (!isCreated) {
                log.debug("[SnsItemController] 디렉토리 {} 생성 실패", uploadDirectory.getAbsolutePath());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("디렉토리 생성 실패");
            } else {
                log.debug("[SnsItemController] 디렉토리 {} 생성 완료", uploadDirectory.getAbsolutePath());
            }
        }
        log.debug("[SnsItemController] 디렉토리 {} 가 존재함", uploadDirectory.getAbsolutePath());

        // 4. 해당 게시물에서 삭제하고 남은 이미지 중에서 가장 마지막 이미지(마지막 숫자가 큰)를 가져옴
        int lastIndex = 0;

        // DB에서 해당 itemId에 대한 남은 이미지들의 URL을 가져옴
        List<String> remainingImageUrls = snsItemService.getRemainingImageUrls(itemId);
        log.debug("[SnsItemController] Remaining images count: {}", remainingImageUrls.size());

        if(remainingImageUrls.size() != 0){
            // 이미지 URL에서 마지막 순번을 추출
            for (String imageUrl : remainingImageUrls) {
                String[] parts = imageUrl.split("-");
                if (parts.length > 2) {
                    // 이미지 순번은 "user_id-item_id-순번.확장자" 형식에서 순번이 위치한 부분을 추출
                    String sequencePart = parts[2];
                    int dotIndex = sequencePart.lastIndexOf(".");
                    int sequence = Integer.parseInt(sequencePart.substring(0, dotIndex));
                    if (sequence > lastIndex) {
                        lastIndex = sequence;
                    }
                }
            }
            log.debug("[SnsItemController] Last image index after deletion: {}", lastIndex);
        }

        // 5. 추가된 이미지를 저장하고 DB에 기록
        for (int i = 0; i < addImages.size(); i++) {
            MultipartFile image = addImages.get(i);
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
                    String newFileName = ID + "-" + itemId + "-" + (lastIndex + i + 1) + imageExtension;
                    log.debug("[SnsItemController] 새 파일 이름 생성: {}", newFileName);

                    // 파일 저장
                    image.transferTo(new File(uploadDir + newFileName));
                    log.debug("[SnsItemController] Image file saved: {}", newFileName);

                    // 이미지 정보 DB에 저장
                    String imageUrl = uploadDir + newFileName;
                    snsItemService.saveImageDetail(itemId, ID, imageUrl, originalImageName, newFileName);
                    log.debug("[SnsItemController] Image details saved to DB: {}", newFileName);

                } catch (IOException e) {
                    log.error("[SnsItemController] 이미지 업로드 오류", e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 오류");
                }
            }
        }

        // 6. 게시글 내용 수정
        item.setUserId(ID);
        item.setId(itemId);
        log.debug("[SnsItemController] Updated item details: {}", item);

        int id = snsItemService.updateItem(item);

        if (id > 0) {
            log.debug("[SnsItemController] Item update successful: {}", itemId);
            return ResponseEntity.ok("중고마켓 수정 성공");
        }
        log.error("[SnsItemController] Item update failed: {}", itemId);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고마켓 수정 오류");
    }

    @Operation(summary = "중고장터 글삭제-완")
    @DeleteMapping("/{itemId}")
    public ResponseEntity<String> deleteItem(@PathVariable int itemId) {
        try {
            log.info("컨트롤러: 중고장터 삭제 요청 받음: itemId={}", itemId);

            int result = snsItemService.deleteItem(itemId);

            if (result != 0) {
                log.info("컨트롤러: 중고장터 삭제 성공: itemId={}", itemId);
                return ResponseEntity.ok("중고장터 삭제 성공");
            } else {
                log.warn("컨트롤러: 중고장터 삭제 실패, 항목을 찾을 수 없음: itemId={}", itemId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("삭제할 항목이 없습니다.");
            }
        } catch (Exception e) {
            log.error("컨트롤러: 중고장터 삭제 중 오류 발생: itemId={}, error={}", itemId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류로 삭제 실패");
        }
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
