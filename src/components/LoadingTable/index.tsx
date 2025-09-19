import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import stylesComponent from '../../themes/styComponents';

const LoadingTable = () => {
  return (
    <View style={stylesComponent.Loading}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingTable;
