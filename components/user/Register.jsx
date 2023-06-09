import { View } from 'react-native';

import axios from "axios";

import { Button, Text, TextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";

import { styleAlert, styleInput, styles } from '../../assets/css/styles';
import { useState } from 'react';

export const Register = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorRole, setErrorRole] = useState('');

  const limpiarCamposErrores = () => {
    setErrorUsername('');
    setErrorName('');
    setErrorPassword('');
    setErrorRole('');
  }

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: 'amercad',
      name: 'Andrés',
      password: '123456',
      role: 'ADMIN_ROLE'
    }
  });

  const onSubmit = async ({ username, password, name, role }) => {
    limpiarCamposErrores();
    try {
      await axios.post(`http://127.0.0.1:3000/api/users`, {
        name,
        username,
        password,
        role
      });
      setMessage('Cliente guardado correctamente');
            setTimeout(() => {
              setMessage('');
            }, 3000);
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
          const element = errors[key];
          switch (element.path) {
            case 'username':
              setErrorUsername(element.msg);
              break;
            case 'password':
              setErrorPassword(element.msg);
              break;
            case 'name':
              setErrorName(element.msg);
              break;
            case 'role':
              setErrorRole(element.msg);
              break;
          }
        }
      }

    }

  }

  return (
    <View style={styles.container}>
      {
        message !== '' && <Text style={{ color: 'blue', marginBottom: 20, fontSize: 20 }}>{message}</Text>
      }
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            label="Name"
            left={<TextInput.Icon icon='account-circle' />}
          />
        )}
        name="name"
      />
      {errors.name?.type === 'required' && <Text style={styleAlert.alert}>El name es obligatorio</Text>}
      {errors.name?.type === 'pattern' && <Text style={styleAlert.alert}>El name no permite caracteres especiasles</Text>}
      { errorName !== '' && <Text style={styleAlert.alert}>{errorName}</Text>}

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
      { errorUsername !== '' && <Text style={styleAlert.alert}>{errorUsername}</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ_\s]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styleInput.widthInput}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            mode='outlined'
            label="Role"
            left={<TextInput.Icon icon='account' />}
          />
        )}
        name="role"
      />
      {errors.role?.type === 'required' && <Text style={styleAlert.alert}>El role es obligatorio</Text>}
      {errors.role?.type === 'pattern' && <Text style={styleAlert.alert}>El role no permite caracteres especiasles</Text>}
      { errorRole !== '' && <Text style={styleAlert.alert}>{errorRole}</Text>}

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
      { errorPassword !== '' && <Text style={styleAlert.alert}>{errorPassword}</Text>}

      <View
        style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 20, margin: 20, justifyContent: 'space-evenly', width: '80%' }}
      >
        <Button
          icon="content-save" mode="contained"
          buttonColor='#2b78fd'
          onPress={handleSubmit(onSubmit)}
        >
          Registrar
        </Button>
        <Button
          buttonColor='#dc3545'
          icon="keyboard-return" mode="contained"
          onPress={() => navigation.navigate('Logout')}
        >
          Volver
        </Button>
      </View>


    </View>
  )
}
