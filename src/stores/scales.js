import { writable, readable } from 'svelte/store';

export const timeScale = writable();
export const attributionScoreScale = writable();

//export const scaleFactor = readable(window.devicePixelRatio || 1);