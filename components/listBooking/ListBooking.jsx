import { StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";
import { styles } from "../../assets/css/styles";
import { useState, useEffect } from "react";

export const ListBooking = () => {
  const [dataCustomers, setdataCustomers] = useState([])
  const getCustomers  = async ()=>{
    const customers = await axios.get(`http://localhost:3000/bookings`)
    console.log("customers",customers)
    setdataCustomers(customers.data.booking)
  }
  useEffect(()=>{
    if(dataCustomers.length == 0){
      getCustomers();
    console.log("dataCustomers ",dataCustomers)
    }
})
  return (
    <View style={styles.container}>
      <Text style={{color:"blue", fontSize:25, marginBottom:20}}>ListCustomer</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.headerCell}>ID</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Last name</Text>
          <Text style={styles.headerCell}>Date start booking</Text>
          <Text style={styles.headerCell}>Date end booking</Text>
          <Text style={styles.headerCell}>Number Children</Text>
          <Text style={styles.headerCell}>Number adults</Text>
          <Text style={styles.headerCell}>Total Price</Text>
        </View>
        <FlatList
            data={dataCustomers}
            renderItem={({item})=>(
              <View style={styles.tableRow}>
                <Text style={styles.cell}>{item.idroom}</Text>
                <Text style={styles.cell}>{item.nameclient}</Text>
                <Text style={styles.cell}>{item.lastNameclient}</Text>
                <Text style={styles.cell}>{new Date(item.datestartbooking).toISOString().split('T')[0]}</Text>
                <Text style={styles.cell}>{new Date(item.dateendbooking).toISOString().split('T')[0]}</Text>
                <Text style={styles.cell}>{item.numberchildrens}</Text>
                <Text style={styles.cell}>{item.numberadults}</Text>
                <Text style={styles.cell}>{item.totalprice}</Text>
              </View>
            )}
        />
    </View>
    </View>
  )
}
