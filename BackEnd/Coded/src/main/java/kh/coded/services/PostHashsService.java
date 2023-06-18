package kh.coded.services;

import kh.coded.dto.PostHashsWithHashTagDTO;
import kh.coded.repositories.PostHashsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostHashsService {

    @Autowired
    private PostHashsDAO postHashsDAO;

    public List<PostHashsWithHashTagDTO> selectAllPostTagNames() {
        return postHashsDAO.selectAllPostTagNames();
    }
}
