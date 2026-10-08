import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ChangeLanguage() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>('EN');

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
      <TouchableOpacity style={styles.languageButton} onPress={changeLanguage}>
        <MaterialIcons name="language" size={20} color="white" />
        <Text style={[styles.textShadow, styles.languageText]}>{language}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.60)',
    marginTop: 50,
  },
  languageButton: {
    flexDirection: 'row',
    gap: 5,
  },
  languageText: {
    color: '#fff',
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
