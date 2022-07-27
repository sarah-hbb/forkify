import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const dataJSON = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]) ;
    const data = await dataJSON.json();
    if (!dataJSON.ok)
      throw new Error(
        `🧶🧶🧶`
      );
    return data;
  } catch (err) {
    console.error(`${err} in helper🧨🧨`);
    throw err;
  }
};
