
export const convertRemToPx = (rem: string) => {
  return parseInt(rem.replace('rem', '')) * 16;
}