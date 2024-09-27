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

// split string into array
export const splitString = (s) => {
  if (s === '' || s === ',') return ['unspecified'];
  return(s
          .split(';')
          .map((d) => d.trim())
          .filter((d) => d !== ''));
};

// check if there's overlap between array and filter
export const haveOverlap = (filter, arr) =>
  filter.filter((d) => d.selected).map((d) => d.id).some((item) => arr.includes(item));