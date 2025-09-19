import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME_ROUTES} from '../routes';
import Notification from '../screens/Notification/Notification';

import ScanQR from '../screens/ScanQR/ScanQR';
import InfoNotification from '../screens/Notification/InfoNotification';

import Collaborator from '../screens/ Collaborator/ Collaborator';

import InfoCollaborator from '../screens/ Collaborator/InfoCollaborator';
import Request from '../screens/Request/Request';
import NotificationFile from '../screens/Notification/NotificationFile';


const Stack = createNativeStackNavigator<any>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={HOME_ROUTES.NOTIFICATION}
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={HOME_ROUTES.NOTIFICATION_FILE}
        component={NotificationFile}
        options={{
          headerShown: false,
        }}
      />
   
      <Stack.Screen
        name={HOME_ROUTES.SCAN_QR}
        component={ScanQR}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={HOME_ROUTES.INFO_NOTIFICATION}
        component={InfoNotification}
        options={{
          headerShown: false,
        }}
      />     
  
    
      <Stack.Screen
        name={HOME_ROUTES.COLLABORATOR}
        component={Collaborator}
        options={{
          headerShown: false,
        }}
      />
   
      <Stack.Screen
        name={HOME_ROUTES.INFO_COLLABORATOR}
        component={InfoCollaborator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={HOME_ROUTES.REQUEST}
        component={Request}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
