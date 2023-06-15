package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.PhotoDTO;
import kh.coded.repositories.PhotoDAO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class PhotoService {

	@Autowired
	private PhotoDAO photoDAO;	


	public PhotoDTO selectByFeedpostId(int feedPostId) {
		return photoDAO.selectByFeedpostId(feedPostId);

	}

	public void insertTest(String realPath, List<MultipartFile> files) throws IOException {
		File realPathFile = new File(realPath);
		if(!realPathFile.exists()){
			realPathFile.mkdir();
		}

		if(files != null){
			for(MultipartFile file : files){
				if(file.isEmpty())
					continue;
				String oriName = file.getOriginalFilename();
				String sysName = UUID.randomUUID()+oriName;
				file.transferTo(new File(realPath+"/"+sysName));
				photoDAO.insertTest(new PhotoDTO(0,oriName,sysName,0,0,1));
			}
		}
	}


	public PhotoDTO selectFeedlike(int feedPostId) {
		return photoDAO.selectFeedlike(feedPostId);
	}
}
