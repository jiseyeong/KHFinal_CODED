package kh.coded.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedCommentAddDTO;
import kh.coded.dto.FeedCommentDTO;
import kh.coded.dto.FeedCommentLikeDTO;
import kh.coded.dto.FeedPostAddDTO;
import kh.coded.dto.FeedPostDTO;
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

    
    public int insertTest(FeedPostDTO dto) {
        return feedpostDAO.insertFeedPost(dto);
    }

    public int insertFeedPost(FeedPostDTO dto) {
        return feedpostDAO.insertFeedPost(dto);
    }

    public int insertFeedPhoto(PhotoDTO dto) {
        return feedpostDAO.insertFeedPhoto(dto);
    }

    //	public TodayWeatherDTO select(int WeatherCode) {
//		return feedpostDAO.selectTodayWeather(WeatherCode);
//	}
//	
//	public int insertWeatherCode(int WeatherCode) {
//		return feedpostDAO.insertWeatherCode(WeatherCode);
//	}
    public int insertPostHashs(int FeedPost, int TagId) {
        return feedpostDAO.insertPostHashs(FeedPost, TagId);
    }

    public int insertHashTag(String HashTag) {
        return feedpostDAO.insertHashTag(HashTag);
    }

    public List<FeedPostDTO> selectFeedList(int UserNo) {
        return feedpostDAO.selectFeedList(UserNo);
    }
    
    public List<FeedPostDTO> selectTestFeedList() {
        return feedpostDAO.selectTestFeedList();
    }

    
    // 고도화 작업 요구
    public Map<String, Object> selectAllFeedPost(int cpage,int userNo) {
        // 피드 리스트 출력
        // 출력 내용 : 피드 리스트, 피드 썸네일, 피드 해시태그, 유저 리스트(닉네임), 유저 프로필 사진,
        int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        int endFeedNum = cpage * feedCountPerPage;
        int startFeedNum = endFeedNum - (feedCountPerPage - 1);

        List<FeedPostDTO> feedPostList = feedpostDAO.selectAllFeedPost(startFeedNum, endFeedNum);
        List<MemberDTO> memberList = new ArrayList<>();
        List<PhotoDTO> userProfileList = new ArrayList<>();
        List<PhotoDTO> thumbNailList = new ArrayList<>();
        List<List<PostHashsWithHashTagDTO>> hashTagLists = new ArrayList<>();
        List<Integer> feedLikeList = new ArrayList<>(); //좋아요 갯수
        List<Boolean> isFeedLikeList = new ArrayList<>();//좋아요 여부 

        for (FeedPostDTO feedPost : feedPostList) {
            PhotoDTO thumbNail = photoDAO.selectThumbNailByFeedPostId(feedPost.getFeedPostId());
            MemberDTO userInfo = memberDAO.selectMemberByUserNo(feedPost.getUserNo());
            userInfo.setPw("");
            PhotoDTO userProfile = photoDAO.selectByUserNo(feedPost.getUserNo());
            List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPost.getFeedPostId());
            int feedLike = feedLikeDAO.selectFeedLike(feedPost.getFeedPostId());
            boolean isFeedLike = feedLikeDAO.isFeedLike(userNo,feedPost.getFeedPostId());
            thumbNailList.add(thumbNail);
            memberList.add(userInfo);
            userProfileList.add(userProfile);
            hashTagLists.add(hashTagList);
            feedLikeList.add(feedLike);
            isFeedLikeList.add(isFeedLike);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("feedPostList",feedPostList);
        map.put("thumbNailList",thumbNailList);
        map.put("memberList",memberList);
        map.put("userProfileList",userProfileList);
        map.put("hashTagLists",hashTagLists);
        map.put("feedLikeList", feedLikeList);
        map.put("isFeedLikeList", isFeedLikeList);
        
        return map;
    }
    
    public List<FeedPostAddDTO> selectAllFeedPost2(int cpage){
        int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        int endFeedNum = cpage * feedCountPerPage;
        int startFeedNum = endFeedNum - (feedCountPerPage - 1);
        return feedpostDAO.selectAllFeedPost2(startFeedNum, endFeedNum);
    }
    
    public Map<String, Object> selectFeedDetail(int feedPostId,int userNo) { 
    	// 피드 상세페이지 출력
    	//출력내용 -> 글 정보, 사진, 작성자 정보, 작성자 프로필 사진, 해시태그, 좋아요 갯수, 
		FeedPostDTO feedPost = feedpostDAO.searchByFeedPost(feedPostId); // 글 정보
		List<PhotoDTO> photoList = photoDAO.selectByFeedpostId(feedPostId); // 사진
		MemberDTO writeMember = memberDAO.selectMemberByUserNo(feedPost.getUserNo()); // 작성자 정보
		writeMember.setPw("");
		List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPostId); // 해시태그들
		PhotoDTO userProfile = photoDAO.selectByUserNo(feedPost.getUserNo()); // 유저 프로필
		int feedLikeCount = feedLikeDAO.selectFeedLike(feedPostId); // 좋아요 갯수
		boolean isFeedLike = feedLikeDAO.isFeedLike(userNo, feedPostId);
				
		Map<String,Object> data = new HashMap<>();
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

    public Map<String, Object> selectWeeklyFeed(int currentTemp, int currentTempRange, int cpage){
    	int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
    	int endFeedNum = cpage * feedCountPerPage;
    	int startFeedNum = endFeedNum - (feedCountPerPage - 1);
    	
    	List<FeedPostDTO> feedPostList = feedpostDAO.selectWeeklyFeed(currentTemp, currentTempRange, startFeedNum, endFeedNum);
    	List<MemberDTO> memberList = new ArrayList<>();
    	List<PhotoDTO> userProfileList = new ArrayList<>();
    	List<PhotoDTO> thumbnailList = new ArrayList<>();
    	List<List<PostHashsWithHashTagDTO>> hashTagLists = new ArrayList<>();
    	List<Integer> feedLikeList = new ArrayList<>();
 
    	for (FeedPostDTO feedPost : feedPostList) {
    		PhotoDTO thumbnail = photoDAO.selectThumbNailByFeedPostId(feedPost.getFeedPostId());
    		MemberDTO userInfo = memberDAO.selectMemberByUserNo(feedPost.getUserNo());
    		userInfo.setPw("");
    		PhotoDTO userProfile = photoDAO.selectByUserNo(feedPost.getUserNo());
    		int feedLike = feedLikeDAO.selectFeedLike(feedPost.getFeedPostId());
    		List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPost.getFeedPostId());
    		thumbnailList.add(thumbnail);
    		memberList.add(userInfo);
    		userProfileList.add(userProfile);
    		hashTagLists.add(hashTagList);
    		feedLikeList.add(feedLike);
    	}
    	
    
    	Map<String, Object> data = new HashMap<>();
    	data.put("feedPostList", feedPostList);
    	data.put("thumbNailList", thumbnailList);
    	data.put("memberList", memberList);
    	data.put("userProfileList", userProfileList);
    	data.put("hashTagLists", hashTagLists);
    	data.put("feedLikeList", feedLikeList);
    	return data;
    }

    public Map<String, Object> selectSearchFeedListByHashs(int cpage, int userNo, String keyword) {
        // 피드 리스트 출력
        // 출력 내용 : 피드 리스트, 피드 썸네일, 피드 해시태그, 유저 리스트(닉네임), 유저 프로필 사진,
        int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        int endFeedNum = cpage * feedCountPerPage;
        int startFeedNum = endFeedNum - (feedCountPerPage - 1);
        List<FeedPostDTO> feedPostList = feedpostDAO.selectSearchFeedListByHashs(startFeedNum, endFeedNum, keyword);
        List<MemberDTO> memberList = new ArrayList<>();
        List<PhotoDTO> userProfileList = new ArrayList<>();
        List<PhotoDTO> thumbNailList = new ArrayList<>();
        List<List<PostHashsWithHashTagDTO>> hashTagLists = new ArrayList<>();
        List<Integer> feedLikeList = new ArrayList<>();
        List<Boolean> isFeedLikeList = new ArrayList<>();

        for (FeedPostDTO feedPost : feedPostList) {
            PhotoDTO thumbNail = photoDAO.selectThumbNailByFeedPostId(feedPost.getFeedPostId());
            MemberDTO userInfo = memberDAO.selectMemberByUserNo(feedPost.getUserNo());
            userInfo.setPw("");
            PhotoDTO userProfile = photoDAO.selectByUserNo(feedPost.getUserNo());
            List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPost.getFeedPostId());
            int feedLike = feedLikeDAO.selectFeedLike(feedPost.getFeedPostId());
            boolean isFeedLike = feedLikeDAO.isFeedLike(userNo,feedPost.getFeedPostId());
            thumbNailList.add(thumbNail);
            memberList.add(userInfo);
            userProfileList.add(userProfile);
            hashTagLists.add(hashTagList);
            feedLikeList.add(feedLike);
            isFeedLikeList.add(isFeedLike);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("feedPostList",feedPostList);
        map.put("thumbNailList",thumbNailList);
        map.put("memberList",memberList);
        map.put("userProfileList",userProfileList);
        map.put("hashTagLists",hashTagLists);
        map.put("feedLikeList", feedLikeList);
        map.put("isFeedLikeList", isFeedLikeList);
        return map;
    }
    
    public int updateFeedPost(int feedPostId,String body) {
    	return feedpostDAO.updateFeedPost(feedPostId, body);
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

	
    public Map<String, Object> selectLikeFeedPost(int cpage,int userNo) {
        // 피드 리스트 출력
        // 출력 내용 : 피드 리스트, 피드 썸네일, 피드 해시태그, 유저 리스트(닉네임), 유저 프로필 사진,
        int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        int endFeedNum = cpage * feedCountPerPage;
        int startFeedNum = endFeedNum - (feedCountPerPage - 1);

        List<FeedPostDTO> feedPostList = feedpostDAO.selectLikeFeedPost(startFeedNum, endFeedNum);
        List<MemberDTO> memberList = new ArrayList<>();
        List<PhotoDTO> userProfileList = new ArrayList<>();
        List<PhotoDTO> thumbNailList = new ArrayList<>();
        List<List<PostHashsWithHashTagDTO>> hashTagLists = new ArrayList<>();
        List<Integer> feedLikeList = new ArrayList<>(); //좋아요 갯수
        List<Boolean> isFeedLikeList = new ArrayList<>();//좋아요 여부 

        for (FeedPostDTO feedPost : feedPostList) {
            PhotoDTO thumbNail = photoDAO.selectThumbNailByFeedPostId(feedPost.getFeedPostId());
            MemberDTO userInfo = memberDAO.selectMemberByUserNo(feedPost.getUserNo());
            userInfo.setPw("");
            PhotoDTO userProfile = photoDAO.selectByUserNo(feedPost.getUserNo());
            List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPost.getFeedPostId());
            int feedLike = feedLikeDAO.selectFeedLike(feedPost.getFeedPostId());
            boolean isFeedLike = feedLikeDAO.isFeedLike(userNo,feedPost.getFeedPostId());
            thumbNailList.add(thumbNail);
            memberList.add(userInfo);
            userProfileList.add(userProfile);
            hashTagLists.add(hashTagList);
            feedLikeList.add(feedLike);
            isFeedLikeList.add(isFeedLike);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("feedPostList",feedPostList);
        map.put("thumbNailList",thumbNailList);
        map.put("memberList",memberList);
        map.put("userProfileList",userProfileList);
        map.put("hashTagLists",hashTagLists);
        map.put("feedLikeList", feedLikeList);
        map.put("isFeedLikeList", isFeedLikeList);
        
        return map;
    }
    
    
    
    
    
}
