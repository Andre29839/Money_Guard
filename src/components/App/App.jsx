import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAuthThunk } from 'redux/registerReducers/registerThunks';

import {
  selectIsLogin,
  selectToken,
} from 'redux/registerReducers/registerSelector';
import UserRoutes from './UserRoutes';
import Loader from 'components/Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const token = useSelector(selectToken);
  const [isLoading, setIsLoading] = useState(true);

  window.onbeforeunload = function () {
    localStorage.setItem('currentPath', window.location.pathname);
  };

  useEffect(() => {
    if (!isLogin && token) {
      dispatch(refreshAuthThunk());
    }
    setIsLoading(false);
  }, [dispatch, isLogin, token]);

  if (isLoading) {
    return <Loader />;
  }

  return <UserRoutes />;
}

export default App;
