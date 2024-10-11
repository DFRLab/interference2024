export const searchParamsFromFilters = (textSearch,
                                attributionScores,
                                actorNations,
                                platforms,
                                sources,
                                sourceCategories,
                                methods,
                                campaigns
                            ) => {
  const params = {
    ts: encodeURIComponent(textSearch),
    as: [attributionScores[0], attributionScores[1]].join(';'),
    f: filtersToHex([actorNations, platforms, methods, sources, sourceCategories, campaigns]),
    //id: caseId,
  };

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

export const binaryToHex = (binary) => parseInt(binary, 2).toString(16).toLowerCase();

export const hexToBinary = (hex) => parseInt(hex, 16).toString(2);

export const binaryToBool = (binary) => binary.split('').map((d) => d === '0' ? false : true);

// Convert the binary numbers from the url to arrays of booleans
// These arrays are used on the filters with their applyBoolArray method
export const parseUrl = (params) => {
  //const s = hash.substring(1);
  const [ actorNations, platforms, methods, sources, sourceCategories, campaigns, textSearch, attributionScores] = params.split('&');

  return {
    actorNations: binaryToBool(hexToBinary(actorNations)),
    platforms: binaryToBool(hexToBinary(platforms)),
    methods: binaryToBool(hexToBinary(methods)),
    sources: binaryToBool(hexToBinary(sources)),
    sourceCategories: binaryToBool(hexToBinary(sourceCategories)),
    campaigns: binaryToBool(hexToBinary(campaigns)),
    textSearch: decodeURIComponent(textSearch),
    attributionScores: attributionScores.split(';').map((d) => +d)
  };
}; 
