import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAuthThunk } from 'redux/registerReducers/registerThunks';

import {
  selectIsLogin,
  selectToken,
} from 'redux/registerReducers/registerSelector';
import UserRoutes from './UserRoutes';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const token = useSelector(selectToken);

  window.onbeforeunload = function () {
    sessionStorage.setItem('currentPath', window.location.pathname);
  };

  useEffect(() => {
    if (!isLogin && token) {
      dispatch(refreshAuthThunk());
    }
  }, [dispatch, isLogin, token]);

  return <UserRoutes />;
}

export default App;
