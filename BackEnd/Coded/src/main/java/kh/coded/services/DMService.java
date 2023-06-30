package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.DMDTO;
import kh.coded.repositories.DMDAO;
import kh.coded.repositories.DMRoomDAO;
import kh.coded.repositories.DMRoomUserDAO;
import kh.coded.repositories.MemberDAO;

@Service
public class DMService {

	@Autowired
	private MemberDAO memberDAO;
	
	@Autowired
	private DMDAO dmDAO;
	
	@Autowired
	private DMRoomDAO dmRoomDAO;
	
	@Autowired
	private DMRoomUserDAO dmRoomUserDAO;

	public List<DMDTO> selectDMRoomList(int roomId) {
		return dmDAO.selectDMRoomList(roomId);
	}

	public List<DMDTO> selectDMbyRoomid(int roomId) {
		return dmDAO.selectDMbyRoomid(roomId);
	}

	public void inserDM(DMDTO dmDto) {
		dmDAO.inserDM(dmDto);
		
	}
	
	
	
}
