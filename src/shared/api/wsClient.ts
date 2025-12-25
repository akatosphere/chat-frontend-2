let socket: WebSocket | null = null;

export const connectWS = (accessToken: string) => {
  if (socket) return;

  socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws/chat?authorization=${accessToken}`);

  socket.onopen = () => {
    console.log("WS connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("WS message", data);
  };

  socket.onclose = (event) => {
    console.log("WS closed", event.code, event.reason);
    socket = null;
  };

  socket.onerror = (event) => {
    console.error("WS error", event);
  };
};

export const disconnectWS = () => {
  socket?.close();
  socket = null;
};
