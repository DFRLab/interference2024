import { timeScale, attributionScoreScale} from '../../stores/scales';
  import {
    usaRed,
    polBlue,
    polPurple,
    polRed } from '$lib/utils/colors';
  import { scaleTime, scaleLinear } from 'd3-scale';
  import { max } from 'd3-array'
  //import { getTimeRange } from './misc';
  
  // sets all the basic scales
  export const setScales = (data, width, margin) => {
    if (!data) return;
    
    // time scale
    /*timeScale.set(scaleTime()
      .domain(getTimeRange(data))
      .range([margin.left, width - margin.right]));*/
  
    // attribution score scale
    attributionScoreScale.set(scaleLinear()
      .domain([-1, 1.1 * max(data, (d) => d.attributionScore)])
      .range(['#FFFFFF', usaRed]));
  };
  