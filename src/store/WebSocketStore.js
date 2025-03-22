import { create } from 'zustand';

export const WebSocketStore = create((set, get) => ({
    connectionStatus: 'Disconnected', // 연결 상태
    receivedMessage: null, // 서버에서 받은 메시지
    ws: null, // WebSocket 객체

    // WebSocket 연결 함수
    connectWebSocket: (url, token) => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            set({ connectionStatus: 'Connected', ws });
            console.log('WebSocket 연결 성공');
            // WebSocket 연결 후 인증 메시지 전송
            const authMessage = { type: 'AUTH', accessToken: token };
            get().sendMessage(authMessage); // sendMessage 함수 호출
        };

        ws.onclose = () => {
            set({ connectionStatus: 'Disconnected', ws: null });
            console.log('WebSocket 연결 종료');
        };

        ws.onerror = (error) => {
            set({ connectionStatus: 'Error' });
            console.error('WebSocket 오류:', error);
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('서버에서 받은 메시지:', message);
            if (message.type === 'ERROR') {
                // 오류 메시지를 받았을 때 WebSocket을 종료할 수 있음
                console.log('서버에서 오류 메시지를 받음. 연결 종료.');
                ws.close(); // WebSocket 종료
            }
            set({ receivedMessage: message });
        };
    },

    // WebSocket 메시지 전송 함수
    sendMessage: (message) => {
        const { ws } = get(); // 현재 WebSocket 객체 가져오기
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
            console.log('WebSocket 메시지 전송:', message);
        } else {
            console.error('WebSocket이 열려있지 않아 메시지를 보낼 수 없습니다.');
        }
    },

    // WebSocket 연결 종료 함수
    disconnectWebSocket: () => {
        const { ws } = get();
        if (ws) {
            ws.close();
            set({ connectionStatus: 'Disconnected', ws: null });
        }
    },

        // 현재 WebSocket 연결 상태를 확인하는 함수
        isWebSocketConnected: () => {
            const { ws } = get();
            return ws && ws.readyState === WebSocket.OPEN;
        }
    
}))