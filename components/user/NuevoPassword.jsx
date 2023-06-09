import { View } from 'react-native';

import axios from "axios";

import { Button, Text, TextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";

import { styleAlert, styleInput, styles } from '../../assets/css/styles';
import { useState } from 'react';

export const NuevoPassword = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const limpiarCamposErrores = () => {
        setErrorPassword('');
        setError('');
    }

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            username: 'amercad',
            password: '123456',
            password2: '123456',
        }
    });

    const onSubmit = async ({ username, password, password2 }) => {
        limpiarCamposErrores();
        try {

            if (password !== password2) {
                setError('Las contraseña no coinciden, por favor intente nuevamente');
                return;
            }

            setErrorUsername('');
            await axios.patch(`http://localhost:3000/api/users`, {
                username,
                password
            });
            setMessage('La contraseña se actualizo correctamente');
            setTimeout(() => {
                setMessage('');
            }, 3000);

            //  
        } catch (error) {
            if (error.response.data.msg === 'El username no es válido') {
                setErrorUsername(error.response.data.msg);
              }


              console.log(error.response.data);
              const errors = error.response.data.errors;
              for (const key in errors) {
                if (Object.hasOwnProperty.call(errors, key)) {
                  const element = errors[key];
                  switch (element.path) {
                    case 'password':
                      setErrorPassword(element.msg);
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
            {
                error !== '' && <Text style={{ color: 'red', marginBottom: 20, fontSize: 20 }}>{error}</Text>
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
            { errorUsername !== '' && <Text style={styleAlert.alert}>{errorUsername}</Text>}

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
                name="password2"
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
                    Iniciar Sesión
                </Button>
            </View>


        </View>
    )
}
