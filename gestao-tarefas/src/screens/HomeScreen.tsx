// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import TaskCard from '../components/TaskCard';
import { getTasks, deleteTask, updateTask } from '../services/taskService';
import { Task } from '../services/taskModel';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    const focusListener = navigation.addListener('focus', fetchTasks);
    return focusListener;
  }, [navigation]);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      Alert.alert("Sucesso", "Tarefa deletada com sucesso!");
      fetchTasks(); // Atualiza a lista após a exclusão
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a tarefa.");
    }
  };

  const handleToggleComplete = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = {
        ...task,
        status: task.status === 'concluída' ? 'a fazer' : 'concluída' as 'a fazer' | 'em andamento' | 'concluída' // Garantindo que o tipo seja correto
      };
      await updateTask(taskId, updatedTask);
      fetchTasks(); // Atualiza a lista após a atualização
    }
  };

  const handleEdit = (taskId: number) => {
    navigation.navigate('TaskForm', { taskId }); // Navega para a tela de edição
  };

  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
      if (a.priority === b.priority) return 0;
      return a.priority === 'alta' ? -1 : 1; // Exemplo de lógica de ordenação
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
      ) : (
        <FlatList
          data={sortTasks(tasks)}
          keyExtractor={(item) => item.id ? item.id.toString() : '0'} // Converte para string, ou retorna um id padrão
          renderItem={({ item }) => (
            <TaskCard 
              task={item} 
              onDelete={() => handleDelete(item.id ?? 0)} // Garante que id não seja undefined
              onToggleComplete={() => handleToggleComplete(item.id ?? 0)}
              onEdit={() => handleEdit(item.id ?? 0)} // Passa a função de edição
              onPress={() => navigation.navigate('TaskDetail', { taskId: item.id ?? 0 })} // Garante que id não seja undefined
            />
          )}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('TaskForm')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center' },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
  emptyText: { textAlign: 'center', marginTop: 20 },
});

export default HomeScreen;
