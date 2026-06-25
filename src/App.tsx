import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {useAppSelector} from './redux/hooks';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from './screens/SplashScreen';
import {selectIsLoading, selectIsAuthenticated} from './redux/slices/authSlice';

const RootNavigator = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
