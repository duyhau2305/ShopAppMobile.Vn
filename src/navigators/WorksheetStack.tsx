import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WORKSHEET_ROUTES } from '../routes';
import TableSalary from '../screens/TableSalary/TableSalary';
import DetailMonthSalary from '../screens/DetailMonthSalary/DetailMonthSalary';

const Stack = createNativeStackNavigator<any>();

const WorksheetStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={WORKSHEET_ROUTES.TABLE_SALARY}
        component={TableSalary}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={WORKSHEET_ROUTES.DETAIL_MONTH_SALARY}
        component={DetailMonthSalary}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default WorksheetStack;
