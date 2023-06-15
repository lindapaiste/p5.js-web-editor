import { combineReducers } from 'redux';
import files from './modules/IDE/reducers/files';
import ide from './modules/IDE/reducers/ide';
import preferences from './modules/IDE/reducers/preferences';
import project from './modules/IDE/reducers/project';
import editorAccessibility from './modules/IDE/reducers/editorAccessibility';
import user from './modules/User/reducers';
import sketches from './modules/Dashboard/projects/reducer';
import toast from './modules/IDE/reducers/toast';
import console from './modules/IDE/reducers/console';
import assets from './modules/Dashboard/assets/reducer';
import search from './modules/Dashboard/common/search/reducer';
import sorting from './modules/Dashboard/common/sorting/reducer';
import loading from './modules/IDE/reducers/loading';
import collections from './modules/Dashboard/collections/reducer';

const rootReducer = combineReducers({
  ide,
  files,
  preferences,
  user,
  project,
  sketches,
  search,
  sorting,
  editorAccessibility,
  toast,
  console,
  assets,
  loading,
  collections
});

export default rootReducer;
