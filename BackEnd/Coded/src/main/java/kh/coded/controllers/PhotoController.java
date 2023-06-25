package kh.coded.controllers;

import jakarta.servlet.http.HttpServletRequest;
import kh.coded.dto.MemberWithProfileDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/photo/")
@RestController
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    // 사진 입력 전용 메소드
    // 어떤 파라미터를 넘기냐에 따라 각각 해당 컬럼으로 값을 넣고 나머지 값은 null로 고정
    // axios로 넘길 시, 파일과 해당 컬럼 값만 파라미터로 넘겨주면 사용 가능
    @PostMapping("insertPhoto")
    public ResponseEntity<?> insertPhoto(
            @RequestParam(value = "userNo", required = false, defaultValue = "0") int userNo,
            @RequestParam(value = "feedPostId", required = false, defaultValue = "0") int feedPostId,
            @RequestParam("files") List<MultipartFile> files,
            HttpServletRequest request
    ) {
        try {
            Map<String, Integer> map = new HashMap<>();
            map.put("userNo", userNo);
            map.put("feedPostId", feedPostId);
            String realPath = request.getServletContext().getRealPath("images");
            photoService.insertPhoto(realPath, files, map);
            System.out.println(request.getServletContext().getRealPath("images"));
            return ResponseEntity.ok().body("success");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("updatePhoto")
    public ResponseEntity<?> updatePhoto(
            @RequestParam(value = "userNo", required = false, defaultValue = "0") int userNo,
            @RequestParam(value = "feedPostId", required = false, defaultValue = "0") int feedPostId,
            @RequestParam("files") List<MultipartFile> files,
            HttpServletRequest request
    ) {
        try {
            Map<String, Integer> map = new HashMap<>();
            map.put("userNo", userNo);
            map.put("feedPostId", feedPostId);
            String realPath = request.getServletContext().getRealPath("images");

            photoService.updatePhoto(realPath, files, map);

            System.out.println(request.getServletContext().getRealPath("images"));
            return ResponseEntity.ok().body(null);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("testedBySelectPhoto")
    public ResponseEntity<?> testedBySelectPhoto() {
        List<PhotoDTO> list = photoService.testedBySelectPhoto();
        return ResponseEntity.ok().body(list);
    }
    
    @GetMapping("feedpost")
    public ResponseEntity<?> selectFeedPostPhoto(
    		@RequestParam(value="feedPostId") int feedPostId
    		){
    	List<PhotoDTO> list = photoService.selectByFeedpostId(feedPostId);
    	return ResponseEntity.ok().body(list);
    }
    
}
//    @PostMapping("/removeFile")
//    public ResponseEntity<Boolean> removeFile(String fileName){
//
//        String srcFileName = null;
//
//        try{
//            srcFileName = URLDecoder.decode(fileName,"UTF-8");
//            //UUID가 포함된 파일이름을 디코딩해줍니다.
//            File file = new File(uploadPath +File.separator + srcFileName);
//            boolean result = file.delete();
//
//            File thumbnail = new File(file.getParent(),"s_"+file.getName());
//            //getParent() - 현재 File 객체가 나태내는 파일의 디렉토리의 부모 디렉토리의 이름 을 String으로 리턴해준다.
//            result = thumbnail.delete();
//            return new ResponseEntity<>(result,HttpStatus.OK);
//        }catch (UnsupportedEncodingException e){
//            e.printStackTrace();
//            return new ResponseEntity<>(false,HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

