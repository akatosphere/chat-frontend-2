export const mapChatType = (type: "open" | "closed"): "public-group" | "private-group" =>
  type === "open" ? "public-group" : "private-group";
