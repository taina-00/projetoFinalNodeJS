import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, Pressable, Image } from 'react-native';
import logo from '../ProjetoCEP/assets/local.png';
import axios from 'axios';

export default function App() {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  const buscarEndereco = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado');
      } else {
        setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar CEP');
    }
  };

  const limparUsuario = () => {
    setNome('');
    setCep('');
    setEndereco('');
    setIdade('');
    setCpf('');
  };

  const handleSubmit = async () => {
    if (!cpf || !nome || !idade || !cep || !endereco) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    try {
      const response = await axios.post('http://26.215.35.92:3000/users', {
        cpf, nome, idade, cep, endereco
      });
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
      limparUsuario();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar usuário');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.title}>Cadastro CEP</Text>

      <Text style={styles.label}>Nome: </Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.label}>CPF: </Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
      />
      <Text style={styles.label}>Idade: </Text>
      <TextInput
        style={styles.input}
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <Text style={styles.label}>CEP: </Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={(text) => {
          setCep(text);
          if (text.length === 8) {
            buscarEndereco(text);
          }
        }}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Endereço: </Text>
      <TextInput
        style={styles.input}
        value={endereco}
        editable={false}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#F0F8FF',  
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6347',  
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#32CD32',  
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFD700', 
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 15,
    color: '#4682B4',  
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A2BE2',  
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
