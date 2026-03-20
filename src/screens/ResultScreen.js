import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { theme } from '../theme';
import ReviewSection from '../components/ReviewSection';
import ScoreMeter from '../components/ScoreMeter';


function SummaryCard({ review }) {
  const totalIssues = (review.bugs?.length ?? 0) +
                      (review.improvements?.length ?? 0);
  return (
    <View style={summaryStyles.container}>
      <View style={summaryStyles.stat}>
        <Text style={[summaryStyles.statNumber,
          { color: theme.colors.error }]}>
          {review.bugs?.length ?? 0}
        </Text>
        <Text style={summaryStyles.statLabel}>Bugs</Text>
      </View>
      <View style={summaryStyles.divider} />
      <View style={summaryStyles.stat}>
        <Text style={[summaryStyles.statNumber,
          { color: theme.colors.warning }]}>
          {review.improvements?.length ?? 0}
        </Text>
        <Text style={summaryStyles.statLabel}>Improvements</Text>
      </View>
      <View style={summaryStyles.divider} />
      <View style={summaryStyles.stat}>
        <Text style={[summaryStyles.statNumber,
          { color: theme.colors.success }]}>
          {review.quality?.length ?? 0}
        </Text>
        <Text style={summaryStyles.statLabel}>Quality Tips</Text>
      </View>
    </View>
  );
}

const summaryStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
});
export default function ResultScreen({ navigation, route }) {
  const { review, error, language } = route.params;

  // Handle error state
  if (error || !review) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>
          {error || 'Could not get AI review. Please try again.'}
        </Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.retryBtnText}>← Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >

      {/* Header */}
      <View style={styles.headerArea}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✅ Review Complete</Text>
        </View>
        <Text style={styles.title}>Here's what{'\n'}Claude found</Text>
        <Text style={styles.langTag}>
          Language: {language?.toUpperCase()}
        </Text>
      </View>

      {/* Score Meter */}
      <ScoreMeter score={review.score ?? 0} />
      <SummaryCard review={review} />


      {/* Review Sections */}
      <ReviewSection
        icon="🐛"
        title="Bugs Found"
        items={review.bugs ?? []}
        color={theme.colors.error}
      />

      <ReviewSection
        icon="✨"
        title="Improvements"
        items={review.improvements ?? []}
        color={theme.colors.warning}
      />

      <ReviewSection
        icon="⭐"
        title="Code Quality"
        items={review.quality ?? []}
        color={theme.colors.success}
      />

      {/* Action Button */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryBtnText}>🔄 Review Another</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        Reviewed by Claude AI • Results may vary
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  headerArea: {
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: theme.colors.success + '20',
    borderWidth: 1,
    borderColor: theme.colors.success,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  badgeText: {
    color: theme.colors.success,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
  langTag: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    letterSpacing: 1,
  },
  primaryBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  footer: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  errorEmoji: {
    fontSize: 64,
  },
  errorTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
    backgroundColor: theme.colors.error + '15',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.error + '40',
    overflow: 'hidden',
  },
  retryBtn: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  retryBtnText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
});