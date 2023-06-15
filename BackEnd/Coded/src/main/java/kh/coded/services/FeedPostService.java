package kh.coded.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.coded.dto.*;
import kh.coded.repositories.MemberDAO;
import kh.coded.repositories.PostHashsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.repositories.FeedPostDAO;
import kh.coded.repositories.PhotoDAO;
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
    private PhotoDAO photoDAO;


    public List<FeedPostDTO> selectFeedList(int UserNo) {
        return feedpostDAO.selectFeedList(UserNo);
    }

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

    public List<FeedPostDTO> selectTestFeedList() {
        return feedpostDAO.selectTestFeedList();
    }

    public List<HashTagDTO> searchByHashs(String HashTag) {
        return feedpostDAO.searchByHashs(HashTag);
    }


	public PhotoDTO selectByFeedpostId(int feedPostId) {
		return photoDAO.selectByFeedpostId(feedPostId);
	}

	public List<FeedPostDTO> selectFeedlike() {
		return feedpostDAO.selectFeedlike();
	}

	
	

    public List<PostHashsDTO> searchByPostHashs(int tagId) {
        return feedpostDAO.searchByPostHashs(tagId);
    }

    public FeedPostDTO searchByFeedPost(int feedPostId) {
        return feedpostDAO.searchByFeedPost(feedPostId);
    }

    public Map<String, Object> selectAllFeedPost(int cpage) {
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

        for (FeedPostDTO feedPost : feedPostList) {
            PhotoDTO thumbNail = photoDAO.selectByFeedpostId(feedPost.getFeedPostId());
            MemberDTO userInfo = memberDAO.selectMemberByUserNo(feedPost.getUserNo());
            PhotoDTO userProfile = photoDAO.selectByUserNo(feedPost.getUserNo());
            List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPost.getFeedPostId());
            thumbNailList.add(thumbNail);
            memberList.add(userInfo);
            userProfileList.add(userProfile);
            hashTagLists.add(hashTagList);
        }
        Map<String, Object> map = new HashMap<>();
        map.put("feedPostList",feedPostList);
        map.put("thumbNailList",thumbNailList);
        map.put("memberList",memberList);
        map.put("userProfileList",userProfileList);
        map.put("hashTagLists",hashTagLists);
        return map;
    }

    public FeedPostDTO selectByUserNo(int userNo) {
        return feedpostDAO.selectByUserNo(userNo);
    }

    public List<FeedPostDTO> selectFeedNew() {
        return feedpostDAO.selectFeedNew();
    }

    public PhotoDTO selectByFeedpostId(int feedPostId) {
        return photoDAO.selectByFeedpostId(feedPostId);
    }

}
