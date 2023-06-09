import { useState } from "react";
import { View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from "react-hook-form";
import { Button, Text, TextInput } from "react-native-paper";
import  axios  from "axios";


export const Room = ({route, navigation}) => {
  // const { role } = route.params.response.data;
  const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [idSerach, setIdSearch] = useState('');
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: {
          name: "",
          photo: "",
          description: "",
          price:"",
          numberpeoples:"",
        },
    });
    const onSave = async(data)=>{
      try {
        const response = await axios.post('http://localhost:3000/sroom',data)
        console.log("response",response)
        if (typeof response.data.message === 'string' && response.data.message.includes('failed')){
          setError(true)
          setMessage("Id room no is valid for mongodb")
          setTimeout(()=>{
            setMessage("")            
          },5000)
        }else{
          setError(false)
          setMessage("Room created successfully")
          setTimeout(()=>{
              setMessage("")            
          },2000)
          reset();
        }
          
      } catch (error) {
        setError(true)
        setMessage(error.response.data.message)
        setTimeout(()=>{
          setMessage("")            
        },5000)
      }
    }
    const onSearch= async()=>{
      try {
        const response = await axios.get(`http://localhost:3000/room/${idSerach}`);
        console.log(response)
        if(response.data.romm == null){
          setError(true)
          setMessage('Room not exits')
          setTimeout(()=>{
            setMessage("")            
          },5000)
        }else{
          setValue("name", response.data.romm.name);
          setValue("photo", response.data.romm.photo);
          setValue("description", response.data.romm.description);
          setValue("price", response.data.romm.price);
          setValue("numberpeoples", response.data.romm.numberpeoples);
          setError(false)
        }
        
      } catch (error) {
        if (typeof error.response.data.message === 'string' && error.response.data.message.includes('failed')){
          setError(true)
          setMessage("Id no is valid for mongodb")
          setTimeout(()=>{
            setMessage("")            
          },5000)
        }else{
          setError(true)
        setMessage(error.response.data.message)
        setTimeout(()=>{
          setMessage("")            
        },5000)
      }  
    }
  }
    const onUpdate = async(data) => { 
      console.log(data)
      try {
        const response = await axios.put(`http://localhost:3000/uroom/${idSerach}`,data);  
        setError(false)
        setMessage("Room updated successfully")
        setTimeout(()=>{
            setMessage("")            
        },5000)
        reset();
      } catch (error) {
        setError(true)
        setMessage(error.response.data.message)
        setTimeout(()=>{
          setMessage("")            
        },5000)
      }
      
    }
    const onDelete = async (data) => {
      try {
        if(confirm(`Esta seguro de eliminar a ${data.name}`)){
          const response = await axios.delete(`http://localhost:3000/droom/${idSerach}`);
          console.log("response ",response)
          setError(false);
          setMessage("Room deleted successfully");
          data.firstName = ""
          data.lastName = ""
          setTimeout(()=>{
            setMessage("")   
            reset()         
          },5000)
          setIdSearch("");
        }
      } catch (error) {
        setError(true)
        setMessage(error.response.data.message)
        setTimeout(()=>{
          setMessage("")            
        },5000)
      }
    }
      
      
    

  return (
    <View>
      <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:'80px' }}>
        <View>
          <Text style={{fontSize:32}}>Rooms</Text>
          <TextInput
            label='id for search'
            mode='outlined'
            onChangeText={idSerach => setIdSearch(idSerach)}
            value={idSerach}
          >
          </TextInput>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="fullname"
                mode="outlined"
                left={<TextInput.Icon icon="alphabetical" />}
                style={{ marginBottom: 20, backgroundColor:"powderblue"}}
                placeholder="Type your fullname"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          

          <Controller
            control={control}
            rules={{
              required:true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Photo uri"
                mode="outlined"
                left={<TextInput.Icon icon="image" />}
                style={{ marginBottom: 20, backgroundColor: "powderblue" }}
                
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="photo"
          />
          <Controller
            control={control}
            rules={{
              required:true,
              minLength:5,
              
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Description"
                mode="outlined"
                left={<TextInput.Icon icon="alphabetical" />}
                style={{ marginBottom: 20, backgroundColor: "powderblue" }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />
          <Controller
            control={control}
            rules={{
              required:true,
              pattern: /^[0-9]+$/
              
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="price"
                mode="outlined"
                left={<TextInput.Icon icon="currency-usd" />}
                style={{ marginBottom: 20, backgroundColor: "powderblue" }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="price"
          />
          <Controller
            control={control}
            rules={{
              required:true,
              pattern: /^(10|[0-9])$/
              
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Number peoples"
                mode="outlined"
                left={<TextInput.Icon icon="numeric" />}
                style={{ marginBottom: 20, backgroundColor: "powderblue" }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="numberpeoples"
          />
          {errors.numberpeoples?.type == 'required' && (<Text style={{ color: "red" }}>The field price is required</Text>)}
          {errors.price?.type == 'required' && (<Text style={{ color: "red" }}>The field price is required</Text>)}
          {errors.description?.type == 'required' && (<Text style={{ color: "red" }}>The field description is required</Text>)}
          {errors.description?.type == 'minLength' &&(<Text style={{ color: "red" }}>The field description is required</Text>)}
          {errors.firstName?.type == 'required' && (<Text style={{ color: "red" }}>The field fullname is required</Text>)}
          {errors.photo?.type == 'required' && (<Text style={{ color: "red" }}>The photo of room is required.</Text>)}
          {errors.numberpeoples?.type == 'pattern' && (<Text style={{ color: "red" }}>Only numbers</Text>)}
        </View>
        <View style={{flexDirection:'row', alignItems:"center"}}>
          <View>
            <Button
              icon="plus-box"
              mode="contained"
              onPress={handleSubmit(onSave)}
              style={{ backgroundColor: "#A3E4D7", margin:'20px' }}
            >
              SAVE
            </Button>
            <Button
              icon="card-search-outline"
              mode="contained"
              onPress={onSearch}
              style={{ backgroundColor: "#85C1E9", margin:'20px'  }}
            >
              SEARCH
            </Button>
          </View>    
          <View>
            <Button
              icon="plus-box"
              mode="contained"
              onPress={handleSubmit(onUpdate)}
              style={{ backgroundColor: "#F9E79F", margin:'20px'  }}
            >
              UPDATE
            </Button>
            
            <Button
              icon="card-search-outline"
              mode="contained"
              onPress={handleSubmit(onDelete)}
              style={{ backgroundColor: "red", margin:'20px'  }}
            >
              DELETE
            </Button>
          </View>
          
        </View>
        
      </View>
      <View>
        <Text style={{color: error ? 'red' : 'green', fontSize:'40px', marginLeft:500}}>{message}</Text>  

      </View>

    </View>
      
  )
}
