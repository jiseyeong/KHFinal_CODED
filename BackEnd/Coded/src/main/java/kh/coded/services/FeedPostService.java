package kh.coded.services;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kh.coded.dto.FeedCommentAddDTO;
import kh.coded.dto.FeedCommentDTO;
import kh.coded.dto.FeedCommentLikeDTO;
import kh.coded.dto.FeedPostAddDTO;
import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.MemberDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.dto.PostHashsWithHashTagDTO;
import kh.coded.repositories.FeedCommentDAO;
import kh.coded.repositories.FeedCommentLikeDAO;
import kh.coded.repositories.FeedLikeDAO;
import kh.coded.repositories.FeedPostDAO;
import kh.coded.repositories.FeedScrapDAO;
import kh.coded.repositories.MemberDAO;
import kh.coded.repositories.PhotoDAO;
import kh.coded.repositories.PostHashsDAO;
import utils.StaticValue;

@Service
public class FeedPostService {

	@Autowired
	private FeedPostDAO feedpostDAO;

	@Autowired
	private PostHashsDAO postHashsDAO;

	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private MemberService memberService;

	@Autowired
	private PhotoDAO photoDAO;

	@Autowired
	private FeedCommentDAO commentDAO;
	@Autowired
	private FeedCommentLikeDAO commentLikeDAO;

	@Autowired
	private FeedLikeDAO feedLikeDAO;

	@Autowired
	private FeedScrapDAO feedScrapDAO;

	// insert feedpost start
	public FeedPostDTO insertFeedPost(FeedPostDTO dto) {
		return feedpostDAO.insertFeedPost(dto);
	}

	public int insertPostHashs(int FeedPost, int TagId) {
		return feedpostDAO.insertPostHashs(FeedPost, TagId);
	}

	public int insertHashTag(HashTagDTO dto) {
		return feedpostDAO.insertHashTag(dto);
	}

	public int HashTagJB(HashTagDTO dto) {
		return feedpostDAO.HashTagJB(dto);
	}

	public void insertFeedPhoto(String realPath, List<MultipartFile> files, int feedPostId) throws IOException {
		File realPathFile = new File(realPath);
		if (!realPathFile.exists()) {
			realPathFile.mkdir();
		}
		if (files != null) {
			for (MultipartFile file : files) {
				if (file.isEmpty())
					continue;
				String oriName = file.getOriginalFilename();
				String sysName = UUID.randomUUID() + oriName;
				file.transferTo(new File(realPath + "/" + sysName));
				if (feedPostId != 0)
					feedpostDAO.insertFeedPhoto(new PhotoDTO(0, oriName, sysName, feedPostId, 0, 0));
			}
		}
	}
	// insert feedpost end

	// update feedpost start
	public int updateFeedPost(FeedPostDTO FeedPost) {
		return feedpostDAO.updateFeedPost(FeedPost);
	}

	public int updatePostHashs(int FeedPost, int TagId) {
		return feedpostDAO.updatePostHashs(FeedPost, TagId);
	}

	public void updateFeedPhoto(String realPath, List<MultipartFile> files, int feedPostId) throws IOException {
		File realPathFile = new File(realPath);
		if (!realPathFile.exists()) {
			realPathFile.mkdir();
		}
		if (files != null) {
			for (MultipartFile file : files) {
				if (file.isEmpty())
					continue;
				String oriName = file.getOriginalFilename();
				String sysName = UUID.randomUUID() + oriName;
				file.transferTo(new File(realPath + "/" + sysName));
				if (feedPostId != 0)
					feedpostDAO.updateFeedPhoto(new PhotoDTO(0, oriName, sysName, feedPostId, 0, 0));
			}
		}
	}


	// public TodayWeatherDTO select(int WeatherCode) {
	//		return feedpostDAO.selectTodayWeather(WeatherCode);
	//	}
	//	
	//	public int insertWeatherCode(int WeatherCode) {
	//		return feedpostDAO.insertWeatherCode(WeatherCode);
	//	}


	public List<FeedPostDTO> selectFeedList(int UserNo) {
		return feedpostDAO.selectFeedList(UserNo);
	}

	public List<FeedPostDTO> selectTestFeedList() {
		return feedpostDAO.selectTestFeedList();
	}

	public List<PostHashsWithHashTagDTO> selectHashTagList(int feedPostId) {
		return postHashsDAO.selectAllTagIdByFeedPostId(feedPostId);
	}

	//    // 고도화 작업 요구
	//    public Map<String, Object> selectAllFeedPost(int cpage,int userNo) {
	//        // 피드 리스트 출력
	//        // 출력 내용 : 피드 리스트, 피드 썸네일, 피드 해시태그, 유저 리스트(닉네임), 유저 프로필 사진,
	//        int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
	//        int endFeedNum = cpage * feedCountPerPage;
	//        int startFeedNum = endFeedNum - (feedCountPerPage - 1);
	//
	//        List<FeedPostDTO> feedPostList = feedpostDAO.selectAllFeedPost(startFeedNum, endFeedNum);
	//        List<MemberDTO> memberList = new ArrayList<>();
	//        List<PhotoDTO> userProfileList = new ArrayList<>();
	//        List<PhotoDTO> thumbNailList = new ArrayList<>();
	//        List<List<PostHashsWithHashTagDTO>> hashTagLists = new ArrayList<>();
	//        List<Integer> feedLikeList = new ArrayList<>(); //좋아요 갯수
	//        List<Boolean> isFeedLikeList = new ArrayList<>();//좋아요 여부 
	//
	//        for (FeedPostDTO feedPost : feedPostList) {
	//            PhotoDTO thumbNail = photoDAO.selectThumbNailByFeedPostId(feedPost.getFeedPostId());
	//            MemberDTO userInfo = memberDAO.selectMemberByUserNo(feedPost.getUserNo());
	//            userInfo.setPw("");
	//            PhotoDTO userProfile = photoDAO.selectByUserNo(feedPost.getUserNo());
	//            List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPost.getFeedPostId());
	//            int feedLike = feedLikeDAO.selectFeedLike(feedPost.getFeedPostId());
	//            boolean isFeedLike = feedLikeDAO.isFeedLike(userNo,feedPost.getFeedPostId());
	//            thumbNailList.add(thumbNail);
	//            memberList.add(userInfo);
	//            userProfileList.add(userProfile);
	//            hashTagLists.add(hashTagList);
	//            feedLikeList.add(feedLike);
	//            isFeedLikeList.add(isFeedLike);
	//        }
	//
	//        Map<String, Object> map = new HashMap<>();
	//        map.put("feedPostList",feedPostList);
	//        map.put("thumbNailList",thumbNailList);
	//        map.put("memberList",memberList);
	//        map.put("userProfileList",userProfileList);
	//        map.put("hashTagLists",hashTagLists);
	//        map.put("feedLikeList", feedLikeList);
	//        map.put("isFeedLikeList", isFeedLikeList);
	//        
	//        return map;
	//    }

	public List<FeedPostAddDTO> selectAllFeedPost(int cpage) {
		int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		int endFeedNum = cpage * feedCountPerPage;
		int startFeedNum = endFeedNum - (feedCountPerPage - 1);

		return feedpostDAO.selectAllFeedPost(startFeedNum, endFeedNum);
	}

	public Map<String, Object> selectFeedDetail(int feedPostId, int userNo) {
		// 피드 상세페이지 출력
		// 출력내용 -> 글 정보, 사진, 작성자 정보, 작성자 프로필 사진, 해시태그, 좋아요 갯수,
		FeedPostDTO feedPost = feedpostDAO.searchByFeedPost(feedPostId); // 글 정보
		List<PhotoDTO> photoList = photoDAO.selectByFeedpostId(feedPostId); // 사진
		MemberDTO writeMember = memberDAO.selectMemberByUserNo(feedPost.getUserNo()); // 작성자 정보
		writeMember.setPw("");
		List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPostId); // 해시태그들
		PhotoDTO userProfile = photoDAO.selectByUserNo(feedPost.getUserNo()); // 유저 프로필
		int feedLikeCount = feedLikeDAO.selectFeedLike(feedPostId); // 좋아요 갯수
		boolean isFeedLike = feedLikeDAO.isFeedLike(userNo, feedPostId);

		Map<String, Object> data = new HashMap<>();
		data.put("feedPost", feedPost);
		data.put("photoList", photoList);
		data.put("writeMember", writeMember);
		data.put("hashTagList", hashTagList);
		data.put("userProfile", userProfile);
		data.put("feedLikeCount", feedLikeCount);
		data.put("isFeedLike", isFeedLike);

		return data;
	}

	public FeedPostDTO selectByUserNo(int userNo) {
		return feedpostDAO.selectByUserNo(userNo);
	}

	public List<FeedPostAddDTO> selectWeeklyFeed(int currentTemp, int currentTempRange, int cpage) {
		int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		int endFeedNum = cpage * feedCountPerPage;
		int startFeedNum = endFeedNum - (feedCountPerPage - 1);

		return feedpostDAO.selectWeeklyFeed(currentTemp, currentTempRange, startFeedNum, endFeedNum);

	}

	public List<FeedPostAddDTO> selectSearchFeedListByHashs(int cpage, String keyword) {
		// 피드 리스트 출력
		// 출력 내용 : 피드 리스트, 피드 썸네일, 피드 해시태그, 유저 리스트(닉네임), 유저 프로필 사진,
		int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		int endFeedNum = cpage * feedCountPerPage;
		int startFeedNum = endFeedNum - (feedCountPerPage - 1);
		return feedpostDAO.selectSearchFeedListByHashs(startFeedNum, endFeedNum, keyword);
	}


	public int deleteFeedPost(int feedPostId) {
		return feedpostDAO.deleteFeedPost(feedPostId);
	}
	public int insertComment(FeedCommentDTO dto) {
		return commentDAO.insert(dto);
	}
	public int insertNestedComment(FeedCommentDTO dto) {
		return commentDAO.insertNestedComment(dto);
	}
	public void updateComment(int feedCommentId, String body) {
		commentDAO.update(feedCommentId, body);
	}
	public void deleteComment(int feedCommentId) {
		commentDAO.delete(feedCommentId);
	}
	public List<FeedCommentAddDTO> selectCommentByFeedPostIdAndDepth0(int feedPostId){
		return commentDAO.selectByFeedPostDepth0(feedPostId);
	}
	public List<FeedCommentAddDTO> selectCommentByParentIdAndDepth(int parentId, int depth){
		return commentDAO.selectByParentIdAndDepth(parentId, depth);
	}
	public boolean selectCommentLikeForChecked(int userNo, int commentId) {
		return commentLikeDAO.selectForChecked(userNo, commentId) != null;
	}
	public int selectCommentLikeForCount(int commentId) {
		return commentLikeDAO.selectForCount(commentId).size();
	}
	public void insertCommentLike(int userNo, int commentId) {
		FeedCommentLikeDTO dto = new FeedCommentLikeDTO(0, userNo, commentId);
		commentLikeDAO.insert(dto);
	}
	public void deleteCommentLike(int userNo, int commentId) {
		commentLikeDAO.delete(userNo, commentId);
	}

	public int insertFeedLike(int userNo,int feedPostId) {
		return feedLikeDAO.insertFeedLike(userNo, feedPostId);
	}

	public int deleteFeedLike(int userNo,int feedPostId) {
		return feedLikeDAO.deleteFeedLike(userNo, feedPostId);
	}

	public int selectFeedLike(int feedpostId) {
		return feedLikeDAO.selectFeedLike(feedpostId);
	}

	public boolean isFeedLike(int userNo, int feedPostId) {
		return feedLikeDAO.isFeedLike(userNo, feedPostId);
	}

	public int insertFeedScrap(int userNo,int feedPostId) {
		return feedScrapDAO.insertFeedScrap(userNo, feedPostId);
	}

	public int deleteFeedScrap(int userNo,int feedPostId) {
		return feedScrapDAO.deleteFeedScrap(userNo, feedPostId);
	}

	public boolean isFeedScrap(int userNo, int feedPostId) {
		return feedScrapDAO.isFeedScrap(userNo, feedPostId);
	}

	public List<FeedPostAddDTO> selectUserFeedPost(int userNo, int cpage) {
		int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		int endFeedNum = cpage * feedCountPerPage;
		int startFeedNum = endFeedNum - (feedCountPerPage - 1);

		return feedpostDAO.selectUserFeedPost(userNo, startFeedNum, endFeedNum);
	}

	public List<FeedPostAddDTO> selectLikeFeedPost(int cpage) {
		int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		int endFeedNum = cpage * feedCountPerPage;
		int startFeedNum = endFeedNum - (feedCountPerPage - 1);

		return feedpostDAO.selectLikeFeedPost(startFeedNum, endFeedNum);
	}

	public List<FeedPostAddDTO> selectFollowingFeedPost(int userNo, int cpage){
		int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		int endFeedNum = cpage * feedCountPerPage;
		int startFeedNum = endFeedNum - (feedCountPerPage - 1);

		return feedpostDAO.selectFollowingFeedPost(userNo, startFeedNum, endFeedNum);
	}

	public List<FeedPostAddDTO> selectScrapFeedPost(int userNo, int cpage){
		int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		int endFeedNum = cpage * feedCountPerPage;
		int startFeedNum = endFeedNum - (feedCountPerPage - 1);

		return feedpostDAO.selectScrapFeedPost(userNo, startFeedNum, endFeedNum);
	}

	public FeedPostAddDTO selectOneFeedPost(int feedpostId) {
		return feedpostDAO.selectOneFeedPost(feedpostId);
	}

	public Map<String, Object> selectPageNavi(int cpage){
		//1. 전체 글의 개수
		int recordTotalCount = feedpostDAO.getRecordCount();
		//2. 페이지당 보여줄 글의 개수
		int recordCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		//3. 페이지당 보여줄 네비게이터의 수
		int naviCountPerPage = StaticValue.NAVICOUNTPERPAGE;

		//4. 1번과 2번 항목에 의해 총 페이지의 개수가 정해짐.
		//전체 글의 개수를 페이지당 
		int pageTotalCount = recordTotalCount%recordCountPerPage > 0 ?
				recordTotalCount/recordCountPerPage + 1
				:recordTotalCount/recordCountPerPage;

		if(cpage < 1) {
			cpage = 1;
		}else if(cpage > pageTotalCount) {
			cpage = pageTotalCount;
		}

		int startNavi = (cpage-1)/naviCountPerPage*naviCountPerPage+1;
		int endNavi = startNavi + (naviCountPerPage-1);

		if(endNavi > pageTotalCount) {
			endNavi = pageTotalCount;
		}

		boolean needPrev = true;
		boolean needNext = true;
		ArrayList<Integer> list = new ArrayList<>();

		if(startNavi == 1) {needPrev = false;}
		if(endNavi == pageTotalCount) {needNext = false;}
		for(int i = startNavi; i <= endNavi; i++) {
			list.add(i);
		}

		Map<String, Object> data = new HashMap<>();
		data.put("naviList", list);
		data.put("needPrev", needPrev);
		data.put("needNext", needNext);

		return data;
	}
	
	public Map<String, Object> selectPageNavi(int cpage, int userNo){
		//1. 전체 글의 개수
		int recordTotalCount = feedpostDAO.getRecordCount(userNo);
		//2. 페이지당 보여줄 글의 개수
		int recordCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		//3. 페이지당 보여줄 네비게이터의 수
		int naviCountPerPage = StaticValue.NAVICOUNTPERPAGE;

		//4. 1번과 2번 항목에 의해 총 페이지의 개수가 정해짐.
		//전체 글의 개수를 페이지당 
		int pageTotalCount = recordTotalCount%recordCountPerPage > 0 ?
				recordTotalCount/recordCountPerPage + 1
				:recordTotalCount/recordCountPerPage;

		if(cpage < 1) {
			cpage = 1;
		}else if(cpage > pageTotalCount) {
			cpage = pageTotalCount;
		}

		int startNavi = (cpage-1)/naviCountPerPage*naviCountPerPage+1;
		int endNavi = startNavi + (naviCountPerPage-1);

		if(endNavi > pageTotalCount) {
			endNavi = pageTotalCount;
		}

		boolean needPrev = true;
		boolean needNext = true;
		ArrayList<Integer> list = new ArrayList<>();

		if(startNavi == 1) {needPrev = false;}
		if(endNavi == pageTotalCount) {needNext = false;}
		for(int i = startNavi; i <= endNavi; i++) {
			list.add(i);
		}

		Map<String, Object> data = new HashMap<>();
		data.put("naviList", list);
		data.put("needPrev", needPrev);
		data.put("needNext", needNext);

		return data;
	}
}
