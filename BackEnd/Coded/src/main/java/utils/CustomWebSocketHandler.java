package utils;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class CustomWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // WebSocket 연결이 열렸을 때의 처리 로직
        System.out.println("WebSocket connection opened: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // WebSocket으로 수신된 텍스트 메시지 처리 로직
        System.out.println("Received WebSocket message: " + message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // WebSocket 연결이 닫혔을 때의 처리 로직
        System.out.println("WebSocket connection closed: " + session.getId());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        // WebSocket 전송 오류가 발생했을 때의 처리 로직
        System.out.println("WebSocket transport error: " + exception.getMessage());
    }
}
