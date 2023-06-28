package kh.coded.controllers;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kh.coded.dto.FeedCommentAddDTO;
import kh.coded.dto.FeedCommentDTO;
import kh.coded.dto.FeedPostAddDTO;
import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.repositories.FeedPostDAO;
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
	private JwtProvider jwtProvider;

	@GetMapping(value = "feedpost") // 마이 피드 리스트 - 본인이 작성한 피드 리스트 출력, 다른 유저의 마이 피드 리스트 - 다른 유저의 피드 리스트만 출력
	public ResponseEntity<?> selectNoScrollFeedList(@RequestParam(value = "userNo") int UserNo) {
		try {
			List<FeedPostDTO> list = feedpostService.selectFeedList(UserNo);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping(value = "updatefeed") // 피드 수정하기 전 셀렉 페이지띄우기
	public ResponseEntity<?> selectOneFeedPost(@RequestParam(value = "userNo") int userNo,
			@RequestParam(value = "feedpostId") int feedpostId) {
		try {
			Map<String, Object> result = feedpostService.selectFeedDetail(feedpostId, userNo);

//			이 3개만 쓰면됨
//			data.put("feedPost", feedPost); // feedPost 내용
//			data.put("photoList", photoList); // 사진 리스트
//			data.put("hashTagList", hashTagList); //해시태그 리스트

			return ResponseEntity.ok().body(result);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PutMapping(value = "updatefeed") // 피드 수정
	public ResponseEntity<?> updateFeedPost(
			@RequestParam int feedpostId, @RequestParam String body,
			@RequestParam List<String> HashTag, @RequestParam List<MultipartFile> files, 
			HttpServletRequest request) {
		try {
			String realPath = request.getServletContext().getRealPath("images");
			feedpostService.updateFeedPost(new FeedPostDTO(feedpostId, 0, body, null, 0, 0, 0, 1));
			if (HashTag.size() > 0) {
				for (String index : HashTag) {
					int TagId = 0;
					if (feedpostService.HashTagJB(new HashTagDTO(0, index))!=0) { //해시태그 중복 체크
						TagId = feedpostService.HashTagJB(new HashTagDTO(0, index));
					} else {
						TagId = feedpostService.insertHashTag(new HashTagDTO(0, index));
					} // 해시 태그 넣기
					feedpostService.updatePostHashs(feedpostId, TagId);// PostHashs에 저장
				}
			}
			if (files.size() > 0) {
				feedpostService.updateFeedPhoto(realPath, files, feedpostId);
			}
			return ResponseEntity.ok().body(null);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@DeleteMapping("/deleteFeedPost") // 피드 삭제
	public ResponseEntity<?> deleteFeedPost(@RequestParam int feedPostId) {
		feedpostService.deleteFeedPost(feedPostId);

		return ResponseEntity.ok().body(null);
	}

	@PostMapping(value = "feedpost") // 피드 쓰기 - 피드를 작성 할 수 있는 페이지
	// 데이터는 다 넘어옴 근데 디비에 안들어감
	public ResponseEntity<?> insertFeedPost(
//			@RequestParam int userNo, @RequestParam String body, @RequestParam String writeDate,
			@ModelAttribute FeedPostDTO dto,
			@RequestParam List<String> HashTag, @RequestParam List<MultipartFile> files, HttpServletRequest request) {
		try {
			System.out.println("dto"+dto);
			System.out.println("피드id : "+dto.getFeedPostId());
			System.out.println("유저넘버 : "+dto.getUserNo());
			System.out.println("내용 : "+dto.getBody());
			System.out.println("작성일자 : "+dto.getWriteDate());
			System.out.println("기온 : "+dto.getWriteTemp());
			System.out.println("기온2 : "+dto.getWriteTempRange());
			System.out.println("강우? : "+dto.getWritePtyCode());
			System.out.println("스카이코드 : "+dto.getWrtieSkyCode());
			System.out.println("해시코드 : " + HashTag.get(0));
			System.out.println("파일명 : "+files.get(0).getOriginalFilename());

			String realPath = request.getServletContext().getRealPath("images");
//			int feedpostId = feedpostService.insertFeedPost(new FeedPostDTO(0, userNo, body, null, 0, 0));
			if (HashTag.size() > 0) {
				for (String index : HashTag) {
					int TagId = 0;
					if (feedpostService.HashTagJB(new HashTagDTO(0, index))!=0) { //해시태그 중복 체크
						TagId = feedpostService.HashTagJB(new HashTagDTO(0, index));
					} else {
						TagId = feedpostService.insertHashTag(new HashTagDTO(0, index));
					} // 해시 태그 넣기
//					feedpostService.insertPostHashs(feedpostId, TagId);// PostHashs에 저장
				}
			}
			if (files.size() > 0) { // 사진 저장
//				feedpostService.insertFeedPhoto(realPath, files, feedpostId);
			}
			return ResponseEntity.ok().body(null);
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
		try {
			System.out.println("chekced");
			List<FeedPostAddDTO> data = feedpostService.selectUserFeedPost(userNo, cpage);
			return ResponseEntity.ok().body(data);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
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

}
