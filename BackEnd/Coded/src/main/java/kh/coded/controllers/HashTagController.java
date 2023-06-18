package kh.coded.controllers;

import kh.coded.dto.PostHashsWithHashTagDTO;
import kh.coded.services.PostHashsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/PostHashs/")
public class HashTagController {

    @Autowired
    private PostHashsService postHashsService;

    @GetMapping("selectAllPostTagNames")
    public ResponseEntity<?> selectAllHashTags(){
        System.out.println("test");
        List<PostHashsWithHashTagDTO> hashTagNameList =  postHashsService.selectAllPostTagNames();
        System.out.println(hashTagNameList);
        return ResponseEntity.ok().body(hashTagNameList);
    }
}
