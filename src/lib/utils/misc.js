import { min, max } from 'd3-array';

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

// extract attribution date range from data
export const getTimeRange = (data) => {
  console.log(data)
  const maxAttributionDate = max(data, (d) => d.attribution_date);
  return([min(data, (d) => d.attribution_date), new Date(
    maxAttributionDate.getFullYear(), maxAttributionDate.getMonth() + 5
  )]);
};

// check if a number is within a 2D range (given as array with length 2)
export const withinRange = (arr, num, bypass = false) => bypass ? true : (num >= arr[0] && num <= arr[1]);

// check if a search string (filter) is included in a string
export const includesTextSearch = (filter, s) => {
  const filterArr = filter.toLowerCase().split(' or ');
  if (filterArr.length === 0) return true;
  return filterArr.some((f) => {
    return s.indexOf(f) > -1;
  });
};

// scroll-to function (also set on window to make it available outside svelte)
export const scrollTo = (targetId) => {
  setTimeout(() => {
    document.getElementById(targetId).scrollIntoView({behavior: 'smooth'});
  }, 200);
  return(false);
};