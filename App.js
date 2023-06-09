import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register } from './components/user/Register';
import { HomeTabs } from './screens/HomeTabs';
import { NuevoPassword } from './components/user/NuevoPassword';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer
    >
      <Stack.Navigator
        screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Optiones' }} />
        <Stack.Screen name="Home" component={Register} options={{ title: 'Home' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Login' }} />
        <Stack.Screen name="NuevoPassword" component={NuevoPassword} options={{ title: 'Login' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
