import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LevelUpBar = ({ currentLevel, experience, experienceToNextLevel }) => {
  const percentage = (experience / experienceToNextLevel) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Level {currentLevel}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.experienceText}>
        {experience}/{experienceToNextLevel} XP
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  levelText: {
    fontSize: 15,
    fontWeight: 'bold',
    top: 50,
    color: 'black',
  },
  progressBar: {
    backgroundColor: '#ddd',
    height: 15,
    width: '70%',
    borderRadius: 10,
    top: 55,
  },
  progress: {
    backgroundColor: 'orange',
    height: '100%',
    borderRadius: 10,
  },
  experienceText: {
    marginTop: 5,
    fontSize: 13,
    top: 55,
    color: 'black',
  },
});

export default LevelUpBar;
