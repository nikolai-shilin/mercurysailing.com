export const getParagraphedText = (text?: string) => {
  if (!text || text.trim() === '') return '';
  return text
  .split('\n')
  .map((line) => `<p>${ line }</p>`)
  .join('');
}