import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/types/task';
import { TaskProvider } from './src/context/TaskContext';
import { TaskListScreen } from './src/screens/TaskListScreen';
import { TaskFormScreen } from './src/screens/TaskFormScreen';
import { TaskDetailScreen } from './src/screens/TaskDetailScreen';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TaskList"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTintColor: colors.primary,
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 18,
                color: colors.textPrimary,
              },
              headerShadowVisible: true,
              contentStyle: {
                backgroundColor: colors.background,
              },
            }}
          >
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{
                title: 'Kế hoạch sinh viên',
              }}
            />
            <Stack.Screen
              name="TaskForm"
              component={TaskFormScreen}
              options={({ route }) => ({
                title: route.params?.task ? 'Sửa công việc' : 'Thêm công việc',
              })}
            />
            <Stack.Screen
              name="TaskDetail"
              component={TaskDetailScreen}
              options={{
                title: 'Chi tiết công việc',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </SafeAreaProvider>
  );
}

export default App;
