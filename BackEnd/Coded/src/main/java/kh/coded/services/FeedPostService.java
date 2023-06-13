package kh.coded.services;

import java.util.List;

import kh.coded.dto.*;
import kh.coded.repositories.MemberDAO;
import kh.coded.repositories.PostHashsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.repositories.FeedPostDAO;
import utils.StaticValue;

@Service
public class FeedPostService {

    @Autowired
    private FeedPostDAO feedpostDAO;

    @Autowired
    private PostHashsDAO postHashsDAO;

    @Autowired
    private MemberDAO memberDAO;


    public List<FeedPostDTO> selectFeedList(int UserNo) {
        return feedpostDAO.selectFeedList(UserNo);
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

    public List<FeedPostDTO> selectAllFeedPost(int cpage) {
        int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        int endFeedNum = cpage * feedCountPerPage;
        int startFeedNum = endFeedNum - (feedCountPerPage - 1);

        List<FeedPostDTO> list = feedpostDAO.selectAllFeedPost(startFeedNum, endFeedNum);
        for (FeedPostDTO feedPost : list) {
            MemberDTO memberId = memberDAO.selectMemberByUserNo(feedPost.getUserNo());
            List<PostHashsWithHashTagDTO> hashTagList = postHashsDAO.selectAllTagIdByFeedPostId(feedPost.getFeedPostId());
        }
		return list;
    }

    public FeedPostDTO selectByUserNo(int userNo) {
        return feedpostDAO.selectByUserNo(userNo);
    }
}
