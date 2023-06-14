package kh.coded.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

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

    @SendTo("/topic/dialog")
    @MessageMapping("/message")
    public String message(String message, SimpMessageHeaderAccessor smha){

        System.out.println("메세지 전송");
        String id = (String) smha.getSessionAttributes().get("loginId");
        return "abc";
    }

//    @MessageMapping("/init")
//    public void init(String message, SimpMessageHeaderAccessor smha){
//        System.out.println("메세지 전송");
//        String id = (String) smha.getSessionAttributes().get("loginId");
//        chatService.insertMessage(new ChatDTO(0,id,id+" 님이 접속하였습니다.",System.currentTimeMillis()));
//        EvictingQueue<ChatDTO> list = chatService.selectAllMessage();
//        System.out.println("/topic/init/"+id);
//        send.convertAndSend("/topic/init/"+id,list);
//    }
//
//    @EventListener
//    public void onSubscribe(SessionSubscribeEvent e){
//        String id = (String) hSession.getAttribute("loginId");
//        chatService.insertMessage(new ChatDTO(0,id,id+" 님이 접속하였습니다.",System.currentTimeMillis()));
//        EvictingQueue<ChatDTO> list = chatService.selectAllMessage();
//        System.out.println("/topic/init/"+id);
//        send.convertAndSend("/topic/init/"+id,list);
//    }
//        inst.send("/topic/abc",message); => STOMP의 OnConnect? 시점 조정
//        SubscribeMapping
// simpMessagingTemplate =>
// 스케줄러 : taskSchedular
}

//@ServerEndpoint(value="/chat",configurator = HttpSessionConfigurator.class)
//public class ChatEndPoint {
//
//    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<>());
//    private HttpSession hSession;
//    private String id;
//    private static EvictingQueue<ChatDTO> messages;
//    private JsonObject json = new JsonObject();
//    private Gson g = new Gson();
//    private ApplicationContext ctx = SpringProvider.getApllicationContext();
//    private ChatService chatService = ctx.getBean(ChatService.class);
//    public ChatEndPoint(){
//        messages = chatService.selectAllMessage();
//    }
//    @OnOpen
//    public void onOpen(Session session, EndpointConfig config) {
//
//        kh.spring.endpoint.ChatEndPoint.clients.add(session);
//        this.hSession = (HttpSession) config.getUserProperties().get("hSession");
//        System.out.println("사용자가 접속하였습니다.");
//
//        id = (String) hSession.getAttribute("loginId");
//        ChatDTO dto = new ChatDTO(0,"alert",id+" 님이 접속하였습니다.",System.currentTimeMillis());
//        messages.add(dto);
//        for(ChatDTO dtos : messages) {
//            try {
//                session.getBasicRemote().sendText(g.toJson(dtos));
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//        ChatService chatService = ctx.getBean(ChatService.class);
//        chatService.insertMessage(dto);
//    }
//
//    @OnMessage
//    public void onMessage(String message){
//        id = (String)hSession.getAttribute("loginId");
//        ChatDTO dto = new ChatDTO(0,id,message,System.currentTimeMillis());
//        messages.add(dto);
//        synchronized (clients){
//            for(Session session : clients){
//                try{
//                    session.getBasicRemote().sendText(g.toJson(dto));
//                }catch (Exception e){
//                    e.printStackTrace();
//                }
//            }
//        }
//        ChatService chatService = ctx.getBean(ChatService.class);
//        chatService.insertMessage(dto);
//    }
//
//    @OnClose
//    public void onClose(Session session){
//        clients.remove(session);
//        System.out.println("사용자의 연결이 해제 되었습니다.");
//        ChatDTO dto = new ChatDTO(0,"alert",id+" 님이 접속을 해제하였습니다.",System.currentTimeMillis());
//        messages.add(dto);
//        synchronized (clients){
//            for (Session sessions : clients){
//                try{
//                    sessions.getBasicRemote().sendText(g.toJson(dto));
//                }catch (Exception e){}
//            }
//        }
//        ChatService chatService = ctx.getBean(ChatService.class);
//        chatService.insertMessage(dto);
//    }
//
//    @OnError
//    public void onError(Throwable throwable, Session session){
//        clients.remove(session);
//        System.out.println("사용자 통신 오류 발생");
//        ChatDTO dto = new ChatDTO(0,"alert",id+" 님이 접속을 해제하였습니다.",System.currentTimeMillis());
//        messages.add(dto);
//        synchronized (clients){
//            for (Session sessions : clients){
//                try{
//                    sessions.getBasicRemote().sendText(g.toJson(dto));
//                }catch (Exception e){}
//            }
//        }
//        ChatService chatService = ctx.getBean(ChatService.class);
//        chatService.insertMessage(dto);
//    }
//}
