package kh.coded.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Autowired
	private StompHandler stompHandler;

	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		// 메시지 브로커 구성
		config.enableSimpleBroker("/topic")
		.setTaskScheduler(heartBeatScheduler());
		// 구독할 수 있는 endPoint URL prefix (server > client)
		config.setApplicationDestinationPrefixes("/app");
		// client가 메세지 보낼 때 사용할 URL prefix (client > server)
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// STOMP 엔드포인트 등록 // 
		registry.addEndpoint("/ws")
		.addInterceptors(new HttpSessionHandshakeInterceptor())
		.setAllowedOriginPatterns("*")
		.withSockJS();
	}

	
	//인터셉터
	@Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }

	
	// 허트비트
	@Bean
    public TaskScheduler heartBeatScheduler() {
        return new ThreadPoolTaskScheduler();
    }


}

