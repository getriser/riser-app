import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnnouncementsIndex from './components/screens/AnnouncementsIndex';
import AnnouncementsDetail from './components/screens/AnnouncementsDetail';
import { AnnouncementsParams } from './types';
import { Provider } from 'react-redux';
import store from './redux/store';
import colors from './styles/colors';

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const AnnouncementsStack = createStackNavigator<AnnouncementsParams>();

function AnnouncementsStackScreen() {
  return (
    <AnnouncementsStack.Navigator>
      <AnnouncementsStack.Screen
        name="AnnouncementsIndex"
        component={AnnouncementsIndex}
        options={{
          headerShown: false,
        }}
      />
      <AnnouncementsStack.Screen
        name="AnnouncementsDetail"
        component={AnnouncementsDetail}
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerTruncatedBackTitle: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: colors.primary,
            borderBottomColor: colors.primary,
            borderBottomWidth: 0,
          },
        }}
      />
    </AnnouncementsStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Announcements"
            component={AnnouncementsStackScreen}
          />
          <Tab.Screen name="Settings" component={SettingsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
