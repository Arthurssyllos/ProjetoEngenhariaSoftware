import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { getTask, deleteTask } from '../services/taskService';

type TaskDetailScreenProps = StackScreenProps<RootStackParamList, 'TaskDetail'>;

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = React.useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    const fetchedTask = await getTask(taskId);
    setTask(fetchedTask);
  };

  const handleDelete = async () => {
    await deleteTask(taskId);
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDelete,
          style: "destructive",
        },
      ],
    );
  };

  if (!task) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Task Details" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text>{task.description}</Text>
        <Button mode="contained" onPress={() => navigation.navigate('TaskForm', { taskId })}>
          Edit
        </Button>
        <Button mode="contained" buttonColor="red" onPress={confirmDelete} style={styles.deleteButton}>
          Delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  deleteButton: {
    marginTop: 10,
  },
});

export default TaskDetailScreen;
