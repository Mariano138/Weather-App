import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useFetch from 'hooks/useFetch';
import { TextInput } from 'react-native-gesture-handler';

export default function Home() {
  const { fetchWeather, city, setCity, isLoading, weather, error } = useFetch();

  return (
    <View>
      <TextInput placeholder="Search" value={city} onChangeText={setCity} />
      <Button title="Search" onPress={() => fetchWeather()} />

      {isLoading && <Text>Cargando...</Text>}

      {weather && (
        <View>
          <Text>{weather.name}</Text>
          <Text>{weather.main.temp}</Text>
          <Text>{weather.weather[0].description}</Text>
          <Image
            style={styles.icon}
            source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
          />
        </View>
      )}
      {error && <Text>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
});
