export const resize: React.FormEventHandler<HTMLTextAreaElement> = e => {
  console.log('resize called')
  const el = e.currentTarget
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}
