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
	public void configureMessageBroker(MessageBrokerRegistry config) {
		// 메시지 브로커 구성
		config.enableSimpleBroker("/topic");
		// 구독할 수 있는 endPoint URL prefix (server > client)
		config.setApplicationDestinationPrefixes("/app");
		// client가 메세지 보낼 때 사용할 URL prefix (client > server)
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// STOMP 엔드포인트 등록 // 
		registry.addEndpoint("/ws")
		.addInterceptors(new HttpSessionHandshakeInterceptor())
		.setAllowedOrigins("*")
		.withSockJS();
	}




}

