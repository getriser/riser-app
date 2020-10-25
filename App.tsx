import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnnouncementsIndex from './components/screens/AnnouncementsIndex';
import AnnouncementsDetail from './components/screens/AnnouncementsDetail';
import { AnnouncementsParams, MembersParams } from './types';
import { Provider } from 'react-redux';
import store from './redux/store';
import MembersIndex from './components/screens/MembersIndex';
import MembersDetail from './components/screens/MembersDetail';
import AddMember from './components/screens/AddMember';
import { Platform } from 'react-native';
import { useState } from 'react';
import Login from './components/screens/Login';

const modalTransitionPreset =
  Platform.OS === 'ios'
    ? {
        ...TransitionPresets.ModalPresentationIOS,
      }
    : { ...TransitionPresets.RevealFromBottomAndroid };

const AnnouncementsStack = createStackNavigator<AnnouncementsParams>();

function AnnouncementsStackScreen() {
  return (
    <AnnouncementsStack.Navigator screenOptions={{ headerShown: false }}>
      <AnnouncementsStack.Screen
        name="AnnouncementsIndex"
        component={AnnouncementsIndex}
      />
      <AnnouncementsStack.Screen
        name="AnnouncementsDetail"
        component={AnnouncementsDetail}
      />
    </AnnouncementsStack.Navigator>
  );
}

const MembersStack = createStackNavigator<MembersParams>();

function MembersStackScreen() {
  return (
    <MembersStack.Navigator screenOptions={{ headerShown: false }}>
      <MembersStack.Screen name={'MembersIndex'} component={MembersIndex} />
      <MembersStack.Screen name={'MembersDetail'} component={MembersDetail} />
      <MembersStack.Screen
        name={'AddMember'}
        component={AddMember}
        options={{ ...modalTransitionPreset }}
      />
    </MembersStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator<any>();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {!isLoggedIn && (
          <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name={'Login'} component={Login} />
          </AuthStack.Navigator>
        )}

        {isLoggedIn && (
          <Tab.Navigator>
            <Tab.Screen
              name="Announcements"
              component={AnnouncementsStackScreen}
            />
            <Tab.Screen name="Members" component={MembersStackScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}
