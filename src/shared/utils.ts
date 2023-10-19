
export const asyncForEach = async (array: any[], callBack: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let i = 0; i < array.length; i++) {
    await callBack(array[i], i, array);
  }
};
