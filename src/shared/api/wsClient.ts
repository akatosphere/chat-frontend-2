let socket: WebSocket | null = null;
let currentToken: string | null = null;

// Выносим установку обработчиков в отдельную функцию,
// чтобы вызывать её и при новом создании, и при "реанимации" сокета
const attachHandlers = (ws: WebSocket, token: string) => {
  ws.onopen = () => {
    console.log("WS connected ✅");
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("WS message 📩", data);
    } catch {
      console.log("WS raw message:", event.data);
    }
  };

  ws.onclose = (event) => {
    console.log("WS closed ❌", event.code, event.reason);
    // Очищаем ссылки только если закрылся текущий активный сокет
    if (currentToken === token) {
      socket = null;
      currentToken = null;
    }
  };

  ws.onerror = (event) => {
    console.error("WS error ⚠️", event);
  };
};

export const connectWS = (accessToken: string) => {
  console.log("connectWS call", { hasSocket: !!socket, token: !!accessToken });

  // 1. Если сокет уже есть и токен тот же
  if (socket && currentToken === accessToken) {
    // Если он открыт или подключается — просто ПЕРЕЗАПИСЫВАЕМ обработчики
    // Это затрет "закрытие", которое мог повесить disconnectWS в StrictMode
    if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
      console.log("WS: Re-using existing connection and resetting handlers");
      attachHandlers(socket, accessToken);
      return;
    }
  }

  // 2. Если сокет в плохом состоянии или токен другой — принудительно закрываем
  if (socket) {
    console.log("WS: Closing old/stale connection");
    // Чтобы не сработал старый onclose и не затер новый токен, обнуляем обработчик
    socket.onclose = null;
    socket.close();
  }

  console.log("WS: Creating new connection...");
  currentToken = accessToken;
  const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws/chat?authorization=${accessToken}`;
  socket = new WebSocket(wsUrl);

  attachHandlers(socket, accessToken);
};

export const disconnectWS = () => {
  if (!socket) return;

  console.log("disconnectWS call (requesting close)");

  if (socket.readyState === WebSocket.CONNECTING) {
    // Вместо прямой перезаписи onopen, мы делаем проверку:
    // если к моменту открытия мы все еще хотим закрыть сокет
    socket.onopen = () => {
      console.log("WS: Closing connection that was established during disconnect");
      socket?.close();
      socket = null;
      currentToken = null;
    };
  } else {
    socket.close();
    socket = null;
    currentToken = null;
  }
};

export const getSocket = (): WebSocket | null => socket;
