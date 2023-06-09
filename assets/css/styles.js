import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    backgroundColor:'#D5D8DC',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },table: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },headerCell: {
    flex: 1,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },cell: {
    width:120,
    padding:50,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },transparentButtonContainer: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'transparent',
  },transparentButton: {
    backgroundColor: 'transparent',
 
  },buttonText: {
    fontSize:30,
    color: 'white',
    
  }
  
});

export const styleInput = StyleSheet.create({
  widthInput: {
    width: '80%',
    marginBottom: 10
  }
});

export const styleAlert = StyleSheet.create({
  alert: {
    color: 'red',
    marginBottom: 15
  }
});