package kh.coded.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        registry.enableSimpleBroker("/topic");
        // 구독할 수 있는 Channel(EndPoint) url의 prefix [ Server => Client ]
        registry.setApplicationDestinationPrefixes("/app");
        // 클라이언트가 메세지를 보낼 때 사용할 url의 prefix [ Client = > Server ]
        // => 구독 채널 prefix
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chatchat").
                addInterceptors(new HttpSessionHandshakeInterceptor()).
                setAllowedOrigins("*");
        // 접속할 Endpoint
        // registry.addEndpoint("/chat") => '/chat'으로 접속하는 endpoint 생성
        // setAllowedOrigin => 다른 http서버에서의 접근 경로 허용 여부를 지정
    }
}

