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

    public void insertPhoto(String realPath, List<MultipartFile> files, Map<String, Integer> map) throws IOException {
        File realPathFile = new File(realPath);
        if (!realPathFile.exists()) {
            realPathFile.mkdir();
        }

        if (files != null) {
            for (MultipartFile file : files) {
                if (file.isEmpty())
                    continue;
                String oriName = file.getOriginalFilename();
                String sysName = UUID.randomUUID() + oriName;
                file.transferTo(new File(realPath + "/" + sysName));
                if (map.get("userNo") != 0)
                    photoDAO.insertPhoto(new PhotoDTO(0, oriName, sysName, 0, 0, map.get("userNo")));
                else if (map.get("feedPostId") != 0)
                    photoDAO.insertPhoto(new PhotoDTO(0, oriName, sysName, map.get("feedPostId"), 0, 0));
            }
        }
    }

    public void updatePhoto(String realPath, List<MultipartFile> files, Map<String, Integer> map) throws IOException {
        File realPathFile = new File(realPath);
        if (!realPathFile.exists()) {
            realPathFile.mkdir();
        }

        if (map.get("feedPostId") != 0) {
            // feedPost에 저장된 사진들을 업데이트 하는 경우
            // 기존 feedpost에 저장된 사진들의 파일들을 HDD에서 모두 삭제
            List<PhotoDTO> oriFileList = photoDAO.selectByFeedpostId(map.get("feedPostId"));
            if (oriFileList.size() != 0) {
                int feedPostId = oriFileList.get(0).getFeedPostId();
                for (PhotoDTO dto : oriFileList) {
                    File oriFile = new File(realPath + "/" + dto.getSysName());
                    oriFile.delete();

                }
                // 
                photoDAO.deletePhoto(feedPostId);
            }
        }

        if (files != null) {
            for (MultipartFile file : files) {
                if (file.isEmpty())
                    continue;
                // OriName과 SysName을 저장 후 파일을 HDD에 저장
                String oriName = file.getOriginalFilename();
                String sysName = UUID.randomUUID() + oriName;
                file.transferTo(new File(realPath + "/" + sysName));

                if (map.get("userNo") != 0) {
                    // 유저 프로필을 수정하는 경우 기존의 유저 프로필을 HDD에서 삭제
                    // 기존 프로필이 없을 경우 이 과정을 넘어감
                    PhotoDTO oriDto = photoDAO.selectByUserNo(map.get("userNo"));
                    if (oriDto != null) {
                        File oriFile = new File(realPath + "/" + oriDto.getSysName());
                        oriFile.delete();
                        // 이후 남아있는 DB를 업데이트
                        photoDAO.updatePhoto(new PhotoDTO(0, oriName, sysName, 0, 0, map.get("userNo")));
                    } else {
                        // 기존 프로필이 없을 경우 DB에 새로 insert
                        photoDAO.insertPhoto(new PhotoDTO(0, oriName, sysName, 0, 0, map.get("userNo")));
                    }
                } else if (map.get("feedPostId") != 0) {
                    // feedPost에 저장된 사진들을 업데이트 하는 경우
                    List<PhotoDTO> oriFileList = photoDAO.selectByFeedpostId(map.get("feedPostId"));
                    if (oriFileList.size() != 0) {
                        //
                        photoDAO.updatePhoto(new PhotoDTO(0, oriName, sysName, map.get("feedPostId"), 0, 0));
                    } else {
                        // 기존에 저장된 feedpost 사진이 없을 경우 새로 insert
                        photoDAO.insertPhoto(new PhotoDTO(0, oriName, sysName, map.get("feedPostId"), 0, 0));
                    }
                }
            }
        }
    }

    public List<PhotoDTO> testedBySelectPhoto() {
        return photoDAO.testedBySelectPhoto();
    }

    public List<PhotoDTO> selectByFeedpostId(int feedPostId) {
        return photoDAO.selectByFeedpostId(feedPostId);
    }

    public List<PhotoDTO> selectByMessageId(int messageId) {
        return photoDAO.selectByMessageId(messageId);
    }

    public int insertChatPhoto(String realPath, List<MultipartFile> files) throws Exception {

        File realPathFile = new File(realPath);
        if (!realPathFile.exists()) {
            realPathFile.mkdir();
        }

        if (files != null) {
            for (MultipartFile file : files) {
                if (file.isEmpty())
                    continue;
                // OriName과 SysName을 저장 후 파일을 HDD에 저장
                String oriName = file.getOriginalFilename();
                String sysName = UUID.randomUUID() + oriName;
                file.transferTo(new File(realPath + "/" + sysName));
                return photoDAO.insertChatPhoto(new PhotoDTO(0, oriName, sysName, 0, 0, 0));
            }
        }
        return 0;
    }
}
