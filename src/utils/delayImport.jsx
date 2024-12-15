export const delayImport = (importFunc, delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(importFunc()), delay);
  });
};
