import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useRandomIcons from 'hooks/useRandomIcon';
import IconAnimation from 'animations/IconAnimation';

export default function DescriptionView() {
  const icons = useRandomIcons();
  return (
    <View style={styles.container}>
      <IconAnimation name={icons} />
      <Text style={[styles.descriptionText, styles.textShadow]}>
        Consulta temperatura, humedad y pronóstico extendido
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
