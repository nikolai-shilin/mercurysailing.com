export const getTitleText = (source: string) => {
  // insert nbsp after every 1-3 letter word
  source = source.replace(/&nbsp;/g, ' ');
  // remove multiple spaces
  source = source.replace(/\s+/g, ' ');
  const words = source.trim().split(' ').reverse();

  for (let i = 0; i < words.length; i++) {
    if (words[i].length < 3 && words[i + 1]?.length > 3) {
      words[i] = words[i] + '&nbsp;';
    } else {
      words[i] = words[i] + ' ';
    }
  }
  return words.reverse().join('');
};