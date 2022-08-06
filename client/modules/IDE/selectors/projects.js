import { createSelector } from 'reselect';
import { filterByName, sortItems, getField, getDirection } from './collections';

const getSketches = (state) => state.sketches;
const getSearchTerm = (state) => state.search.sketchSearchTerm;

const getFilteredSketches = createSelector(
  getSketches,
  getSearchTerm,
  filterByName
);

const getSortedSketches = createSelector(
  getFilteredSketches,
  getField,
  getDirection,
  sortItems
);

export default getSortedSketches;
