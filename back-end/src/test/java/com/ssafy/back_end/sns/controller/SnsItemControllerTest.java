package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.service.SnsItemServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class SnsItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SnsItemServiceImpl snsItemServiceImpl;

    @Autowired
    private SnsItemController snsItemController;

    @BeforeEach
    public void setUp() {
        // MockMvc를 standaloneSetup으로 설정하여 인터셉터를 제외
        mockMvc = MockMvcBuilders.standaloneSetup(snsItemController).build();
    }

    @Test
    public void testWriteItem() throws Exception {

        // Mock 이미지 파일 생성
        MockMultipartFile imageFile = new MockMultipartFile(
                "images", // 요청 파라미터 이름s
                "0CHA.png", // 파일 이름
                MediaType.IMAGE_PNG_VALUE, // 파일의 MIME 타입
                "Test Image Content".getBytes() // 파일 내용
        );

        // 요청 보낼 때 필요한 JSON 데이터 설정
        MockMultipartFile itemData = new MockMultipartFile(
                "item", // 요청 파라미터 이름
                "", // 파일 이름 (빈 문자열로 설정)
                MediaType.APPLICATION_JSON_VALUE, // 파일의 MIME 타입
                ("{" +
                        "\"id\":0," +
                        "\"userId\":1," + // userId는 테스트 데이터로 임의 설정
                        "\"title\":\"Test Item\"," +
                        "\"content\":\"Test Description\"," +
                        "\"price\":1000," +
                        "\"isSold\":0," +
                        "\"createdAt\":null," + // Timestamp 필드는 null로 설정
                        "\"updatedAt\":null," + // Timestamp 필드는 null로 설정
                        "\"district\":\"Test District\"," +
                        "\"siGunGu\":\"Test SiGunGu\"," +
                        "\"likeCount\":0," +
                        "\"nickname\":\"Test Nickname\"," +
                        "\"profileImage\":\"/path/to/profile/image\"," +
                        "\"images\":[]," + // 이미지는 따로 추가되므로 비워둠
                        "\"isLike\":0" +
                        "}").getBytes() // JSON 데이터를 바이트 배열로 변환
        );


        // 테스트용 요청 생성 및 수행
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/sns/item/write")
                        .file(itemData) // ItemDto 데이터를 포함합니다.
                        .file(imageFile) // 이미지 파일을 포함합니다.
                        .requestAttr("userId", 1)) // 요청 속성에 userId를 설정합니다.
                .andDo(printResult()) // 결과를 콘솔에 출력합니다.
                .andExpect(status().isOk()) // 응답 상태가 200 OK인지 확인합니다.
                .andExpect(jsonPath("$.message").value("중고마켓 작성 성공")) // 응답 JSON의 message 값이 "중고마켓 작성 성공"인지 확인합니다.
                .andExpect(jsonPath("$.itemID").exists()); // 응답 JSON에 itemID가 존재하는지 확인합니다.
    }

    public static ResultHandler printResult() {
        return result -> {
            System.out.println("Response: " + result.getResponse().getContentAsString());
        };
    }

    @Test
    public void testDeleteItem_Success() throws Exception {
        int itemId = 65;

        // 모킹된 서비스 메서드가 올바른 값을 반환하도록 설정
        when(snsItemServiceImpl.deleteItem(itemId)).thenReturn(1);

        // MockMvc를 통해 DELETE 요청 수행 및 검증
        mockMvc.perform(delete("/api/sns/item/{itemId}", itemId))
                .andExpect(status().isOk())
                .andExpect(content().string("중고장터 삭제 성공"));
    }
}
