import useLocation from '@/hooks/useLocation';
import { router } from 'expo-router';
import { SetStateAction, Dispatch, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { useTranslation } from 'react-i18next';
import { cities } from '@/helpers/cities';

interface Props {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}

export default function CitySuggestions({ city, setCity }: Props) {
  const { getLocation } = useLocation();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const { t } = useTranslation();

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
            router.navigate({
              pathname: '/weather',
              params: {
                city: item,
              },
            });
          }}>
          <Text style={styles.cityText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
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
  );
}

const styles = StyleSheet.create({
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
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
