package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.PhotoDTO;
import kh.coded.repositories.PhotoDAO;

@Service
public class PhotoService {

	@Autowired
	private PhotoDAO photoDAO;	


	public PhotoDTO selectByFeedpostId(int feedPostId) {
		return photoDAO.selectByFeedpostId(feedPostId);
	}
}
