import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useWeatherStore } from 'store/weatherStore';
import { BlurView } from 'expo-blur';

export default function SearchBar() {
  const { fetchWeather, city, setCity } = useWeatherStore();
  return (
    <View style={styles.container}>
      <BlurView intensity={80} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese una ciudad..."
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.button} onPress={() => fetchWeather()}>
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
    height: 80,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    borderColor: '#ffffff',
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    color: '#fff',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#9ba9fc38',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
