import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import TaskForm from '../components/TaskForm';
import { addTask, updateTask, getTask } from '../services/taskService';
import { RootStackParamList } from '../types/types';

type TaskFormScreenProps = StackScreenProps<RootStackParamList, 'TaskForm'>;

const TaskFormScreen: React.FC<TaskFormScreenProps> = ({ route, navigation }) => {
  const { taskId } = route.params ?? {};
  const [task, setTask] = useState<{ title: string; description: string; color: string } | null>(null);

  useEffect(() => {
    if (taskId !== undefined) { // Verifica se taskId é diferente de undefined antes de fazer a chamada
      fetchTask();
    }
  }, [taskId]);

  const fetchTask = async () => {
    const fetchedTask = await getTask(taskId!); // Usa '!' para afirmar que taskId não é undefined
    setTask(fetchedTask);
  };

  const handleSubmit = async (title: string, description: string, color: string) => {
    if (taskId !== undefined) {
      await updateTask(taskId, { title, description, color });
    } else {
      await addTask({ title, description, color });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TaskForm
        onSubmit={handleSubmit}
        initialTitle={task?.title}
        initialDescription={task?.description}
        initialColor={task?.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default TaskFormScreen;
