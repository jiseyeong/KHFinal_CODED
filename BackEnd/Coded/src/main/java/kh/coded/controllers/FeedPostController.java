package kh.coded.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kh.coded.dto.FeedCommentAddDTO;
import kh.coded.dto.FeedCommentDTO;
import kh.coded.dto.FeedPostAddDTO;
import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.security.JwtProvider;
import kh.coded.services.FeedPostService;

@RestController
@RequestMapping("/feedpost/")
public class FeedPostController {

    @Autowired
    private FeedPostService feedpostService;

    @Autowired
    private JwtProvider jwtProvider;

    @GetMapping(value = "feedpost") // 마이 피드 리스트 - 본인이 작성한 피드 리스트 출력, 다른 유저의 마이 피드 리스트 - 다른 유저의 피드 리스트만 출력
    public ResponseEntity<?> selectNoScrollFeedList(@RequestParam(value = "userNo") int userNo) {
        try {
            List<FeedPostDTO> list = feedpostService.selectFeedList(userNo);
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(value = "updatefeed") // 피드 수정하기 전 셀렉 페이지띄우기
    public ResponseEntity<?> selectOneFeedPost(@RequestParam(value = "userNo") int userNo,
                                               @RequestParam(value = "feedpostId") int feedpostId) {
        Map<String, Object> result = feedpostService.selectFeedDetail(feedpostId, userNo);

//			이 3개만 쓰면됨
//			data.put("feedPost", feedPost); // feedPost 내용
//			data.put("photoList", photoList); // 사진 리스트
//			data.put("hashTagList", hashTagList); //해시태그 리스트

        return ResponseEntity.ok().body(result);
    }


	@PutMapping(value = "updatefeed") // 피드 수정시 사용
	public ResponseEntity<?> updateFeedPost(
            @ModelAttribute("dto") FeedPostDTO dto,
            @RequestParam("hashTag") List<String> hashTag, HttpServletRequest request) throws Exception{

        System.out.println("피드id : " + dto.getFeedPostId()); // 받아올 필요 x
        System.out.println("유저넘버 : " + dto.getUserNo());
        System.out.println("내용 : " + dto.getBody());
        System.out.println("해시코드 : " + hashTag.get(0));

        // 피드 테이블 update
        int result = feedpostService.updateFeedPost(dto);

        // 해시태그 테이블 update
        if (hashTag.size() > 0) {
            feedpostService.updateHashTags(hashTag, dto.getFeedPostId());
        }
        return ResponseEntity.ok().body(true);
	}

    @DeleteMapping("/deleteFeedPost") // 피드 삭제
    public ResponseEntity<?> deleteFeedPost(@RequestParam int feedPostId) {
        feedpostService.deleteFeedPost(feedPostId);

        return ResponseEntity.ok().body(null);
    }

    @PostMapping(value = "insertFeedPost") // 피드 쓰기 - 피드를 작성 할 수 있는 페이지
    public ResponseEntity<?> insertFeedPost(
            @ModelAttribute FeedPostDTO dto,
            // 파일 데이터를 전송하는 겨웅 Header에 nultipart-form/data를 추가하여 보냅니다.
            // Axios로 보낼 때, FormData로 묶어서 Data:formData로 보냄
            // Post형식으로 dto를 묶어서 받을 경우 ModelAttribute를 사용합니다.
            @RequestParam List<String> hashTag, @RequestParam List<MultipartFile> files, HttpServletRequest request) throws Exception{
        System.out.println("dto" + dto);
        System.out.println("피드id : " + dto.getFeedPostId()); // 받아올 필요 x
        System.out.println("유저넘버 : " + dto.getUserNo());
        System.out.println("내용 : " + dto.getBody());
        System.out.println("작성일자 : " + dto.getWriteDate()); // 작성 필요 x
        System.out.println("최고온도 : " + dto.getWriteTemp());
        System.out.println("일교차 : " + dto.getWriteTempRange());
        System.out.println("강수상태 : " + dto.getWritePtyCode());
        System.out.println("하늘상태 : " + dto.getWriteSkyCode());
        System.out.println("해시코드 : " + hashTag.get(0));
        System.out.println("파일명 : " + files.get(0).getOriginalFilename());

        // 피드 테이블 insert
        // insert후 feedPostId가 update된 dto를 리턴 받습니다. (selectKey)
		FeedPostDTO feedPostDTO = feedpostService.insertFeedPost(dto);

        //해시태그 테이블 insert
        //해시 태그 리스트 for문 돌면서 insert? Hashtag insert => tagid return => postHash insert
        //해시 태그가 없는 경우 pass
        if (hashTag.size() > 0) {
            feedpostService.insertHashTags(hashTag, feedPostDTO.getFeedPostId());
        }

        //사진 테이블 insert
        // 사진이 없는 경우 pass
        if (files.size() > 0) { // 사진 저장
            String realPath = request.getServletContext().getRealPath("images");
            feedpostService.insertFeedPhoto(realPath, files, feedPostDTO.getFeedPostId());
        }
        return ResponseEntity.ok().body(true);
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
    public ResponseEntity<?> selectWeeklyFeed(@RequestParam(value = "currentTemp") int currentTemp,
                                              @RequestParam(value = "currentTempRange") int currentTempRange,
                                              @RequestParam(value = "cpage", required = false, defaultValue = "1") int cpage) {
        List<FeedPostAddDTO> data = feedpostService.selectWeeklyFeed(currentTemp, currentTempRange, cpage);
        return ResponseEntity.ok().body(data);
    }

    @GetMapping("/selectFeedDetail") // 피드 상세
    public ResponseEntity<?> selectFeedDetail(@RequestParam int feedPostId,
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

    @PostMapping("/insertFeedLike") // 피드 좋아요 입력 & 삭제 (팔로잉 팔로워 참조)
    public ResponseEntity<?> FeedLike(@RequestHeader(value = "authorization") String authorization,
                                      @RequestParam int feedPostId) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                boolean result = feedpostService.isFeedLike(userNo, feedPostId);
                if (!result) {
                    feedpostService.insertFeedLike(userNo, feedPostId);
                    return ResponseEntity.ok().body(null);
                } else {
                    feedpostService.deleteFeedLike(userNo, feedPostId);
                    return ResponseEntity.ok().body(null);
                }
            }
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @GetMapping("/likeCount")
    public ResponseEntity<?> getFeedLikeCount(@RequestParam(value = "feedPostId") int feedPostId) {
        return ResponseEntity.ok().body(feedpostService.selectFeedLike(feedPostId));
    }

    @GetMapping("/isLike") // 초기 마운트 시 피드의 좋아요 여부를 확인
    public ResponseEntity<?> getFeedIsLike(@RequestHeader(value = "authorization") String authorization,
                                           @RequestParam(value = "feedPostId") int feedPostId) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                return ResponseEntity.ok().body(feedpostService.isFeedLike(userNo, feedPostId));
            }
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @GetMapping("/isScrap") // 초기 마운트 시 피드의 스크랩 여부를 확인
    public ResponseEntity<?> getFeedIsScrap(@RequestHeader(value = "authorization") String authorization,
                                            @RequestParam(value = "feedPostId") int feedPostId) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                return ResponseEntity.ok().body(feedpostService.isFeedScrap(userNo, feedPostId));
            }
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @PostMapping("/insertFeedScrap") // 피드 스크랩 입력 & 삭제
    public ResponseEntity<?> insertFeedScrap(@RequestHeader(value = "authorization") String authorization, @RequestParam int feedPostId) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                boolean result = feedpostService.isFeedScrap(userNo, feedPostId);
                if (!result) {
                    feedpostService.insertFeedScrap(userNo, feedPostId);
                    return ResponseEntity.ok().body(null);
                } else {
                    feedpostService.deleteFeedScrap(userNo, feedPostId);
                    return ResponseEntity.ok().body(null);
                }
            }
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @PostMapping("comment")
    public ResponseEntity<?> insertComment(@RequestHeader(value = "authorization") String authorization,
                                           @RequestParam(value = "feedPostId") int feedPostId, @RequestParam(value = "body") String body) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                return ResponseEntity.ok().body(
                        feedpostService.insertComment(new FeedCommentDTO(0, userNo, feedPostId, 0, body, null, 0)));
            }
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @PostMapping("nestedComment")
    public ResponseEntity<?> insertNestedComment(@RequestHeader(value = "authorization") String authorization,
                                                 @RequestParam(value = "feedPostId") int feedPostId, @RequestParam(value = "parentId") int parentId,
                                                 @RequestParam(value = "body") String body, @RequestParam(value = "depth") int depth) {
        if (authorization.length() > 7) {
            String accessToken = authorization.substring("Bearer ".length(), authorization.length());
            if (jwtProvider.validateToken(accessToken)) {
                int userNo = jwtProvider.getLoginUserNo(accessToken);
                return ResponseEntity.ok().body(feedpostService
                        .insertNestedComment(new FeedCommentDTO(0, userNo, feedPostId, parentId, body, null, depth)));
            }
            ;
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @PutMapping("comment")
    public ResponseEntity<?> updateComment(@RequestHeader(value = "authorization") String authorization,
                                           @RequestParam(value = "feedCommentId") int commentId, @RequestParam(value = "body") String body) {
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
    public ResponseEntity<?> deleteComment(@RequestHeader(value = "authorization") String authorization,
                                           @RequestParam(value = "feedCommentId") int commentId) {
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
    public ResponseEntity<?> selectCommentDepth0(@RequestParam(value = "feedPostId") int feedPostId) {
        List<FeedCommentAddDTO> result = feedpostService.selectCommentByFeedPostIdAndDepth0(feedPostId);
        if (result.size() > 0) {
            return ResponseEntity.ok().body(result);
        }
        return ResponseEntity.badRequest().body("댓글이 없습니다.");
    }

    @GetMapping("comment/depthN")
    public ResponseEntity<?> selectCommentDepth(@RequestParam(value = "parentId") int parentId,
                                                @RequestParam(value = "depth") int depth) {
        List<FeedCommentAddDTO> result = feedpostService.selectCommentByParentIdAndDepth(parentId, depth);
        if (result.size() > 0) {
            return ResponseEntity.ok().body(result);
        }
        return ResponseEntity.badRequest().body("대댓글이 없습니다.");
    }

    @GetMapping("comment/like")
    public ResponseEntity<?> selectCommentLike(@RequestHeader(value = "authorization") String authorization,
                                               @RequestParam(value = "commentId") int commentId) {
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
    public ResponseEntity<?> insertCommentLike(@RequestHeader(value = "authorization") String authorization,
                                               @RequestParam(value = "commentId") int commentId) {
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
        }
        return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }

    @GetMapping("comment/likeCount")
    public ResponseEntity<?> selectCommentLikeCount(@RequestParam(value = "commentId") int commentId) {
        int likeCount = feedpostService.selectCommentLikeForCount(commentId);
        return ResponseEntity.ok().body(likeCount);
    }

    // 마이 피드 리스트 - 본인이 작성한 피드 리스트 출력, 다른 유저의 마이 피드 리스트 - 다른 유저의 피드 리스트만 출력 +
    // (마이픽 페이지 스크롤 적용)
    @GetMapping(value = "selectUserFeedPost")
    public ResponseEntity<?> selectUserFeedPost(@RequestParam(value = "userNo") int userNo,
                                                @RequestParam(value = "cpage", required = false, defaultValue = "1") int cpage) {
        List<FeedPostAddDTO> data = feedpostService.selectUserFeedPost(userNo, cpage);
        return ResponseEntity.ok().body(data);
    }

	// 인기순 정렬 피드 리스트
	@GetMapping("selectPopularFeedPost")
	public ResponseEntity<?> selectLikeFeedPost(@RequestParam(value = "cpage", required = false, defaultValue = "1") int cpage){
		List<FeedPostAddDTO> data = feedpostService.selectLikeFeedPost(cpage);
		return ResponseEntity.ok().body(data);
	}
	
	@GetMapping("selectFollowingFeedPost")
	public ResponseEntity<?> selectFollowingFeedPost(
			@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage
			){
		if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				int userNo = jwtProvider.getLoginUserNo(accessToken);
				List<FeedPostAddDTO> data = feedpostService.selectFollowingFeedPost(userNo, cpage);
				return ResponseEntity.ok().body(data);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
	}
    
	
	@GetMapping("selectScrapFeedPost")
	public ResponseEntity<?> selectScrapFeedPost(
			@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage
			){
		if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				int userNo = jwtProvider.getLoginUserNo(accessToken);
				List<FeedPostAddDTO> data = feedpostService.selectScrapFeedPost(userNo, cpage);
				return ResponseEntity.ok().body(data);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
	}

	@GetMapping("selectOneFeedPost")
	public ResponseEntity<?> selectOneFeedPost(
			@RequestParam(value="feedpostId") int feedpostId
			){
		FeedPostAddDTO data = feedpostService.selectOneFeedPost(feedpostId);
		return ResponseEntity.ok().body(data);
	}
	
	@GetMapping("/getNaviInfo")
	public ResponseEntity<?> getNaviInfo(
			@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage
			){
		if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				Map<String, Object> data = feedpostService.selectPageNavi(cpage);
				return ResponseEntity.ok().body(data);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
	}
	
	@GetMapping("/getNaviInfo/userNo")
	public ResponseEntity<?> getUserNoNaviInfo(
			@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage,
			@RequestParam(value="userNo") int userNo
			){
		if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				Map<String, Object> data = feedpostService.selectPageNavi(cpage, userNo);
				return ResponseEntity.ok().body(data);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
	}
}
