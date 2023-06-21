package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.DMDTO;
import kh.coded.dto.DMRoomDTO;
import kh.coded.services.DMRoomService;
import kh.coded.services.DMRoomUserService;
import kh.coded.services.DMService;


@RestController
@RequestMapping("/DM/")
public class ChatController {

	@Autowired
	private SimpMessagingTemplate template;

	@Autowired
	private DMRoomService DMRoomService;

	@Autowired
	private DMService DMService;

	@Autowired
	private DMRoomUserService DMRoomUserService;

	// -- DM 관련 DB 작업 --

	// UserNo를 통한 DMRoomDTO 데이터 얻어오기
	@GetMapping("selectChatList")
	public ResponseEntity<?> selectChatList (@RequestParam(value = "userNo") int UserNo){
		System.out.println(UserNo);
		try {
			List<DMRoomDTO> list = DMRoomService.selectByUserNo(UserNo);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("selectDMList")
	public ResponseEntity<?> selectDMList (int RoomId){
		try {
			List<DMDTO> list = DMService.selectDMList(RoomId);
			return ResponseEntity.ok().body(list);
		}catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}



	// -- 이하 STOMP 구독 및 메세지 송신 --

	@PostMapping("/send")
	public ResponseEntity<Void> sendMessage(@RequestBody DMDTO DMDTO) {
		template.convertAndSend("/topic/message", DMDTO);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@MessageMapping("/sendMessage")
	public void receiveMessage(@Payload DMDTO DMDTO) {
		// receive message from client
	}


	@SendTo("/topic/message")
	public DMDTO broadcastMessage(@Payload DMDTO DMDTO) {
		return DMDTO;
	}


}