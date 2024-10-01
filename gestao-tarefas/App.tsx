// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import WelcomeScreen from './src/screens/WelcomeScreen'; // Tela de boas-vindas
import HomeScreen from './src/screens/HomeScreen'; // Tela principal
import TaskDetailScreen from './src/screens/TaskDetailScreen'; // Detalhes da tarefa
import TaskFormScreen from './src/screens/TaskFormScreen'; // Formulário da tarefa
import { initDB } from './src/services/taskService'; // Inicialização do banco de dados

// Define a lista de parâmetros para as telas
type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  TaskDetail: { taskId: number };
  TaskForm: { taskId?: number };
};

// Criação do stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  // Hook para inicializar o banco de dados quando o aplicativo é iniciado
  useEffect(() => {
    const initializeDatabase = async () => {
      await initDB(); // Chama a função de inicialização do banco de dados
    };
    initializeDatabase();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }} // Remove a App Bar da tela de boas-vindas
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Minhas Tarefas' }} 
          />
          <Stack.Screen 
            name="TaskDetail" 
            component={TaskDetailScreen} 
            options={{ title: 'Detalhes da Tarefa' }} 
          />
          <Stack.Screen 
            name="TaskForm" 
            component={TaskFormScreen} 
            options={{ title: 'Formulário da Tarefa' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
