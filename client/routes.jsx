import { Route, IndexRoute } from 'react-router';
import React from 'react';
import { getUser } from './modules/User/actions';
import { stopSketch } from './modules/IDE/actions/ide';
import createRedirectWithUsername from './components/createRedirectWithUsername';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
  userIsAuthorized
} from './utils/auth';
import { mobileFirst, responsiveForm } from './utils/responsive';

const App = React.lazy(() => import('./modules/App/App'));
const IDEView = React.lazy(() => import('./modules/IDE/pages/IDEView'));
const MobileIDEView = React.lazy(() =>
  import('./modules/IDE/pages/MobileIDEView')
);
const MobileSketchView = React.lazy(() =>
  import('./modules/Mobile/MobileSketchView')
);
const MobilePreferences = React.lazy(() =>
  import('./modules/Mobile/MobilePreferences')
);
const FullView = React.lazy(() => import('./modules/IDE/pages/FullView'));
const LoginView = React.lazy(() => import('./modules/User/pages/LoginView'));
const SignupView = React.lazy(() => import('./modules/User/pages/SignupView'));
const ResetPasswordView = React.lazy(() =>
  import('./modules/User/pages/ResetPasswordView')
);
const EmailVerificationView = React.lazy(() =>
  import('./modules/User/pages/EmailVerificationView')
);
const NewPasswordView = React.lazy(() =>
  import('./modules/User/pages/NewPasswordView')
);
const AccountView = React.lazy(() =>
  import('./modules/User/pages/AccountView')
);
const CollectionView = React.lazy(() =>
  import('./modules/User/pages/CollectionView')
);
const DashboardView = React.lazy(() =>
  import('./modules/User/pages/DashboardView')
);
const MobileDashboardView = React.lazy(() =>
  import('./modules/Mobile/MobileDashboardView')
);
const Legal = React.lazy(() => import('./modules/IDE/pages/Legal'));

const checkAuth = (store) => {
  store.dispatch(getUser());
};

// TODO: This short-circuit seems unnecessary - using the mobile <Switch /> navigator (future) should prevent this from being called
const onRouteChange = (store) => {
  const path = window.location.pathname;
  if (path.includes('preview')) return;

  store.dispatch(stopSketch());
};

const routes = (store) => (
  <Route
    path="/"
    component={App}
    onChange={() => {
      onRouteChange(store);
    }}
  >
    <IndexRoute
      onEnter={checkAuth(store)}
      component={mobileFirst(MobileIDEView, IDEView)}
    />

    <Route
      path="/login"
      component={userIsNotAuthenticated(
        mobileFirst(responsiveForm(LoginView), LoginView)
      )}
    />
    <Route
      path="/signup"
      component={userIsNotAuthenticated(
        mobileFirst(responsiveForm(SignupView), SignupView)
      )}
    />
    <Route
      path="/reset-password"
      component={userIsNotAuthenticated(ResetPasswordView)}
    />
    <Route path="/verify" component={EmailVerificationView} />
    <Route
      path="/reset-password/:reset_password_token"
      component={NewPasswordView}
    />
    <Route path="/projects/:project_id" component={IDEView} />
    <Route path="/:username/full/:project_id" component={FullView} />
    <Route path="/full/:project_id" component={FullView} />

    <Route
      path="/:username/assets"
      component={userIsAuthenticated(
        userIsAuthorized(mobileFirst(MobileDashboardView, DashboardView))
      )}
    />
    <Route
      path="/:username/sketches"
      component={mobileFirst(MobileDashboardView, DashboardView)}
    />
    <Route
      path="/:username/sketches/:project_id"
      component={mobileFirst(MobileIDEView, IDEView)}
    />
    <Route
      path="/:username/sketches/:project_id/add-to-collection"
      component={mobileFirst(MobileIDEView, IDEView)}
    />
    <Route
      path="/:username/collections"
      component={mobileFirst(MobileDashboardView, DashboardView)}
    />
    <Route
      path="/:username/collections/:collection_id"
      component={CollectionView}
    />

    <Route
      path="/sketches"
      component={createRedirectWithUsername('/:username/sketches')}
    />
    <Route
      path="/assets"
      component={createRedirectWithUsername('/:username/assets')}
    />
    <Route path="/account" component={userIsAuthenticated(AccountView)} />
    <Route path="/about" component={IDEView} />

    {/* Mobile-only Routes */}
    <Route path="/preview" component={MobileSketchView} />
    <Route path="/preferences" component={MobilePreferences} />
    <Route path="/privacy-policy" component={Legal} />
    <Route path="/terms-of-use" component={Legal} />
    <Route path="/code-of-conduct" component={Legal} />
  </Route>
);

export default routes;
