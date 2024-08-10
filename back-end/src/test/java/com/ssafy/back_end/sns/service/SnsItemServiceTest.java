package com.ssafy.back_end.sns.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import com.ssafy.back_end.sns.mapper.SnsItemMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.List;

public class SnsItemServiceTest {

    @Mock
    private SnsItemMapper snsItemMapper;

    @InjectMocks
    private SnsItemService snsItemService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testDeleteItem_Success() {
        int itemId = 1;
        List<String> imagePaths = Arrays.asList("/path/to/image1.jpg", "/path/to/image2.jpg");

        when(snsItemMapper.getImagePathsByItemId(itemId)).thenReturn(imagePaths);
        when(snsItemMapper.deleteItemDetail(itemId)).thenReturn(1);
        when(snsItemMapper.deleteItem(itemId)).thenReturn(1);

        int result = snsItemService.deleteItem(itemId);

        assertEquals(1, result);
        verify(snsItemMapper, times(1)).getImagePathsByItemId(itemId);
        verify(snsItemMapper, times(1)).deleteItemDetail(itemId);
        verify(snsItemMapper, times(1)).deleteItem(itemId);
    }

    @Test
    public void testDeleteItem_ImageDeleteFail() {
        int itemId = 1;
        List<String> imagePaths = Arrays.asList("/path/to/image1.jpg");

        when(snsItemMapper.getImagePathsByItemId(itemId)).thenReturn(imagePaths);
        when(snsItemMapper.deleteItemDetail(itemId)).thenReturn(1);

        // Mocking to simulate file deletion failure
        doThrow(new RuntimeException("이미지 파일 삭제 실패")).when(snsItemMapper).deleteItem(itemId);

        try {
            snsItemService.deleteItem(itemId);
        } catch (RuntimeException e) {
            assertEquals("이미지 파일 삭제 실패: /path/to/image1.jpg", e.getMessage());
        }

        verify(snsItemMapper, times(1)).getImagePathsByItemId(itemId);
        verify(snsItemMapper, never()).deleteItemDetail(itemId);
    }
}
