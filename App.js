/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  View,
  Button,
  Image,
} from 'react-native';

export default function App() {
  const [DATA, setData] = useState([]);
  LoatData();
  return (
    <View>
      <Button
        title="Load DATA"
        onPress={() => {
          LoatData();
        }}></Button>

      <FlatList
        data={DATA}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <View>
                <Text style={styles.itemText}>{item.albumId}</Text>
                <Text style={styles.itemText}>{item.title}</Text>
                <Image
                  source={{uri: item.thumbnailUrl}}
                  style={styles.itemImage}
                />
              </View>
            </View>
          );
        }}></FlatList>
    </View>
  );

  function LoatData() {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(json => setData(json));
  }
}

const styles = StyleSheet.create({
  item: {
    width: '95%',
    borderRadius: 10,
    margin: 8,
    borderColor: 'red',
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  itemText: {marginLeft: 10},
  itemImage: {height: 80, margin: 10},
});
