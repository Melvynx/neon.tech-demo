import { cache } from 'react';

let counter = 0;

export const superLongRequest = cache((): Promise<string> => {
  const saveCounter = counter++;
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('I just resolve super long request !');
      resolve(`Long result ${saveCounter}`);
    }, 1000);
  });
});
