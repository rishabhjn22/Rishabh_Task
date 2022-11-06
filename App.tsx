import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Screen1 from './src/view/Screen1';
import Screen2 from './src/view/Screen2';
import Screen3 from './src/view/Screen3';
import {colors} from './src/utils/colors';
import {Provider} from 'react-redux';
import store from './src/redux/store';

function App() {
  const RootStack = createStackNavigator();

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.white} />
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              options={{headerShown: false}}
              name="Screen1"
              component={Screen1}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Screen2"
              component={Screen2}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Screen3"
              component={Screen3}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
