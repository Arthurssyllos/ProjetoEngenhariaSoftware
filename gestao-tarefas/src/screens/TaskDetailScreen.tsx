// src/screens/TaskFormDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TaskFormDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId, tasks, setTasks } = route.params as { taskId: string, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> };
  
  const task = tasks.find(t => t.id === taskId);
  const [editedTask, setEditedTask] = useState(task ? task.title : '');

  if (!task) return <Text>Tarefa não encontrada!</Text>;

  // Atualiza a tarefa
  const updateTask = () => {
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, title: editedTask } : t
    );
    setTasks(updatedTasks);
    navigation.goBack();
  };

  // Deleta a tarefa
  const deleteTask = () => {
    Alert.alert(
      'Confirmar Deleção',
      'Tem certeza que deseja deletar esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: () => {
            const updatedTasks = tasks.filter(t => t.id !== taskId);
            setTasks(updatedTasks);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Marca a tarefa como concluída
  const toggleComplete = () => {
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarefa</Text>
      
      <TextInput
        label="Nome da tarefa"
        value={editedTask}
        onChangeText={setEditedTask}
        style={styles.input}
      />
      
      <Button mode="contained" onPress={updateTask} style={styles.button}>
        Atualizar Tarefa
      </Button>

      <Button mode="outlined" onPress={toggleComplete} style={styles.button}>
        {task.completed ? 'Marcar como Não Concluído' : 'Marcar como Concluído'}
      </Button>

      <Button mode="outlined" onPress={deleteTask} style={styles.deleteButton}>
        Deletar Tarefa
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#ff3b30',
  },
});

export default TaskFormDetailScreen;
