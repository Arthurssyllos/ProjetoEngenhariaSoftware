import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Task } from '../services/taskModel';
import { addTask, updateTask } from '../services/taskService';

const TaskForm: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [status, setStatus] = useState<'a fazer' | 'em andamento' | 'concluída'>('a fazer');
  const [priority, setPriority] = useState<'alta' | 'média' | 'baixa'>('média');

  useEffect(() => {
    if (route.params?.taskId) {
      const { task } = route.params;
      setTitle(task.title);
      setDescription(task.description);
      setColor(task.color);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const taskData: Task = {
      title,
      description,
      color,
      status,
      priority,
    };

    try {
      if (route.params?.taskId) {
        await updateTask(route.params.taskId, taskData); // Atualiza a tarefa se taskId estiver presente
        Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
      } else {
        await addTask(taskData); // Adiciona uma nova tarefa se taskId não estiver presente
        Alert.alert('Sucesso', 'Tarefa adicionada com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Cor"
        value={color}
        onChangeText={setColor}
        style={styles.input}
      />
      <TextInput
        placeholder="Status (a fazer, em andamento, concluída)"
        value={status}
        onChangeText={(text) => {
          if (['a fazer', 'em andamento', 'concluída'].includes(text)) {
            setStatus(text as 'a fazer' | 'em andamento' | 'concluída');
          } else {
            Alert.alert('Erro', 'Status inválido. Escolha entre "a fazer", "em andamento" ou "concluída".');
          }
        }}
        style={styles.input}
      />
      <TextInput
        placeholder="Prioridade (alta, média, baixa)"
        value={priority}
        onChangeText={(text) => {
          if (['alta', 'média', 'baixa'].includes(text)) {
            setPriority(text as 'alta' | 'média' | 'baixa');
          } else {
            Alert.alert('Erro', 'Prioridade inválida. Escolha entre "alta", "média" ou "baixa".');
          }
        }}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {route.params?.taskId ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default TaskForm;
