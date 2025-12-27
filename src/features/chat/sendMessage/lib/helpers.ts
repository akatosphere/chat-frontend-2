export const resize: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
  const el = e.currentTarget;
  const style = window.getComputedStyle(el);

  const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

  el.style.height = "auto";
  el.style.height = `${el.scrollHeight - padding}px`;
};
