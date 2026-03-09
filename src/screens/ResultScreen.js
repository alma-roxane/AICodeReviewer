import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function ResultScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📊 Results Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.lg,
  },
});