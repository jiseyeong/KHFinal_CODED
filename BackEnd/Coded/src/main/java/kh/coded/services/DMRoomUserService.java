package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.repositories.DMDAO;
import kh.coded.repositories.DMRoomDAO;
import kh.coded.repositories.DMRoomUserDAO;
import kh.coded.repositories.MemberDAO;

@Service
public class DMRoomUserService {

	@Autowired
	private MemberDAO memberDAO;
	
	@Autowired
	private DMDAO dmDAO;
	
	@Autowired
	private DMRoomDAO dmRoomDAO;
	
	@Autowired
	private DMRoomUserDAO dmRoomUserDAO;
	
}
