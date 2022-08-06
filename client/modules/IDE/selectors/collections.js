import { createSelector } from 'reselect';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';
import { DIRECTION } from '../actions/sorting';

const getCollections = (state) => state.collections;
export const getField = (state) => state.sorting.field;
export const getDirection = (state) => state.sorting.direction;
const getSearchTerm = (state) => state.search.collectionSearchTerm;

// Can filter collections, sketches, or any object with a `name` property.
export function filterByName(array, search) {
  if (search) {
    return array.filter((object) =>
      object.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  return array;
}

const getFilteredCollections = createSelector(
  getCollections,
  getSearchTerm,
  filterByName
);

function getIteratee(field) {
  switch (field) {
    case 'name':
      return (object) => object.name.toLowerCase();
    case 'numItems':
      return 'items.length';
    default:
      return field;
  }
}

export function sortItems(array, field, direction) {
  return orderBy(
    array,
    getIteratee(field),
    direction === DIRECTION.DESC ? 'desc' : 'asc'
  );
}

const getSortedCollections = createSelector(
  getFilteredCollections,
  getField,
  getDirection,
  sortItems
);

export function getCollection(state, id) {
  return find(getCollections(state), { id });
}

export default getSortedCollections;
