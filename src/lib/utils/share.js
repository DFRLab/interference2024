//import { base } from '$app/paths';

//export const baseUrl = 'https://interference2024.org';
export const baseUrl = 'http://localhost:5137';

export const searchParamsFromFilters = (textSearch,
                                attributionScores,
                                actorNations,
                                platforms,
                                sources,
                                sourceCategories,
                                methods
                            ) => {
  const params = {
    ts: encodeURIComponent(textSearch),
    as: [attributionScores[0], attributionScores[1]].join(';'),
    f: filtersToHex([actorNations, platforms, methods, sources, sourceCategories]),
    //id: caseId,
  };

  //return `${baseUrl}/?filters=${params.f}&${params.id}&${params.ts}&${params.as}}`;
  //return `${base}?filters=${params.f}&${params.ts}&${params.as}`;
  return `${params.f}&${params.ts}&${params.as}`;
};

export const filtersToHex = (arr) => {
  const hex = arr.map((d) => binaryToHex(d.map((d) => +d.selected).join(''))).join('&');
  return hex;
};

export const filtersToBin = (arr) => {
  const bin = arr.map((d) => d ? 1 : 0).join('');
  return bin;
};

export const binaryToHex = (binary) => parseInt(binary , 2).toString(16).toLowerCase();

export const hexToBinary = (hex) => parseInt(hex, 16).toString(2);

export const binaryToBool = (binary) => binary.split('').map((d) => d === '0' ? false : true);

export const parseUrl = (hash) => {
  const s = hash.substring(1);
  const [ actorNations, platforms, methods, sources, sourceCategories, textSearch, attributionScores] = s.split('&');

  return {
    actorNations: binaryToBool(hexToBinary(actorNations)),
    platforms: binaryToBool(hexToBinary(platforms)),
    methods: binaryToBool(hexToBinary(methods)),
    sources: binaryToBool(hexToBinary(sources)),
    sourceCategories: binaryToBool(hexToBinary(sourceCategories)),
    textSearch: decodeURIComponent(textSearch),
    attributionScores: attributionScores.split(';').map((d) => +d)
  };
}; 
