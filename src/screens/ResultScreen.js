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

// 🧪 Mock data to test UI — we'll replace with real AI data in Step 9
const MOCK_REVIEW = {
  score: 62,
  bugs: [
    'Missing null check on line 3 — could cause crash if input is undefined',
    'Loop condition uses = instead of == causing infinite loop',
  ],
  improvements: [
    'Consider using const instead of let for variables that never change',
    'Extract repeated logic into a reusable helper function',
    'Add input validation before processing user data',
  ],
  quality: [
    'Good use of descriptive variable names',
    'Add comments to explain complex logic blocks',
    'Consider breaking this into smaller functions',
  ],
};

export default function ResultScreen({ navigation, route }) {
  // We'll use route.params later when real AI data comes in
  const review = MOCK_REVIEW;

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
      </View>

      {/* Score Meter */}
      <ScoreMeter score={review.score} />

      {/* Review Sections */}
      <ReviewSection
        icon="🐛"
        title="Bugs Found"
        items={review.bugs}
        color={theme.colors.error}
      />

      <ReviewSection
        icon="✨"
        title="Improvements"
        items={review.improvements}
        color={theme.colors.warning}
      />

      <ReviewSection
        icon="⭐"
        title="Code Quality"
        items={review.quality}
        color={theme.colors.success}
      />

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryBtnText}>🔄 Review Another</Text>
        </TouchableOpacity>
      </View>

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
  actions: {
    gap: theme.spacing.sm,
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
});