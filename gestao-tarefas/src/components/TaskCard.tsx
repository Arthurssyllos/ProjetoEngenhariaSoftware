// src/components/TaskCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Task } from '../services/taskModel';

interface TaskCardProps {
  task: Task;
  onDelete: () => Promise<void>;
  onToggleComplete: () => Promise<void>;
  onEdit: () => void; // Adiciona a função onEdit para edição da tarefa
  onPress: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onToggleComplete, onEdit, onPress }) => {
  const [showDelete, setShowDelete] = React.useState(false);

  const handleLongPress = () => {
    setShowDelete(true);
  };

  const handleDelete = async () => {
    await onDelete();
    setShowDelete(false);
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      onLongPress={handleLongPress} 
      style={[styles.card, { backgroundColor: task.color }]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.priority}>Prioridade: {task.priority}</Text>
        <Text style={styles.status}>Status: {task.status}</Text>
        
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={onToggleComplete} style={styles.button}>
            Marcar concluído
          </Button>
          <Button mode="outlined" onPress={onEdit} style={styles.button}>
            Editar
          </Button>
        </View>
      </View>

      {showDelete && (
        <TouchableOpacity onPress={handleDelete} style={styles.deleteOverlay}>
          <Text style={styles.deleteText}>Deletar Tarefa</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  priority: {
    fontSize: 14,
    color: '#555',
  },
  status: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  deleteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 8,
  },
  deleteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskCard;
