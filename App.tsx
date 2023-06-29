import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Form from './src/view/Form';

function App() {
  const RootStack = createStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            options={{headerShown: false}}
            name="From"
            component={Form}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
