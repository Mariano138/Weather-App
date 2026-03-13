import { Button, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useWeatherStore } from 'store/weatherStore';
import useLocation from 'hooks/useLocation';

export default function SearchBar() {
  const { fetchWeather, city, setCity } = useWeatherStore();
  const { getLocation, cityLocation } = useLocation();

  useEffect(() => {
    if (cityLocation) {
      fetchWeather(cityLocation);
    }
  }, [cityLocation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.textShadow]}
        placeholder="Ingrese una ciudad..."
        placeholderTextColor="#fff"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={() => fetchWeather()}>
        <Feather style={styles.textShadow} name="search" size={24} color="white" />
      </TouchableOpacity>
      <Button
        title="getLocation"
        onPress={() => {
          console.log('BOTON PRESIONADO');
          getLocation();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginHorizontal: 16,
  },
  input: {
    borderColor: '#ffffff',
    borderWidth: 3,
    width: '80%',
    borderRadius: 10,
    fontSize: 20,
    color: '#fff',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#9ba9fc38',
    borderColor: '#ffffff',
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
