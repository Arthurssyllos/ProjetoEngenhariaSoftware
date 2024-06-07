import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { FAB, Appbar } from 'react-native-paper';
import TaskCard from '../components/TaskCard';
import { getTasks, deleteTask } from '../services/taskService';

interface Task {
  id: number;
  title: string;
  color: string;
  description?: string;
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
    const focusListener = navigation.addListener('focus', fetchTasks);
    return () => navigation.removeListener('focus', focusListener);
  }, [navigation]);

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  const confirmDelete = (id: number) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => handleDelete(id),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Task Manager" />
      </Appbar.Header>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            color={item.color}
            onEdit={() => navigation.navigate('TaskForm', { taskId: item.id })}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
            onLongPress={() => confirmDelete(item.id)}
          />
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('TaskForm')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
