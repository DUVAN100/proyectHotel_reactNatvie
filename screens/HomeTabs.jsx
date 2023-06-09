import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Login } from '../components/user/Login';
import { Home } from '../components/home/Home'
import { ListBooking } from '../components/listBooking/ListBooking'
import { Room } from '../components/room/Room';
import { Booking } from '../components/booking/Booking';

const Tab = createBottomTabNavigator();
export const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Logout'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#2b78fd',
        tabBarInactiveTintColor: 'white',
        tabBarInactiveBackgroundColor: '#2b78fdc9'
      }}
    >
      

      <Tab.Screen name="Room" component={Room}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bed" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen name="Booking" component={Booking}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="timeline" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen name="ListBooking" component={ListBooking}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="format-list-bulleted" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen name="Logout" component={Home}
        options={{
          tabBarStyle:{display:'none'},
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="logout" size={24} color={color} />
          )
        }}
      />
{/* 
      <Tab.Screen name="Room" component={Login} options={{
        tabBarStyle: { display: 'none' },
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="Room" color={color} size={24} />
        )
      }}
      /> */}


    </Tab.Navigator>
  );
}