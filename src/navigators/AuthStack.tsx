import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AUTH_ROUTES} from '../routes';
import Login from '../screens/Login/Login';


const Stack = createNativeStackNavigator<any>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={AUTH_ROUTES.LOGIN}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
 
     
    </Stack.Navigator>
  );
};

export default AuthStack;
