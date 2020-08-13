import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loading;
