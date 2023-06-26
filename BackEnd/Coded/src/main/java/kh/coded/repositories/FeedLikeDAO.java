package kh.coded.repositories;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FeedLikeDAO {

    @Autowired
    private SqlSessionTemplate mybatis;

    public int insertFeedLike(int userNo, int feedPostId) {
        Map<String, Integer> map = new HashMap<>();
        map.put("userNo", userNo);
        map.put("feedPostId", feedPostId);
        if (mybatis.insert("FeedLike.insertFeedLike", map)>0)
            return mybatis.selectOne("FeedLike.selectFeedLike", feedPostId);
        else
            return 0;
    }

    public int deleteFeedLike(int userNo, int feedPostId) {
        Map<String, Integer> map = new HashMap<>();
        map.put("userNo", userNo);
        map.put("feedPostId", feedPostId);
        if (mybatis.delete("FeedLike.deleteFeedLike", map)>0)
            return mybatis.selectOne("FeedLike.selectFeedLike", feedPostId);
        else
            return 0;
    }

    public int selectFeedLike(int feedPostId) {
        return mybatis.selectOne("FeedLike.selectFeedLike", feedPostId);
    }

    public boolean isFeedLike(int userNo, int feedPostId) {
        Map<String, Integer> map = new HashMap<>();
        map.put("userNo", userNo);
        map.put("feedPostId", feedPostId);
        Boolean check = mybatis.selectOne("FeedLike.isFeedLike", map);
        if (check == null)
            return false;
        else
            return check;
    }
}
