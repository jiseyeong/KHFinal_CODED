package kh.coded.repositories;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.PhotoDTO;

@Repository
public class PhotoDAO {
	
	@Autowired
	private SqlSessionTemplate mybatis;

	public PhotoDTO selectByFeedpostId(int feedPostId) {
		return mybatis.selectOne("Photo.selectByFeedpostId",feedPostId);
	}
}
