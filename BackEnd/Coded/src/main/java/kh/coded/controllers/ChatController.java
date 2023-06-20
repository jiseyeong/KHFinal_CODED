package kh.coded.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import kh.coded.dto.DMDTO;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
//    @SendTo("/topic/dialog")
//    @MessageMapping("/init")
//    public String init(String message, SimpMessageHeaderAccessor smha){
//        messages = chatService.selectAllMessage();
//        return g.toJson(messages);
//    }

    @MessageMapping("/chat")
    public void sendMessage(DMDTO DMdto, SimpMessageHeaderAccessor accessor) {
        simpMessagingTemplate.convertAndSend("/sub/chat/" + DMdto.getRoomId(), DMdto);
    }

}