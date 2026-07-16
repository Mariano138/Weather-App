import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import slice from 'animations/SlideAnimation';

export default function DescriptionView() {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconsContainer,
          {
            animationName: slice,
            animationIterationCount: 'infinite',
            animationDuration: '30s',
          },
        ]}>
        <Animated.View>
          <Feather name="sun" size={40} color="white" />
        </Animated.View>
        <Animated.View>
          <Feather name="moon" size={40} color="white" />
        </Animated.View>
        <Animated.View>
          <Feather name="cloud" size={40} color="white" />
        </Animated.View>
      </Animated.View>
      <Text style={[styles.descriptionText, styles.textShadow]}>
        Consulta temperatura, humedad y pronóstico extendido
      </Text>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 40,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  line: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 20,
  },
});
