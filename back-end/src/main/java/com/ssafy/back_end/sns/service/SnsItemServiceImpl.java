package com.ssafy.back_end.sns.service;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.ssafy.back_end.sns.mapper.SnsItemMapper;
import com.ssafy.back_end.sns.model.ItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SnsItemServiceImpl implements SnsItemService {

    private final String username = "ubuntu";  // EC2 인스턴스의 사용자 이름
    private final String host = "http://i11b310.p.ssafy.io"; // EC2의 Public IP 또는 DNS
    private final int port = 22; // 기본 SSH 포트
    private final String privateKeyPath = "back-end/I11B310T.pem"; // 로컬에 있는 PEM 파일의 경로

    private final SnsItemMapper snsItemMapper;

    @Autowired
    public SnsItemServiceImpl(SnsItemMapper snsItemMapper) {
        this.snsItemMapper = snsItemMapper;
    }

    public List<String> uploadImages(int userId, List<MultipartFile> Images, String remoteDir) {
        List<String> localFilePaths = new ArrayList<>();
        List<String> uploadedFilePaths = new ArrayList<>();

        // 파일을 로컬에 임시 저장
        for (MultipartFile image : Images) {
            try {
                // 임시 파일 생성
                File tempImage = File.createTempFile("upload-", image.getOriginalFilename());
                image.transferTo(tempImage); // MultipartFile을 임시 파일로 저장
                localFilePaths.add(tempImage.getAbsolutePath());

                // 서버에 저장된 파일 경로와 이름을 리스트에 추가
                uploadedFilePaths.add(tempImage.getAbsolutePath());

            } catch (IOException e) {
                e.printStackTrace();
                return null; // 실패 시 null 반환
            }
        }

        // EC2로 파일 업로드
        uploadImages(localFilePaths, remoteDir);

        // 임시 파일 삭제
        for (String path : localFilePaths) {
            new File(path).delete();
        }

        // 서버에 저장된 경로와 파일 이름의 리스트 반환
        return uploadedFilePaths;
    }

    private void uploadImages(List<String> localFilePaths, String remoteDir) {
        Session session = null;
        ChannelSftp channelSftp = null;

        try {
            // JSch 객체 생성
            JSch jsch = new JSch();
            jsch.addIdentity(privateKeyPath); // SSH 키 설정

            // 세션 생성 및 연결
            session = jsch.getSession(username, host, port);
            session.setConfig("StrictHostKeyChecking", "no"); // 호스트 키 확인 생략
            session.connect();

            // SFTP 채널 열기
            channelSftp = (ChannelSftp) session.openChannel("sftp");
            channelSftp.connect();

            // 파일 리스트 반복 처리
            for (String localFilePath : localFilePaths) {
                File localFile = new File(localFilePath);
                channelSftp.put(localFile.getAbsolutePath(), remoteDir);
                System.out.println("File uploaded successfully to " + remoteDir + ": " + localFile.getName());
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (channelSftp != null) {
                channelSftp.disconnect();
            }
            if (session != null) {
                session.disconnect();
            }
        }
    }

    @Override
    public List<ItemDto> getItems(int myId, int userId, String district, String siGunGu, String title, int offset, int limit) {
        return snsItemMapper.getItems(myId, userId, district,siGunGu, title, offset, limit);
    }

    @Override
    public ItemDto getItemDetail(int myId, int itemId) {
        return snsItemMapper.getItemDetail(myId, itemId);
    }

    @Override
    @Transactional
    public int writeItem(ItemDto item) {
        validateImages(item.getImages());

        ItemDto itemBuilder = ItemDto.builder()
                .title(item.getTitle())
                .price(item.getPrice())
                .content(item.getContent())
                .userId(item.getUserId())
                .build();

        snsItemMapper.insertItem(itemBuilder);
        if (item.getImages() != null && !item.getImages().isEmpty()) {
            snsItemMapper.insertItemImages(itemBuilder.getId(), item.getUserId(), item.getImages());
        }

        return itemBuilder.getId();
    }

    @Override
    @Transactional
    public int updateItem(ItemDto item) {
        validateImages(item.getImages());

        ItemDto itemBuilder = ItemDto.builder()
                .title(item.getTitle())
                .price(item.getPrice())
                .content(item.getContent())
                .updatedAt(item.getUpdatedAt())
                .id(item.getId())
                .build();

        snsItemMapper.updateItem(itemBuilder);

        if (item.getImages() != null && !item.getImages().isEmpty()) {
            snsItemMapper.deleteItemImages(item.getId());
            snsItemMapper.insertItemImages(item.getId(), item.getUserId(), item.getImages());
        }

        return item.getId();
    }

    @Override
    public int deleteItem(int itemId) {
        return snsItemMapper.deleteItem(itemId);
    }

    @Override
    public int isLike(int itemId, int userId) {
        return snsItemMapper.isLike(itemId, userId);
    }

    @Override
    public int likeItem(int itemId, int userId) {
        return snsItemMapper.likeItem(itemId, userId);
    }

    @Override
    public int dislikeItem(int itemId, int userId) {
        return snsItemMapper.dislikeItem(itemId, userId);
    }

    @Override
    public int soldOut(int itemId) {
        return snsItemMapper.soldOut(itemId);
    }

    @Override
    public void validateImages(List<MultipartFile> images) {
        if (images == null || images.isEmpty()) {
            throw new IllegalArgumentException("At least one image is required.");
        }
        if (images.size() >= 5) {
            throw new IllegalArgumentException("A maximum of 5 images are allowed.");
        }
    }

}
