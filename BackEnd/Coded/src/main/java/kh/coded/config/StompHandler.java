package kh.coded.config;

import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
public class StompHandler extends ChannelInterceptorAdapter {
    private final TokenProvider tokenProvider;
    
    @Override
    public DMDTO preSend(DMDTO message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(accessor.getCommand() == StompCommand.CONNECT) {
            if(!tokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization")))
                throw new AccessDeniedException("");
        }
        return message;
    }
}

	
	
}
