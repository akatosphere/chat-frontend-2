export const resizeTextarea: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
  const el = e.currentTarget;

  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};
