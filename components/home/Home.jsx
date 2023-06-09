import React from 'react'
import { styles } from '../../assets/css/styles'
import { StyleSheet, Text, View,ImageBackground } from "react-native";
import { TextInput, Button,  } from "react-native-paper";

export const Home = ({navigation}) => {

  const onEnter= ()=>{
    navigation.navigate('Room')
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/imagen.jpg')} style={{ flex: 1, width:'100%',resizeMode: 'cover'}}>
      <View style={styles.transparentButtonContainer}>
          <Button
            icon="card-search-outline"
            mode="contained"
            onPress={onEnter}
            style={styles.transparentButton}
            labelStyle={styles.buttonText}
          >
            Enter
          </Button>
      </View>
        
      </ImageBackground>
    </View>

  )
  
}
export default Home

