import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { AnnouncementsParams, MembersParams } from './types';
import AnnouncementsIndex from './components/screens/AnnouncementsIndex';
import AnnouncementsDetail from './components/screens/AnnouncementsDetail';
import MembersIndex from './components/screens/MembersIndex';
import MembersDetail from './components/screens/MembersDetail';
import AddMember from './components/screens/AddMember';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import ChooseOrganization from './components/screens/ChooseOrganization';

interface EntryPointProps {}

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

const ChooseOrganizationStack = createStackNavigator<any>();

const EntryPoint: React.FC<EntryPointProps> = ({}) => {
  const {
    user: { token },
    organizations: { currentOrganization },
  } = useSelector((state: RootState) => state);

  return (
    <NavigationContainer>
      {!token && (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name={'Login'} component={Login} />
        </AuthStack.Navigator>
      )}

      {token && !currentOrganization && (
        <ChooseOrganizationStack.Navigator
          screenOptions={{ headerShown: false }}>
          <ChooseOrganizationStack.Screen
            name={'ChooseOrganization'}
            component={ChooseOrganization}
          />
        </ChooseOrganizationStack.Navigator>
      )}

      {token && currentOrganization && (
        <Tab.Navigator>
          <Tab.Screen
            name="Announcements"
            component={AnnouncementsStackScreen}
          />
          <Tab.Screen name="Members" component={MembersStackScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default EntryPoint;
