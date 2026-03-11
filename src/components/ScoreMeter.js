import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function ScoreMeter({ score = 0 }) {
  const getColor = () => {
    if (score >= 80) return theme.colors.success;
    if (score >= 50) return theme.colors.warning;
    return theme.colors.error;
  };

  const getLabel = () => {
    if (score >= 80) return 'Great Code!';
    if (score >= 50) return 'Needs Work';
    return 'Needs Attention';
  };

  const color = getColor();
  const barWidth = `${score}%`;

  return (
    <View style={styles.container}>

      {/* Score display */}
      <View style={styles.scoreRow}>
        <View>
          <Text style={styles.scoreLabel}>Code Quality Score</Text>
          <Text style={[styles.scoreLabel2, { color }]}>{getLabel()}</Text>
        </View>
        <Text style={[styles.scoreNumber, { color }]}>{score}</Text>
      </View>

      {/* Bar */}
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            { width: barWidth, backgroundColor: color },
          ]}
        />
      </View>

      {/* Scale labels */}
      <View style={styles.scaleRow}>
        <Text style={styles.scaleText}>0</Text>
        <Text style={styles.scaleText}>50</Text>
        <Text style={styles.scaleText}>100</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreLabel2: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    marginTop: 2,
  },
  scoreNumber: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: '800',
  },
  barTrack: {
    height: 10,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleText: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
  },
});