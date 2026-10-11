import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import PopAnimation from '@/animations/PopAnimation';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import CitySuggestions from './CitySuggestions';
import { useState } from 'react';

export default function SearchBar() {
  const [city, setCity] = useState<string>('');
  const { animatedStyle, handlePressIn, handlePressOut } = PopAnimation();
  const { t } = useTranslation();

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
            onPress={() => {
              if (!city.trim()) return;
              router.navigate({
                pathname: '/weather',
                params: {
                  city: city,
                },
              });
            }}>
            <Feather style={styles.textShadow} name="search" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <CitySuggestions city={city} setCity={setCity} />
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
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
