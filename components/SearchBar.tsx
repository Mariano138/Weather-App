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
import { useWeatherStore } from 'store/weatherStore';
import useLocation from 'hooks/useLocation';
import { cities } from 'helpers/cities';
import { Feather } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';
import PopAnimation from 'animations/PopAnimation';
import { useTranslation } from 'react-i18next';

export default function SearchBar() {
  const { fetchWeather, city, setCity } = useWeatherStore();
  const { getLocation } = useLocation();
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { animatedStyle, handlePressIn, handlePressOut } = PopAnimation();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>('EN');

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
      const filtered = cities
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

  const changeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es');
      setLanguage('ES');
    } else {
      i18n.changeLanguage('en');
      setLanguage('EN');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={[styles.input, styles.textShadow]}
          placeholder={t('home.searchBar')}
          placeholderTextColor="#fff"
          value={city}
          onChangeText={setCity}
        />

        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            style={styles.searchButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => fetchWeather(city)}>
            <Feather style={styles.textShadow} name="search" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.languageButton} onPress={changeLanguage}>
          <MaterialIcons name="language" size={20} color="white" />
          <Text style={[styles.textShadow, styles.languageText]}>{language}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationContainer}>
        {keyboardVisible && (
          <View style={styles.locationContainerSon}>
            <TouchableOpacity onPress={() => getLocation()}>
              <Text style={styles.cityText}>
                <Octicons style={styles.textShadow} name="location" size={24} color="black" />
                {t('home.welcomeButton')}
              </Text>
            </TouchableOpacity>
            <FlatList
              data={suggestions}
              renderItem={renderItem}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="always"
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  input: {
    borderColor: '#ffffff',
    borderWidth: 3,
    width: '80%',
    borderRadius: 10,
    fontSize: 20,
    color: '#fff',
  },
  searchButton: {
    justifyContent: 'center',
    backgroundColor: '#9ba9fc38',
    borderColor: '#ffffff',
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
  },
  languageButton: {
    flexDirection: 'row',
    gap: 5,
    position: 'absolute',
    bottom: -35,
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  languageText: {
    color: '#fff',
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
