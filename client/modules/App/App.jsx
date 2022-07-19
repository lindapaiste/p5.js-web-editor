import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getConfig from '../../utils/getConfig';
import DevTools from './components/DevTools';
import { setPreviousPath } from '../IDE/actions/ide';
import { setLanguage } from '../IDE/actions/preferences';
import CookieConsent from '../User/components/CookieConsent';

function hideCookieConsent(pathname) {
  if (pathname.includes('/full/') || pathname.includes('/embed/')) {
    return true;
  }
  return false;
}

const App = ({ children, location }) => {
  const [isMounted, setIsMounted] = useState(false);

  const theme = useSelector((state) => state.preferences.theme || 'light');

  const language = useSelector((state) => state.preferences.language);

  const dispatch = useDispatch();

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const shouldSkipRemembering =
      location.state && location.state.skipSavingPath === true;

    if (isMounted && !shouldSkipRemembering) {
      dispatch(setPreviousPath(location.pathname));
    }
  }, [location]);

  // TODO: `language` comes from redux, so why does it need to be sent back to Redux? - Linda 7/18/2022
  useEffect(() => {
    dispatch(setLanguage(language, { persistPreference: false }));
  }, [language]);

  return (
    <div className="app">
      <CookieConsent hide={hideCookieConsent(location.pathname)} />
      {isMounted &&
        !window.devToolsExtension &&
        getConfig('NODE_ENV') === 'development' && <DevTools />}
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      skipSavingPath: PropTypes.bool
    })
  }).isRequired
};

App.defaultProps = {
  children: null
};

export default App;
