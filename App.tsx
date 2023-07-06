// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import AddNotification from './src/screen/AddTask';
import AddTask from './src/screen/AddTask';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}  >
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShadowVisible:false}}/>
        <Stack.Screen name="add" component={AddTask}options={{headerShadowVisible:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;