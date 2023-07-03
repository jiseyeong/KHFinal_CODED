package kh.coded.repositories;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.PhotoDTO;

import java.util.ArrayList;
import java.util.List;

@Repository
public class PhotoDAO {
	
	@Autowired
	private SqlSessionTemplate mybatis;

	public List<PhotoDTO> selectByFeedpostId(int feedPostId) {
		return mybatis.selectList("Photo.selectByFeedpostId",feedPostId);
	}
    public void insertPhoto(PhotoDTO photoDTO) {
		mybatis.insert("Photo.insertPhoto",photoDTO);
    }
	public PhotoDTO selectByUserNo(int userNo) {
		return mybatis.selectOne("Photo.selectByUserNo",userNo);
	}

	public PhotoDTO selectThumbNailByFeedPostId(int feedPostId) {
		List<PhotoDTO> list = mybatis.selectList("Photo.selectByFeedpostId",feedPostId);
		if(list.size()>0)
			return list.get(0);
		else
			return null;
	}

    public List<PhotoDTO> testedBySelectPhoto() {
		List<PhotoDTO> list = mybatis.selectList("Photo.testedBySelectPhoto");
		return list;
    }

	public void updatePhoto(PhotoDTO dto) {
		mybatis.update("Photo.updatePhoto",dto);
	}

	public void deletePhoto(int feedPostId) {
		mybatis.delete("Photo.deletePhoto",feedPostId);
	}
	
	public List<PhotoDTO> selectByMessageId(int messageId){
		return mybatis.selectList("Photo.selectByMessageId", messageId);
	}

	public int insertChatPhoto(PhotoDTO photoDTO) {
		mybatis.insert("Photo.insertChatPhoto", photoDTO);
		return photoDTO.getMessageId();
	}

    public List<PhotoDTO> deleteAllMessagePhotos(int roomId) {
		List<PhotoDTO> list =  mybatis.selectList("Photo.selectAllMessagePhotos",roomId);
		mybatis.delete("Photo.deleteAllMessagePhotos",roomId);
		return list;
    }
}
