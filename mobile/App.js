import { Feather as Icon } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import useWebSocket from 'react-use-websocket';


export default function App() {

  const [data, setData] = useState(null)
  const [text, setText] = useState(null)
  const [symbol, setSymbol] = useState("eosusdt")
  // bnbusdt / btcusdt / ethusdt / eosusdt / ltcusdt / xrpusdt

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    onMessage: () => {
      if (lastJsonMessage) {
        console.log('get', lastJsonMessage);
        setData(lastJsonMessage)
      }
    },
    onError: (event) => alert(event.message),
    shouldReconnect: () => true,
    reconnectInterval: 3000

  })

  const SearchButton = <Icon.Button
    onPress={evt => setSymbol(text.toLowerCase())}
    name="search" size={24} color="#FCD536" backgroundColor={"transparent"}
  />



  return (
    <View style={styles.container}>
      {/* <Icon name="eye" size={64} color="#FCD536" /> */}
      <Text style={{ fontSize: 100 }}>🕵🏻‍♂️</Text>
      <Text h1 style={{ color: '#FCD536', fontWeight: '800' }}> Crypto Watch </Text>

      <Text h5 style={{ color: '#FCD536', marginTop: 2, marginBottom: 80, letterSpacing: 5 }}> BINANCE</Text>

      <Input
        underlineColorAndroid='transparent'
        placeholder="Digite o código do ativo"
        inputContainerStyle={{ borderBottomWidth: 0 }}
        style={{ borderColor: '#FCD536', borderWidth: 1, alignItems: 'center', borderRadius: 10, padding: 5, height: 50, marginRight: 5 }}
        value={text}
        // clear={true}
        onChangeText={setText}
        autoCapitalize='characters'
        inputStyle={{ color: 'white', paddingLeft: 20 }}
        // leftIcon={<Icon name="dollar-sign" size={24} color="#ffffff" />}
        rightIcon={SearchButton}
      ></Input>


      <View style={styles.resultBox}>



        <View style={styles.viewLine}>

          <Text h4 style={{ ...styles.text, fontWeight: '800', color: '#FCD536', marginBottom: 10 }}>Métricas:</Text>

        </View>

        <View style={styles.viewLine}>

          <Text h4 style={{ ...styles.text, fontWeight: '800' }}>Preço atual:  </Text>
          <Text h4 style={styles.text}>$ {(Math.round(data?.c * 100) / 100).toFixed(2)}
          </Text>
        </View>

        <View style={styles.viewLine}>
          <Text h4 style={{ ...styles.text, fontWeight: '800' }}>Variação:  </Text>
          <Text h4 style={styles.text}>

            {(Math.round(data?.P * 100) / 100).toFixed(2)}
            %</Text>
        </View>

        {/* <View style={styles.viewLine}>
          <Text h4 style={{ ...styles.text, fontWeight: '800' }}>Volume:</Text>
          <Text h4 style={styles.text}> {data?.v}</Text>
        </View> */}



      </View>


      {/* <Text style={styles.text}>{JSON.stringify(data, null, 2)}</Text> */}
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  text: {
    color: 'white',
    // marginBottom: 5,
    textAlign: 'left',
    // marginLeft: 0,
    // width: '100%'
  },
  viewLine: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
    // justifyContent: 'sapce-between',
  },
  resultBox: {
    width: '100%',

    paddingHorizontal: 30,
    paddingVertical: 30,
    // border: '1px solid #FCD536',
    borderWidth: 1,
    borderColor: '#FCD53660',
    borderStyle: 'dashed',
  }
});
