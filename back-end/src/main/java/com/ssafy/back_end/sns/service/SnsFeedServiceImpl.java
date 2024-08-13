package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.mapper.SnsFeedMapper;
import com.ssafy.back_end.sns.model.FeedDto;
import com.ssafy.back_end.sns.model.FeedInteractionDto;
import com.ssafy.back_end.sns.model.SnsRoutineDto;
import com.ssafy.back_end.sns.model.UserPageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;

@Service
public class SnsFeedServiceImpl implements SnsFeedService {

    private static final Logger log = LoggerFactory.getLogger(SnsItemServiceImpl.class);
    private final SnsFeedMapper snsFeedMapper;

    @Autowired
    public SnsFeedServiceImpl(SnsFeedMapper snsFeedMapper) {
        this.snsFeedMapper = snsFeedMapper;
    }

    @Override
    public List<FeedDto> getFeeds(int myId, int userId, int offset, int limit) {
        return snsFeedMapper.getFeeds(myId, userId, offset, limit);
    }

    @Override
    public SnsRoutineDto getMyRoutine(int userId) {
        Integer result = snsFeedMapper.getMyRoutine(userId);
        if (result != null) {
            SnsRoutineDto snsRoutineDto = new SnsRoutineDto();
            snsRoutineDto.setId(result);
            snsRoutineDto.setDetails(snsFeedMapper.getRoutine(result));
            return snsRoutineDto;
        }
        return null;
    }

    @Override
    public SnsRoutineDto getRoutine(int feedId) {
        SnsRoutineDto routineDto = new SnsRoutineDto();
        int routineId = snsFeedMapper.getRoutineId(feedId);
        routineDto.setId(routineId);
        routineDto.setDetails(snsFeedMapper.getRoutine(routineId));
        return routineDto;
    }

    @Override
    public int setUpload(int routineId) {
        return snsFeedMapper.setUpload(routineId);
    }

    @Override
    public int saveRoutine(int userId, int routineId) {
        return 0;   //루틴에 유저 아이디 추가해서 저장하기
    }

    @Override
    public int writeFeed(FeedDto feedDto) {
//        validateImages(feedDto.getImage());

        FeedDto feed = FeedDto.builder().content(feedDto.getContent()).routineId(feedDto.getRoutineId()).userId(feedDto.getUserId()).build();

        log.info("Feed details: {}", feed);
        snsFeedMapper.writeFeed(feed);

        int feedId = feed.getId();
        if (feedId == 0) {
            throw new IllegalStateException("Feed ID 생성 실패");
        }

//        return snsFeedMapper.writeFeed(feed);
        return feedId;
    }

    @Override
    public int updateImage(int feedId, String image) {
        return snsFeedMapper.updateImage(feedId, image);
    }


    @Override
    public int updateFeed(FeedDto feedDto) {
        validateImages(1);

        FeedDto feed = FeedDto.builder().content(feedDto.getContent()).image(feedDto.getImage()).routineId(feedDto.getRoutineId()).id(feedDto.getId()).build();
        return snsFeedMapper.updateFeed(feed);
    }

    @Override
    @Transactional
    public int deleteFeed(int feedId) {
        String imagePath = snsFeedMapper.getImagePathsByFeedId(feedId);

        // 2. 각 이미지 파일을 호스트 디렉토리에서 삭제
        try {
            File file = new File(imagePath);
            if (file.exists()) {
                if (file.delete()) {
                    log.debug("이미지 파일 삭제 성공, {}", imagePath);
                }
                else {
                    log.warn("이미지 파일 삭제 실패, {}", imagePath);
                    throw new RuntimeException("이미지 파일 삭제 실패: " + imagePath);
                }
            }
            else {
                log.warn("이미지 파일이 존재하지 않습니다, {}", imagePath);
                throw new RuntimeException("이미지 파일이 존재하지 않음: " + imagePath);
            }


            return snsFeedMapper.deleteFeed(feedId);

        }
        catch (Exception e) {
            log.error("게시물 삭제 중 오류 발생: {}", e.getMessage());
            throw e;  // 트랜잭션 롤백을 위해 예외를 다시 던짐
        }


//        return snsFeedMapper.deleteFeed(feedId);
    }

    @Override
    public List<UserPageDto> getListLikes(int feedId) {
        return snsFeedMapper.getListLikes(feedId);
    }

    @Override
    public int isLike(int feedId, int userId) {
        return snsFeedMapper.isLike(feedId, userId);
    }

    @Override
    public int likeFeed(int feedId, int userId) {
        return snsFeedMapper.likeFeed(feedId, userId);
    }

    @Override
    public int dislikeFeed(int feedId, int userId) {
        return snsFeedMapper.dislikeFeed(feedId, userId);
    }

    @Override
    public List<FeedInteractionDto> getListComments(int feedId) {
        return snsFeedMapper.getListComments(feedId);
    }

    @Override
    public int writeComment(FeedInteractionDto feedInteractionDto) {
        FeedInteractionDto comment = FeedInteractionDto.builder().feedId(feedInteractionDto.getFeedId()).userId(feedInteractionDto.getUserId()).comment(feedInteractionDto.getComment()).build();
        return snsFeedMapper.writeComment(comment);
    }

    @Override
    public int updateComment(FeedInteractionDto feedInteractionDto) {
        FeedInteractionDto comment = FeedInteractionDto.builder().comment(feedInteractionDto.getComment()).id(feedInteractionDto.getId()).build();
        return snsFeedMapper.updateComment(comment);
    }

    @Override
    public int deleteComment(int commentId) {
        return snsFeedMapper.deleteComment(commentId);
    }

    @Override
    public void validateImages(int imageN) {
        if (imageN != 1) {
            throw new IllegalArgumentException("At least one image is required.");
        }
    }
}
