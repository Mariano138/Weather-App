import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  Text,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useWeatherStore } from 'store/weatherStore';
import useLocation from 'hooks/useLocation';
import { cities } from 'helpers/cities';
import Octicons from '@expo/vector-icons/Octicons';

export default function SearchBar() {
  const { fetchWeather, city, setCity } = useWeatherStore();
  const { getLocation } = useLocation();
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const citiesList = cities;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (city.length >= 3) {
      const filtered = citiesList
        .filter((cityName) => cityName.toLowerCase().includes(city.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={{ padding: 3 }}>
        <View
          style={{
            height: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setCity('');
            setSuggestions([]);
            fetchWeather(item);
          }}>
          <Text style={styles.cityText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
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
      </View>
      <View style={styles.locationContainer}>
        {keyboardVisible && (
          <View style={styles.locationContainerSon}>
            <TouchableOpacity onPress={() => getLocation()}>
              <Text style={styles.cityText}>
                <Octicons style={styles.textShadow} name="location" size={24} color="black" />
                Usar tu ubicación actual
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={suggestions}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'column',
    backgroundColor: '#fcfbfb',
  },
  locationContainerSon: {
    gap: 5,
    padding: 15,
  },
  cityText: {
    fontWeight: '600',
  },
});
