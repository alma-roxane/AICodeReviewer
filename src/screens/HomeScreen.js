import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.heroArea}>
        <Text style={styles.emoji}>🤖</Text>
        <Text style={styles.title}>Paste your code.</Text>
        <Text style={styles.title}>
          Get AI{' '}
          <Text style={styles.titleAccent}>feedback.</Text>
        </Text>
        <Text style={styles.subtitle}>Powered by Claude AI</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Result')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Test Navigation →</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.xl,
  },
  heroArea: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  emoji: {
    fontSize: 64,
    marginBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
  titleAccent: {
    color: theme.colors.primary,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.md,
    marginTop: theme.spacing.xs,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});