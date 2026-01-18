export const mapGroupType = (type: "open" | "closed"): "public-group" | "private-group" =>
  type === "open" ? "public-group" : "private-group";
