package kh.coded.controllers;

import jakarta.servlet.http.HttpServletRequest;
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
            @RequestParam(value="userNo", required = false, defaultValue ="0") int userNo,
            @RequestParam(value="feedPostId", required = false, defaultValue ="0") int feedPostId,
            @RequestParam("files") List<MultipartFile> files,
            HttpServletRequest request
    ) throws IOException {
        Map<String, Integer> map = new HashMap<>();
        map.put("userNo", userNo);
        map.put("feedPostId", feedPostId);
        String realPath = request.getServletContext().getRealPath("images");
        photoService.insertPhoto(realPath, files, map);
        System.out.println(request.getServletContext().getRealPath("images"));
        System.out.println("userNo : "+userNo);
        System.out.println("feedPostId : "+feedPostId);
        return ResponseEntity.ok().body("success");
    }
    @GetMapping("testedBySelectPhoto")
    public ResponseEntity<?> testedBySelectPhoto(){
        List<PhotoDTO> list = photoService.testedBySelectPhoto();
        return ResponseEntity.ok().body(list);
    }
}
