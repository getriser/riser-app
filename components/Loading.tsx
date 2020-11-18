import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>{text}</Text>
      </View>
    </View>
  );
};

export default Loading;
