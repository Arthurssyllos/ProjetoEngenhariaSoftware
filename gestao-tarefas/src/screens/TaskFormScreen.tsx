import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Menu, Divider } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { addTask, updateTask, getTask } from '../services/taskService';
import { Task } from '../services/taskModel';

type TaskFormScreenProps = StackScreenProps<RootStackParamList, 'TaskForm'>;

const TaskFormScreen: React.FC<TaskFormScreenProps> = ({ route, navigation }) => {
  const { taskId } = route.params || {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'a fazer' | 'em andamento' | 'concluída'>('a fazer');
  const [priority, setPriority] = useState<'baixa' | 'média' | 'alta'>('baixa');
  const [statusVisible, setStatusVisible] = useState(false);
  const [priorityVisible, setPriorityVisible] = useState(false);

  useEffect(() => {
    if (taskId) fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    const task = await getTask(taskId!);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status as 'a fazer' | 'em andamento' | 'concluída');
      setPriority(task.priority as 'baixa' | 'média' | 'alta');
    }
  };

  const handleSubmit = async () => {
    if (!title) {
      alert('O título da tarefa é obrigatório!');
      return;
    }

    const taskData: Task = {
      title,
      description,
      status,
      priority,
      color: '#ffffff', // Define uma cor padrão ou ajuste conforme necessário
    };

    if (taskId) {
      await updateTask(taskId, taskData);
    } else {
      await addTask(taskData);
    }
    navigation.goBack();
  };

  const renderMenu = (type: 'status' | 'priority') => (
    <Menu
      visible={type === 'status' ? statusVisible : priorityVisible}
      onDismiss={() => (type === 'status' ? setStatusVisible(false) : setPriorityVisible(false))}
      anchor={<TouchableOpacity />}
    >
      {type === 'status' ? (
        <>
          <Menu.Item onPress={() => { setStatus('a fazer'); setStatusVisible(false); }} title="A Fazer" />
          <Divider />
          <Menu.Item onPress={() => { setStatus('em andamento'); setStatusVisible(false); }} title="Em Andamento" />
          <Divider />
          <Menu.Item onPress={() => { setStatus('concluída'); setStatusVisible(false); }} title="Concluída" />
        </>
      ) : (
        <>
          <Menu.Item onPress={() => { setPriority('baixa'); setPriorityVisible(false); }} title="Baixa" />
          <Divider />
          <Menu.Item onPress={() => { setPriority('média'); setPriorityVisible(false); }} title="Média" />
          <Divider />
          <Menu.Item onPress={() => { setPriority('alta'); setPriorityVisible(false); }} title="Alta" />
        </>
      )}
    </Menu>
  );

  return (
    <View style={styles.container}>
      <TextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        mode="outlined"
      />
      <TouchableOpacity onPress={() => setStatusVisible(true)}>
        <TextInput
          label="Status"
          value={status}
          style={styles.input}
          mode="outlined"
          editable={false}
        />
      </TouchableOpacity>
      {renderMenu('status')}

      <TouchableOpacity onPress={() => setPriorityVisible(true)}>
        <TextInput
          label="Prioridade"
          value={priority}
          style={styles.input}
          mode="outlined"
          editable={false}
        />
      </TouchableOpacity>
      {renderMenu('priority')}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {taskId ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  input: { marginBottom: 20 },
  button: { marginTop: 20, backgroundColor: '#6200ee' },
});

export default TaskFormScreen;
