package kh.coded.config;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
public class StompHandler implements ChannelInterceptor {

	
	
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		SimpMessageType messageType = accessor.getMessageType();
		 switch (messageType) {
	    	case CONNECT:
	    		
	        	System.out.println("연결");
	            break;
	        case DISCONNECT:
	        	System.out.println("연결해제");
	            break;
	        case HEARTBEAT:
	        	System.out.println(accessor);
	        	System.out.println("하트비트");
	        	break;
	        case MESSAGE:
	        	System.out.println("메세지");
	        	break;
	        default:
	        	System.out.println(messageType);
	            break;
	    }
		return message;
	}

	
	
}







