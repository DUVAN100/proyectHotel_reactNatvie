import { View } from "react-native";

import { DataTable, Text } from "react-native-paper";

import { cars } from "../data/car";
import { styles } from "../assets/css/styles";

export const ListaCarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20, color: 'blue' }}>Lista de cars</Text>

      <DataTable style={{ width: '80%' }}>
        <DataTable.Header>
          <DataTable.Title>Numero placa</DataTable.Title>
          <DataTable.Title>Marca</DataTable.Title>
          <DataTable.Title>Estado</DataTable.Title>
        </DataTable.Header>

        {
          cars.map(car => {
            return (<DataTable.Row style={{ marginBottom: 5, textAlign: 'left' }} key={car.plateNumber}>
              <DataTable.Cell>{car.plateNumber}</DataTable.Cell>
              <DataTable.Cell>{car.brand}</DataTable.Cell>
              <DataTable.Cell>{(car.state) ? 'Disponible' : 'No disponible'}</DataTable.Cell>
            </DataTable.Row>
            )
          })
        }

      </DataTable>
    </View>
  )
}
