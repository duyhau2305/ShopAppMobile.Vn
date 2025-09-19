import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BOTTOM_TAB_ROUTES} from '../routes';
import {StyleSheet} from 'react-native';
import {FONT_FAMILY} from '../themes/fontFamily';
import Home from '../screens/Home/Home';
import {
  IconHome,
  IconHomeActive,
  IconProfile,
  IconProfileActive,
  IconTakeOff,
  IconTakeOffActive,
  IconWorksheet,
  IconWorksheetActive,
} from '../components/Icons';
import Profile from '../screens/Profile/Profile';
import Worksheet from '../screens/Worksheet/Worksheet';
import TakeOff from '../screens/TakeOff/TakeOff';
import {useAppSelector} from '../redux/hooks';

const Tab = createBottomTabNavigator<any>();
const TabNavigator = () => {
  const {role, employee} = useAppSelector(state => state.auth);
  return (
    //scrollable tab bar
    <Tab.Navigator
      initialRouteName={BOTTOM_TAB_ROUTES.HOME}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.TabBarStyle,
        lazy: true,
        tabBarLabelStyle: styles.TabBarLabelStyle,
        tabBarActiveTintColor: '#1354D4',
        tabBarInactiveTintColor: '#52585f',
                  
        tabBarItemStyle: {
          width: '100%',
        },
      }}>
      <Tab.Screen
        name={BOTTOM_TAB_ROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <IconHomeActive /> : <IconHome />,
        }}
      />
      {employee?.employee_role_id !== 2 && (
        <Tab.Screen
          name={BOTTOM_TAB_ROUTES.SELL}
          component={Worksheet}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <IconWorksheetActive /> : <IconWorksheet />,
          }}
        />
      )}
      {role?.role_id !== 1 && (
        <Tab.Screen
          name={BOTTOM_TAB_ROUTES.INVOICE}
          component={TakeOff}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <IconTakeOffActive /> : <IconTakeOff />,
          }}
        />
      )}
      <Tab.Screen
        name={BOTTOM_TAB_ROUTES.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <IconProfileActive /> : <IconProfile />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  TabBarStyle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 12,
  },
  TabBarLabelStyle: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.Inter_SemiBold,
  },
});
