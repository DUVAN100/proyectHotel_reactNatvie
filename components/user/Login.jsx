import { useState } from 'react';
import { View } from 'react-native';

import axios from "axios";

import { Button, Text, TextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";

import { styleAlert, styleInput, styles } from '../../assets/css/styles';

export const Login = ({ navigation }) => {

  const [error, setError] = useState('');

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: 'amercad',
      password: '123456'
    }
  });

  const onSubmit = async({ username, password }) => {
    setError('');
    try {
      //await axios.get(`http://127.0.0.1:3000/api/users/${username}/${password}`);

      navigation.navigate('Rent');
      
    } catch (error) {
      setError('El username y/o password, incorrecto');
    }

  }

  return (
    <View style={[styles.container]}>
      {
        error !== '' && <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>
      }
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            label="Usuario"
            left={<TextInput.Icon icon='account' />}
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text style={styleAlert.alert}>El username es obligatorio</Text>}
      {errors.username?.type === 'pattern' && <Text style={styleAlert.alert}>El username no permite caracteres especiasles</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            mode='outlined'
            label="Password"
            left={<TextInput.Icon icon='lock' />}
          />
        )}
        name="password"
      />
      {errors.password?.type === 'required' && <Text style={styleAlert.alert}>El password es obligatorio</Text>}
      {errors.password?.type === 'pattern' && <Text style={styleAlert.alert}>El username no permite caracteres especiasles</Text>}

      <Button
        buttonColor='#2b78fd'
        style={{ marginTop: 20, marginBottom: 10 }}
        icon="send" mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        Login
      </Button>

      <Text
        style={{ color: '#0000ffab' }}
        onPress={() => {
          setError('')
          navigation.navigate('Register')
        }}
      >regístrate aquí?</Text>

      <Text
        style={{ color: '#0000ffab', marginTop: 10 }}
        onPress={() => {
          setError('')
          navigation.navigate('NuevoPassword')
        }}
      >Olvidaste la contraseña?</Text>

    </View>
  )
}
