package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.DMRoomDTO;
import kh.coded.repositories.DMDAO;
import kh.coded.repositories.DMRoomDAO;
import kh.coded.repositories.DMRoomUserDAO;
import kh.coded.repositories.MemberDAO;

@Service
public class DMRoomService {

	@Autowired
	private MemberDAO memberDAO;

	@Autowired
	private DMDAO dmDAO;

	@Autowired
	private DMRoomDAO dmRoomDAO;

	@Autowired
	private DMRoomUserDAO dmRoomUserDAO;

	public List<DMRoomDTO> selectByUserNo (int userNo) {
		return dmRoomDAO.selectByUserNo(userNo);	
	}

	public int createRoomId () {
		return dmRoomDAO.createRoomId();
	}


}
