import { useState } from "react";
import { View } from "react-native";
import  axios  from "axios";
import { useForm, Controller } from "react-hook-form";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
import { styleAlert, styleInput, styles } from "../../assets/css/styles";

export const Booking = ({ navigation }) => {
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
          idroom: "",
          nameclient: "",
          lastNameclient: "",
          datestartbooking:"",
          dateendbooking:"",
          numberchildrens:"",
          numberadults:"",
        },
    });
    const onSave = async(data)=>{
      try {
        const response = await axios.post('http://localhost:3000/sbooking',data)
        console.log("response",response)

        if (typeof response.data.message === 'string' && response.data.message.includes('failed')){
          setError(true)
          setMessage("Id room no is valid for mongodb")
          setTimeout(()=>{
            setMessage("")            
          },5000)
        }else{
          setError(false)
          setMessage("Booking created successfully")
          setTimeout(()=>{
              setMessage("")            
          },2000)
          reset();
        }
      } catch (error) {
        setError(true)
        console.log(error)
        setMessage(error.response.data.message)
        setTimeout(()=>{
          setMessage("")            
        },5000)
      }
    }
    const onSearch= async()=>{
      try {
        const response = await axios.get(`http://localhost:3000/booking/${idSerach}`);
          console.log(response)
          if (typeof response.data.message === 'string' && response.data.message.includes('failed')){
            setError(true)
            setMessage("Id room no is valid for mongodb")
            setTimeout(()=>{
              setMessage("")            
            },5000)
          }else{
            if(response.data.Booking == null){
              setError(true)
              setMessage('Booking not exits')  
              setTimeout(()=>{
                setMessage("")            
              },5000)
            }else{
              setValue("idroom", response.data.Booking.idroom);
              setValue("nameclient", response.data.Booking.nameclient);
              setValue("lastNameclient", response.data.Booking.lastNameclient);
              setValue("datestartbooking", new Date(response.data.Booking.datestartbooking).toISOString().split('T')[0]);
              setValue("dateendbooking", new Date(response.data.Booking.dateendbooking).toISOString().split('T')[0]);
              setValue("numberchildrens", response.data.Booking.numberchildrens);
              setValue("numberadults", response.data.Booking.numberadults);
              setError(false)
            }
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
        const response = await axios.put(`http://localhost:3000/ubooking/${idSerach}`,data);  
        setError(false)
        setMessage("Booking updated successfully")
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
        reset();
      }
      
    }
    const onDelete = async (data) => {
      try {
        if(confirm(`are you sure to delete the reservation of ${data.name}`)){
          const response = await axios.delete(`http://localhost:3000/dbooking/${idSerach}`);
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
        reset();
      }
    }

  return (
    <View>
    <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:'30px' }}>
      <View>
        <Text style={{fontSize:32}}>Bookings</Text>
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
              label="Id room"
              mode="outlined"
              left={<TextInput.Icon icon="numeric" />}
              style={{ marginBottom: 10, backgroundColor:"powderblue"}}
              placeholder="Type the id of the room"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="idroom"
        />
        {errors.idroom?.type == 'required' && (<Text style={{ color: "red" }}>The field id room is required</Text>)}

        <Controller
          control={control}
          rules={{
            required:true,
            minLength:5,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="names"
              mode="outlined"
              left={<TextInput.Icon icon="alphabetical" />}
              style={{ marginBottom: 10, backgroundColor: "powderblue" }}
              placeholder="Wirte your names"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="nameclient"
        />
        {errors.nameclient?.type == 'required' && (<Text style={{ color: "red" }}>The field names is required</Text>)}
        {errors.nameclient?.type == 'minLength' &&(<Text style={{ color: "red" }}>The field names min 5 characters</Text>)}

        <Controller
          control={control}
          rules={{
            required:true,
            minLength:5,
            
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Lastnames"
              mode="outlined"
              placeholder="Write your last names"
              left={<TextInput.Icon icon="alphabetical" />}
              style={{ marginBottom: 10, backgroundColor: "powderblue" }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastNameclient"
        />
        {errors.lastNameclient?.type == 'required' && (<Text style={{ color: "red" }}>The field last names is required</Text>)}
        {errors.lastNameclient?.type == 'minLength' &&(<Text style={{ color: "red" }}>The field last name min 5 characters</Text>)}
        <Controller
          control={control}
          rules={{
            required:true,
            pattern:/^\d{4}-\d{2}-\d{2}$/
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Date start booking"
              mode="outlined"
              placeholder="Format 'YYYY-MMM-DD'"
              left={<TextInput.Icon icon="calendar" />}
              style={{ marginBottom: 10, backgroundColor: "powderblue" }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="datestartbooking"
        />
        {errors.datestartbooking?.type == 'required' && (<Text style={{ color: "red" }}>The field date start booking is required</Text>)}
        {errors.datestartbooking?.type == 'pattern' && (<Text style={{ color: "red" }}>The format date start booking is incorrect</Text>)}

        <Controller
          control={control}
          rules={{
            required:true,
            pattern:/^\d{4}-\d{2}-\d{2}$/
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Date end booking"
              mode="outlined"
              placeholder="Format 'YYYY-MMM-DD'"
              left={<TextInput.Icon icon="calendar" />}
              style={{ marginBottom: 10, backgroundColor: "powderblue" }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="dateendbooking"
        />
        {errors.dateendbooking?.type == 'required' && (<Text style={{ color: "red" }}>The field date end booking is required</Text>)}
        {errors.dateendbooking?.type == 'pattern' && (<Text style={{ color: "red" }}>The format date end booking is incorrect</Text>)}

        <Controller
          control={control}
          rules={{
            required:true,
            pattern:/^(1[0-5]|[1-9])$/
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Number childrens"
              mode="outlined"
              placeholder="Type numbers persons < 18 years"
              left={<TextInput.Icon icon="numeric" />}
              style={{ marginBottom: 10, backgroundColor: "powderblue" }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="numberchildrens"
        />
        {errors.numberchildrens?.type == 'required' && (<Text style={{ color: "red" }}>The field number childrens is required</Text>)}
        {errors.numberchildrens?.type == 'pattern' && (<Text style={{ color: "red" }}>you exceeded the limit</Text>)}

        <Controller
          control={control}
          rules={{
            required:true,
            pattern:/^(1[0-5]|[1-9])$/
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Number adults"
              mode="outlined"
              placeholder="Type numbers persons > 18 years"
              left={<TextInput.Icon icon="numeric" />}
              style={{ marginBottom: 10, backgroundColor: "powderblue" }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="numberadults"
        />
        {errors.numberadults?.type == 'required' && (<Text style={{ color: "red" }}>The field number adults is required</Text>)}
        {errors.numberadults?.type == 'pattern' && (<Text style={{ color: "red" }}>you exceeded the limit</Text>)}
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
