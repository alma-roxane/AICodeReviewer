import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from './src/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>⚡ AI Code Reviewer</Text>
      <Text style={styles.subtitle}>Structure is ready!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
  },
});