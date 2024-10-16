import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

function createRangeFilter() {
  const { subscribe, set, update } = writable([0, 0]);

  return {
    subscribe,
    set,
    setMin: (value) => update((f) => f[0] = value),
    setMax: (value) => update((f) => f[1] = value)
  };
}

function createTimeRangeFilter() {
  const { subscribe, set, update } = tweened([new Date('2024-01-01'), new Date()], {
		duration: 750,
		easing: cubicOut
	});

  return {
    subscribe,
    set,
    setMin: (value) => update((f) => f[0] = value),
    setMax: (value) => update((f) => f[1] = value)
  };
}

function createInclusiveFilter() {
  const { subscribe, set, update } = writable([]);

  const select = (id) => update((f) => f.map((d) => ({...d, selected: [id].flat().includes(d.id) ? true : d.selected})));
  const unselectAll = () => update((f) => f.map((d) => ({...d, selected: false})));

  const applyBoolArray = (arr) => {
    const tmpArr = [...arr].reverse();
    update((f) => f.reverse().map((d, i) => ({...d, selected: tmpArr[i] !== undefined ? tmpArr[i] : false})).reverse());
  };

  return {
    subscribe,
    set: (value) => set(value),
    init: (values, id) => set([...new Set(values.map((d) => d[id]).flat())].map((id) => ({id, name: id, selected: true}))),
    select,
    selectOne: (id) => {
      unselectAll();
      select(id)
    },
    selectAll: () => update((f) => f.map((d) => ({...d, selected: true}))),
    unselect: (id) => update((f) => f.map((d) => ({...d, selected: [id].flat().includes(d.id) ? false : d.selected}))),
    unselectAll,
    applyBoolArray
  };
}

function createTextSearchFilter() {
  const { subscribe, set } = writable('');

  return {
    subscribe,
    set,
    reset: () => set('')
  };
}

export const actorNationFilter = createInclusiveFilter();

export const platformFilter = createInclusiveFilter();

export const methodFilter = createInclusiveFilter();

export const campaignFilter = createInclusiveFilter();

export const sourceFilter = createInclusiveFilter();

export const sourceCategoryFilter = createInclusiveFilter();

export const tagFilter = createInclusiveFilter();

export const attributionScoreFilter = createRangeFilter();
export const attributionScoreDef = [0, 18];

export const timeRangeFilter = createTimeRangeFilter();
export const fullTimeRange = writable([])
export const defaultTimeRange = writable([])

export const polarizationFilter = createRangeFilter();
export const polarizationDef = [-2, 2];

export const unselectAllFilters = (disinformantNation = true) => {
  if (disinformantNation) actorNationFilter.unselectAll();
  platformFilter.unselectAll();
  methodFilter.unselectAll();
  campaignFilter.unselectAll();
  sourceFilter.unselectAll();
  sourceCategoryFilter.unselectAll();
  tagFilter.unselectAll();
  attributionScoreFilter.set(attributionScoreDef);
  polarizationFilter.set(polarizationDef);
};

export const selectAllFilters = (disinformantNation = true) => {
  if (disinformantNation) actorNationFilter.selectAll();
  platformFilter.selectAll();
  methodFilter.selectAll();
  campaignFilter.selectAll();
  sourceFilter.selectAll();
  sourceCategoryFilter.selectAll();
  tagFilter.selectAll();
  attributionScoreFilter.set(attributionScoreDef);
  polarizationFilter.set(polarizationDef);
  textSearchFilter.reset();
  caseIdFilter.set(undefined);
};

export const textSearchFilter = createTextSearchFilter();

export const contextData = createInclusiveFilter();

export const brushed = writable(false);
export const originalTimeDomain = writable(null);

export const caseIdFilter = writable();

export const highlightPolarization = writable(false);

export const highlightCib = writable(false);
