// consistent sort function
export const sortConsistently = (itemA, itemB, property, key) => {
  let valueA = itemA[property];
  let valueB = itemB[property];

  if (typeof valueA === 'string') valueA = valueA.trim().toLowerCase();
  if (typeof valueB === 'string') valueB = valueB.trim().toLowerCase();
  if (typeof valueA === 'number') valueA = +valueA;
  if (typeof valueB === 'number') valueB = +valueB;
  if (typeof valueA === 'number' && isNaN(valueA)) valueA = 0;
  if (typeof valueB === 'number' && isNaN(valueB)) valueB = 0;

  let r = valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
  
  if (r === 0) {
    r = typeof itemA[key] !== 'undefined' && typeof itemB[key] !== 'undefined'
        ? +itemA[key] - +itemB[key]
        : 0;
  }
  return r;
};