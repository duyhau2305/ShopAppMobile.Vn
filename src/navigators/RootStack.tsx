import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ROOT_ROUTES } from '../routes';
import AuthStack from './AuthStack';
import { useAppSelector } from '../redux/hooks';
import TabNavigator from './TabNavigator';
import ProfileStack from './ProfileStack';
import WorksheetStack from './WorksheetStack';
import TakeOffStack from './TakeOffStack';
import HomeStack from './HomeStack';
const Stack = createNativeStackNavigator<any>();

const RootStack = () => {
  const { access_token } = useAppSelector(state => state.auth);
  return (
    <Stack.Navigator 
      key={access_token ? 'authenticated' : 'unauthenticated'}
      screenOptions={{ headerShown: false }}
    >
      {access_token ? (
        <>
          <Stack.Screen
            name={ROOT_ROUTES.BOTTOM_TAB_STACK}
            component={TabNavigator}
          />
          <Stack.Screen name={ROOT_ROUTES.HOME_STACK} component={HomeStack} />
          <Stack.Screen
            name={ROOT_ROUTES.TAKE_OFF_STACK}
            component={TakeOffStack}
          />
          <Stack.Screen
            name={ROOT_ROUTES.WORKSHEET_STACK}
            component={WorksheetStack}
          />
          <Stack.Screen
            name={ROOT_ROUTES.PROFILE_STACK}
            component={ProfileStack}
          />
        </>
      ) : (
        <Stack.Screen name={ROOT_ROUTES.AUTH_STACK} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
