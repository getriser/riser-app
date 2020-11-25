import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { AnnouncementsParams, FilesParams, MembersParams } from './types';
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
import colors from './styles/colors';
import TabBarIcon from './components/TabBarIcon';
import CreateAnnouncement from './components/screens/CreateAnnouncement';
import FilesIndex from './components/screens/FilesIndex';
import CreateFolder from './components/screens/CreateFolder';
import FolderDetail from './components/screens/FolderDetail';
import UpdateFolder from './components/screens/UpdateFolder';
import UpdateFile from './components/screens/UpdateFile';

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

      <AnnouncementsStack.Screen
        name="CreateAnnouncement"
        component={CreateAnnouncement}
        options={{ ...modalTransitionPreset }}
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

const FilesStack = createStackNavigator<FilesParams>();

function FilesStackScreen() {
  return (
    <FilesStack.Navigator screenOptions={{ headerShown: false }}>
      <FilesStack.Screen name={'FilesIndex'} component={FilesIndex} />
      <FilesStack.Screen name={'FolderDetail'} component={FolderDetail} />
      <FilesStack.Screen
        name={'CreateFolder'}
        component={CreateFolder}
        options={{ ...modalTransitionPreset }}
      />

      <FilesStack.Screen
        name={'UpdateFolder'}
        component={UpdateFolder}
        options={{ ...modalTransitionPreset }}
      />

      <FilesStack.Screen
        name={'UpdateFile'}
        component={UpdateFile}
        options={{ ...modalTransitionPreset }}
      />
    </FilesStack.Navigator>
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
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.white,
            inactiveTintColor: colors.subtitleGray,
            style: {
              backgroundColor: colors.headerBlack,
            },
          }}>
          <Tab.Screen
            name="Announcements"
            component={AnnouncementsStackScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarIcon icon={'send'} focused={focused} />
              ),
            }}
          />

          <Tab.Screen
            name="Files"
            component={FilesStackScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarIcon icon={'file'} focused={focused} />
              ),
            }}
          />

          <Tab.Screen
            name="Members"
            component={MembersStackScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarIcon icon={'smile'} focused={focused} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default EntryPoint;
