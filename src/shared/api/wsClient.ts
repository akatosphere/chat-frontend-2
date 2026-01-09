let socket: WebSocket | null = null;
let currentToken: string | null = null;

export const disconnectWS = () => {
  if (!socket) return;

  /**
   * ПРЕДОТВРАЩЕНИЕ ОШИБКИ: "WebSocket is closed before the connection is established"
   * Если сокет в состоянии CONNECTING (0), мы перехватываем момент открытия,
   * чтобы закрыть его сразу после того, как он установится.
   */
  if (socket.readyState === WebSocket.CONNECTING) {
    socket.onopen = () => {
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

export const connectWS = (accessToken: string) => {
  // 1. Если сокет уже в процессе подключения или открыт с тем же токеном — ничего не делаем
  if (
    socket &&
    currentToken === accessToken &&
    (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  // 2. Если токен изменился, а старый сокет еще жив — закрываем его
  if (socket) {
    console.log("WS: Token changed or stale connection, closing old socket...");
    disconnectWS();
  }

  currentToken = accessToken;
  const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws/chat?authorization=${accessToken}`;

  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    console.log("WS connected ✅");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("WS message 📩", data);
    } catch {
      console.log("WS raw message:", event.data);
    }
  };

  socket.onclose = (event) => {
    console.log("WS closed ❌", event.code, event.reason);
    // Очищаем ссылки только если сокет закрылся сам (сервером)
    if (socket?.url.includes(accessToken)) {
      socket = null;
      currentToken = null;
    }
  };

  socket.onerror = (event) => {
    console.error("WS error ⚠️", event);
  };
};
