import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useFetch from 'hooks/useFetch';
import { TextInput } from 'react-native-gesture-handler';
import ForecastItem from 'interface/forecastItem';

export default function Home() {
  const { fetchWeather, city, setCity, isLoading, weather, error, getDayName } = useFetch();

  if (!weather && !isLoading && !error) {
    return (
      <View>
        <TextInput placeholder="Search" value={city} onChangeText={setCity} />
        <Button title="Search" onPress={() => fetchWeather()} />
        <Text>Busca una ciudad.</Text>
      </View>
    );
  }

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (weather.error) {
    return (
      <View>
        <TextInput placeholder="Search" value={city} onChangeText={setCity} />
        <Button title="Search" onPress={() => fetchWeather()} />
        <Text>Ciudad no encontrada.</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput placeholder="Search" value={city} onChangeText={setCity} />
      <Button title="Search" onPress={() => fetchWeather()} />

      {isLoading && <Text>Cargando...</Text>}

      {weather && (
        <View>
          <Image
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
            }}
          />
          <Text>{weather.current.name}</Text>
          <Text>{weather.current.main.temp}°C</Text>
          <Text>{weather.current.weather[0].description}</Text>

          <View>
            {/* <Text>
              {getDayName(weather.forecast?.[0].dt)}
              {weather.forecast?.[0]?.main?.temp}°C
            </Text> */}
            {weather.forecast.map((item: ForecastItem, index: number) => (
              <Text key={index}>
                {getDayName(item.dt, index)}: {item.main.temp}°C
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
});
