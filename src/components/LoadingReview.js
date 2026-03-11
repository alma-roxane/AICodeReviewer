import { View, Text, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { theme } from '../theme';

function AnimatedDot({ delay }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(translateY, {
          toValue: -12,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[styles.dot, { transform: [{ translateY }] }]}
    />
  );
}

const MESSAGES = [
  '🔍 Scanning your code...',
  '🐛 Hunting for bugs...',
  '✨ Finding improvements...',
  '⭐ Evaluating quality...',
  '📝 Writing your review...',
];

export default function LoadingReview() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>

      {/* Pulsing glow circle */}
      <Animated.View
        style={[
          styles.glowCircle,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <View style={styles.innerCircle}>
          <Text style={styles.robotEmoji}>🤖</Text>
        </View>
      </Animated.View>

      {/* Animated dots */}
      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <AnimatedDot key={i} delay={i * 150} />
        ))}
      </View>

      {/* Title */}
      <Text style={styles.title}>Analyzing your code</Text>
      <Text style={styles.subtitle}>
        Claude AI is reviewing your code for bugs,{'\n'}
        improvements, and quality issues.
      </Text>

      {/* Status messages */}
      <View style={styles.statusCard}>
        {MESSAGES.map((msg, index) => (
          <View key={index} style={styles.statusRow}>
            <View style={[
              styles.statusDot,
              index === 0
                ? styles.statusDotActive
                : styles.statusDotInactive,
            ]} />
            <Text style={[
              styles.statusText,
              index === 0
                ? styles.statusTextActive
                : styles.statusTextInactive,
            ]}>
              {msg}
            </Text>
          </View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  glowCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primaryGlow,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotEmoji: {
    fontSize: 44,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  statusCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    width: '100%',
    gap: theme.spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusDotActive: {
    backgroundColor: theme.colors.primary,
  },
  statusDotInactive: {
    backgroundColor: theme.colors.border,
  },
  statusText: {
    fontSize: theme.fontSize.sm,
  },
  statusTextActive: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  statusTextInactive: {
    color: theme.colors.textMuted,
  },
});