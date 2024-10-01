// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <ImageBackground 
      source={{ uri: 'https://img.freepik.com/fotos-gratis/fundo-de-papel-de-parede-artistico-borrado-e-colorido_58702-8607.jpg' }} // Substitua pela URL da sua imagem
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao Aplicativo!</Text>
        <Text style={styles.subtitle}>Gerencie suas tarefas de forma eficiente</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          Continuar
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%', // Definindo uma largura para o card
    maxWidth: 400, // Largura máxima para o card
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo semitransparente para melhor contraste
    padding: 20,
    borderRadius: 20, // Aumentando o arredondamento das bordas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Sombra para Android
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});

export default WelcomeScreen;
