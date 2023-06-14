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

    public List<PostHashsDTO> searchByPostHashs(int tagId) {
        return feedpostDAO.searchByPostHashs(tagId);
    }

    public FeedPostDTO searchByFeedPost(int feedPostId) {
        return feedpostDAO.searchByFeedPost(feedPostId);
    }

    public Map<String, Object> selectAllFeedPost(int cpage) {
        int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        int endFeedNum = cpage * feedCountPerPage;
        int startFeedNum = endFeedNum - (feedCountPerPage - 1);

        List<FeedPostDTO> list = feedpostDAO.selectAllFeedPost(startFeedNum, endFeedNum);
        List<MemberDTO> memberList = new ArrayList<>();
        List<PhotoDTO> userProfileList = new ArrayList<>();

        for (FeedPostDTO feedPost : list) {
            MemberDTO memberDTO = memberDAO.selectMemberByUserNo(feedPost.getUserNo());
            PhotoDTO photoDTO = photoDAO.selectByUserNo(memberDTO.getUserNo());
            memberList.add(memberDTO);
            userProfileList.add(photoDTO);
            List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPost.getFeedPostId());
        }
        Map<String, Object> map = new HashMap<>();
        map.put("list",list);
        map.put("userProfileList",userProfileList);
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
