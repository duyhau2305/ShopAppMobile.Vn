import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PROFILE_ROUTES} from '../routes';
import AccountInfo from '../screens/AccountInfo/AccountInfo';
import ChangePassword from '../screens/ChangePassword/ChangePassword';
import UpdateProfile from '../screens/UpdateProfile/UpdateProfile';
import FontSize from '../screens/FontSize/FontSize';
import ConfigWifi from '../screens/ConfigWifi/ConfigWifi';
import InfoConfigWifi from '../screens/ConfigWifi/InfoConfigWifi';
import Product from '../screens/Product/Product';

const Stack = createNativeStackNavigator<any>();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={PROFILE_ROUTES.ACCOUNT_INFO}
        component={AccountInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PROFILE_ROUTES.CHANGE_PASSWORD}
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PROFILE_ROUTES.UPDATE_PROFILE}
        component={UpdateProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PROFILE_ROUTES.FONT_SIZE}
        component={FontSize}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PROFILE_ROUTES.CONFIG_WIFI}
        component={ConfigWifi}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PROFILE_ROUTES.INFO_CONFIG_WIFI}
        component={InfoConfigWifi}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PROFILE_ROUTES.PRODUCT}
        component={Product}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
