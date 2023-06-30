package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import kh.coded.dto.DMDTO;
import kh.coded.services.DMRoomService;
import kh.coded.services.DMRoomUserService;
import kh.coded.services.DMService;


@RestController

public class StompController  {

	@Autowired
	private SimpMessagingTemplate template;
	
	@Autowired
	private DMRoomService DMRoomService;

	@Autowired
	private DMService DMService;

	@Autowired
	private DMRoomUserService DMRoomUserService;
	// -- 이하 STOMP 구독 및 메세지 송신 --
	
		// 구독
		@SubscribeMapping("/topic/{roomId}")
		public List<DMDTO> handleSubscription(@DestinationVariable int roomId) {
		    // 해당 방 번호를 기반으로 구독 처리 로직을 수행하고 채팅 내역을 반환
			System.out.println(roomId+"를 구독함");
			List<DMDTO> list = DMService.selectDMbyRoomid(roomId);
		    return list;
		}
		
		// 메세지 송신 후 특정 roomId에 송신
	    @MessageMapping("/chat/{roomId}")
	    public void handleChatMessage(@DestinationVariable int roomId, String message, int userNo) {
	    	System.out.println("방번호 "+roomId +" 보낸사람 "+userNo+" 메세지 "+message );
	    	template.convertAndSend("/topic/{roomId}",message);
		}
	    
	
	    
	    @MessageExceptionHandler()
	    public void MessageExceptionHandler(){
	    	System.out.println("메세지 관련 에러발생");
	    }
}
