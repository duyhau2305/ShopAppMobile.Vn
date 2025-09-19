import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TAKE_OFF_ROUTES} from '../routes';
import AddTakeOff from '../screens/TakeOff/AddTakeOff';

const Stack = createNativeStackNavigator<any>();

const TakeOffStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={TAKE_OFF_ROUTES.ADD_TAKE_OFF}
        component={AddTakeOff}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TakeOffStack;
