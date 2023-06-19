package kh.coded.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.util.HtmlUtils;

import kh.coded.dto.DMDTO;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate send;
//    @SendTo("/topic/dialog")
//    @MessageMapping("/init")
//    public String init(String message, SimpMessageHeaderAccessor smha){
//        messages = chatService.selectAllMessage();
//        return g.toJson(messages);
//    }

    @MessageMapping("/send")
    @SendTo("/chat/DM")
    public String greeting(String msg) throws Exception {
        
    	Thread.sleep(1000); // simulated delay
        
    	return msg;
    }
    @EventListener
    public void onConnect(SessionConnectedEvent e){
        System.out.println("확인");
    }

}