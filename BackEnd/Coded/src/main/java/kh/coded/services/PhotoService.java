package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.PhotoDTO;
import kh.coded.repositories.PhotoDAO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class PhotoService {

	@Autowired
	private PhotoDAO photoDAO;	


	public PhotoDTO selectByFeedpostId(int feedPostId) {
		return photoDAO.selectByFeedpostId(feedPostId);

	}

	public PhotoDTO selectFeedlike(int feedPostId) {
		return photoDAO.selectFeedlike(feedPostId);
	}

	public void insertPhoto(String realPath, List<MultipartFile> files, Map<String, Integer> map) throws IOException {
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
				if(map.get("userNo")!=0)
					photoDAO.insertPhoto(new PhotoDTO(0,oriName,sysName,0,0,map.get("userNo")));
				else if(map.get("feedPostId")!=0)
					photoDAO.insertPhoto(new PhotoDTO(0,oriName,sysName,map.get("feedPostId"),0,0));
			}
		}
	}

}
