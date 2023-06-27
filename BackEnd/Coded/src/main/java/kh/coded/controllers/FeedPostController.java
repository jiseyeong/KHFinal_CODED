package kh.coded.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.FeedCommentAddDTO;
import kh.coded.dto.FeedCommentDTO;
import kh.coded.dto.FeedPostAddDTO;
import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.security.JwtProvider;
import kh.coded.services.FeedPostService;
import kh.coded.services.MemberService;
import kh.coded.services.PhotoService;


@RestController
@RequestMapping("/feedpost/")
public class FeedPostController {

    @Autowired
    private FeedPostService feedpostService;

    @Autowired
    private PhotoService photoService;

    @Autowired
    private MemberService memberService;
    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping(value = "feedpost") // 피드 쓰기 - 피드를 작성 할 수 있는 페이지
    public ResponseEntity<?> insertFeedPost(
            @RequestParam(value = "fdto") FeedPostDTO fdto,
            @RequestParam(value = "hdto") HashTagDTO hdto,
            @RequestParam(value = "pdto") PhotoDTO pdto) {
        try {
            Map<String, Integer> result = new HashMap<>();
            int FeedPost = feedpostService.insertFeedPost(fdto);
            int HashTag = feedpostService.insertHashTag(hdto.getHashTag());
            int FeedPhoto = feedpostService.insertFeedPhoto(pdto);
            int PostHashs = feedpostService.insertPostHashs(fdto.getUserNo(), hdto.getTagId());
            result.put("FeedPost", FeedPost);
            result.put("HashTag", HashTag);
            result.put("FeedPhoto", FeedPhoto);
            result.put("PostHashs", PostHashs);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/hashtagList")
    public ResponseEntity<?> getHashTagLists(@RequestParam(value = "feedPostId") int feedPostId) {
        return ResponseEntity.ok().body(feedpostService.selectHashTagList(feedPostId));
    }
    

    // 피드 리스트 전체 뽑기 ( 기본 양식 )
    @GetMapping("/selectAllFeedPost/")
    public ResponseEntity<?> selectFeedList(
            @RequestParam(value = "cpage", required = false, defaultValue = "1") int cpage) {
        List<FeedPostAddDTO> data = feedpostService.selectAllFeedPost(cpage);
        return ResponseEntity.ok().body(data);
    }

    // 해시태그 검색을 통한 피드 리스트 뽑기
    @GetMapping("/selectSearchHashFeedList/{keyword}")
    public ResponseEntity<?> selectSearchFeedListByHashs(
            @RequestParam(value = "cpage", required = false, defaultValue = "1") int cpage,
            @PathVariable("keyword") String keyword) {
        List<FeedPostAddDTO> data = feedpostService.selectSearchFeedListByHashs(cpage, keyword);
        return ResponseEntity.ok().body(data);
    }

    // 단순 피드DTO만 뽑기
    @GetMapping("/selectfeedlist/")
    public ResponseEntity<?> selectFeedList() {
        List<FeedPostDTO> list = feedpostService.selectTestFeedList();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/weeklyFeed")
    public ResponseEntity<?> selectWeeklyFeed(
            @RequestParam(value = "currentTemp") int currentTemp,
            @RequestParam(value = "currentTempRange") int currentTempRange,
            @RequestParam(value = "cpage", required = false, defaultValue = "1") int cpage
    ) {
        List<FeedPostAddDTO> data = feedpostService.selectWeeklyFeed(currentTemp, currentTempRange, cpage);
        return ResponseEntity.ok().body(data);
    }

    @GetMapping("/selectFeedDetail") //피드 상세
    public ResponseEntity<?> selectFeedDetail(
            @RequestParam int feedPostId,
            @RequestHeader(value = "authorization") String authorization) {
        int userNo = 0;
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                userNo = jwtProvider.getLoginUserNo(accessToken);
            }
        }

        Map<String, Object> data = feedpostService.selectFeedDetail(feedPostId, userNo);
        return ResponseEntity.ok().body(data);
    }

    @PutMapping("/updateFeedPost") //피드 수정
    public ResponseEntity<?> updateFeedPost(@RequestParam int feedPostId, @RequestParam String body) {
        feedpostService.updateFeedPost(feedPostId, body);

        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping("/deleteFeedPost") //피드 삭제
    public ResponseEntity<?> deleteFeedPost(@RequestParam int feedPostId) {
        feedpostService.deleteFeedPost(feedPostId);

        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/insertFeedLike") //피드 좋아요 입력 & 삭제 (팔로잉 팔로워 참조)
    public ResponseEntity<?> FeedLike(@RequestHeader(value = "authorization") String authorization, @RequestParam int feedPostId) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                boolean result = feedpostService.isFeedLike(userNo, feedPostId);
                if (!result) {
                    int feedLikeCount = feedpostService.insertFeedLike(userNo, feedPostId);
                    return ResponseEntity.ok().body(feedLikeCount);
                } else {
                    int feedLikeCount = feedpostService.deleteFeedLike(userNo, feedPostId);
                    return ResponseEntity.ok().body(feedLikeCount);
                }
            }
            ;
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @GetMapping("/likeCount")
    public ResponseEntity<?> getFeedLikeCount(
            @RequestParam(value = "feedPostId") int feedPostId
    ) {
        return ResponseEntity.ok().body(feedpostService.selectFeedLike(feedPostId));
    }

    @GetMapping("/isLike")
    public ResponseEntity<?> getFeedIsLike(
            @RequestHeader(value = "authorization") String authorization,
            @RequestParam(value = "feedPostId") int feedPostId
    ) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                return ResponseEntity.ok().body(feedpostService.isFeedLike(userNo, feedPostId));
            }
            ;
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @PostMapping("/insertFeedScrap") //피드 스크랩 입력 & 삭제
    public ResponseEntity<?> insertFeedScrap(@RequestParam int userNo, @RequestParam int feedPostId) {
        boolean result = feedpostService.isFeedScrap(userNo, feedPostId);
        if (!result) {
            return ResponseEntity.ok().body(feedpostService.insertFeedLike(userNo, feedPostId));
        } else {
            feedpostService.deleteFeedScrap(userNo, feedPostId);
            return ResponseEntity.ok().body(null);
        }
    }

    // /feedpost/
    @PostMapping("comment")
    public ResponseEntity<?> insertComment(
            @RequestHeader(value = "authorization") String authorization,
            @RequestParam(value = "feedPostId") int feedPostId,
            @RequestParam(value = "body") String body
    ) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                return ResponseEntity.ok().body(feedpostService.insertComment(new FeedCommentDTO(0, userNo, feedPostId, 0, body, null, 0)));
            }
            ;
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @PostMapping("nestedComment")
    public ResponseEntity<?> insertNestedComment(
            @RequestHeader(value = "authorization") String authorization,
            @RequestParam(value = "feedPostId") int feedPostId,
            @RequestParam(value = "parentId") int parentId,
            @RequestParam(value = "body") String body,
            @RequestParam(value = "depth") int depth
    ) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                return ResponseEntity.ok().body(feedpostService.insertNestedComment(new FeedCommentDTO(0, userNo, feedPostId, parentId, body, null, depth)));
            }
            ;
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @PutMapping("comment")
    public ResponseEntity<?> updateComment(
            @RequestHeader(value = "authorization") String authorization,
            @RequestParam(value = "feedCommentId") int commentId,
            @RequestParam(value = "body") String body
    ) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                feedpostService.updateComment(commentId, body);
                return ResponseEntity.ok().body(null);
            }
            ;
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @DeleteMapping("comment")
    public ResponseEntity<?> deleteComment(
            @RequestHeader(value = "authorization") String authorization,
            @RequestParam(value = "feedCommentId") int commentId
    ) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                feedpostService.deleteComment(commentId);
                return ResponseEntity.ok().body(null);
            }
            ;
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");

    }

    @GetMapping("comment/depth0")
    public ResponseEntity<?> selectCommentDepth0(
            @RequestParam(value = "feedPostId") int feedPostId
    ) {
        List<FeedCommentAddDTO> result = feedpostService.selectCommentByFeedPostIdAndDepth0(feedPostId);
        if (result.size() > 0) {
            return ResponseEntity.ok().body(result);
        }
        return ResponseEntity.badRequest().body("댓글이 없습니다.");
    }

    @GetMapping("comment/depthN")
    public ResponseEntity<?> selectCommentDepth(
            @RequestParam(value = "parentId") int parentId,
            @RequestParam(value = "depth") int depth
    ) {
        List<FeedCommentAddDTO> result = feedpostService.selectCommentByParentIdAndDepth(parentId, depth);
        if (result.size() > 0) {
            return ResponseEntity.ok().body(result);
        }
        return ResponseEntity.badRequest().body("대댓글이 없습니다.");
    }


    @GetMapping("comment/like")
    public ResponseEntity<?> selectCommentLike(
            @RequestHeader(value = "authorization") String authorization,
            @RequestParam(value = "commentId") int commentId
    ) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                return ResponseEntity.ok().body(feedpostService.selectCommentLikeForChecked(userNo, commentId));
            }
            ;
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @PostMapping("comment/like")
    public ResponseEntity<?> insertCommentLike(
            @RequestHeader(value = "authorization") String authorization,
            @RequestParam(value = "commentId") int commentId
    ) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                boolean isChecked = feedpostService.selectCommentLikeForChecked(userNo, commentId);
                if (isChecked) {
                    feedpostService.deleteCommentLike(userNo, commentId);
                } else {
                    feedpostService.insertCommentLike(userNo, commentId);
                }
                return ResponseEntity.ok().body(!isChecked);
            }
            ;
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @GetMapping("comment/likeCount")
    public ResponseEntity<?> selectCommentLikeCount(
            @RequestParam(value = "commentId") int commentId
    ) {
        int likeCount = feedpostService.selectCommentLikeForCount(commentId);
        return ResponseEntity.ok().body(likeCount);
    }

    @GetMapping(value = "selectUserFeedPost") // 마이 피드 리스트 - 본인이 작성한 피드 리스트 출력, 다른 유저의 마이 피드 리스트 - 다른 유저의 피드 리스트만 출력 + (마이픽 페이지 스크롤 적용)
    public ResponseEntity<?> selectUserFeedPost(
            @RequestParam(value = "userNo") int userNo,
            @RequestParam(value = "cpage", required = false, defaultValue = "1") int cpage) {
        try {
            List<FeedPostAddDTO> data = feedpostService.selectUserFeedPost(userNo,cpage);
            System.out.println(data.get(0).getFeedPostId());
            return ResponseEntity.ok().body(data);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

