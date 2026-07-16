import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';

export default function InfoView() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Feather style={styles.textShadow} name="thermometer" size={33} color="white" />
        <Text style={[styles.textStyle, styles.textShadow]}>Temperatura</Text>
      </View>
      <View style={styles.cardContainer}>
        <Feather style={styles.textShadow} name="droplet" size={33} color="white" />
        <Text style={[styles.textStyle, styles.textShadow]}>Humedad</Text>
      </View>
      <View style={styles.cardContainer}>
        <Feather style={styles.textShadow} name="calendar" size={33} color="white" />
        <Text style={[styles.textStyle, styles.textShadow]}>Pronóstico</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardContainer: {
    alignItems: 'center',
  },
  textStyle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
