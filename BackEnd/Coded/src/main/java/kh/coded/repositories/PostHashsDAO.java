package kh.coded.repositories;

import kh.coded.dto.PostHashsDTO;
import kh.coded.dto.PostHashsWithHashTagDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostHashsDAO {

    @Autowired
    private SqlSessionTemplate mybatis;

    public List<PostHashsWithHashTagDTO> selectAllTagIdByFeedPostId(int feedPostId){
        return mybatis.selectList("PostHashs.selectAllTagIdByFeedPostId",feedPostId);
    }

    public List<PostHashsWithHashTagDTO> selectAllPostTagNames() {
        return mybatis.selectList("PostHashs.selectAllPostTagNames");
    }
}
