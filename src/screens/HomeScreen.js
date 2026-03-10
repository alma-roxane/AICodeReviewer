import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { theme } from '../theme';
import GradientCard from '../components/GradientCard';

const LANGUAGES = [
  { id: 'javascript', label: 'JS' },
  { id: 'python', label: 'PY' },
  { id: 'typescript', label: 'TS' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'other', label: 'Other' },
];

export default function HomeScreen({ navigation }) {
  const [code, setCode] = useState('');
  const [selectedLang, setSelectedLang] = useState('javascript');

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) setCode(text);
  };

  const handleClear = () => setCode('');

  const handleReview = () => {
    if (!code.trim()) return;
    navigation.navigate('Result', { code, language: selectedLang });
  };

  const isReady = code.trim().length > 0;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >

      {/* Header Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>🤖 Powered by Claude AI</Text>
      </View>

      {/* Hero Text */}
      <View style={styles.heroArea}>
        <Text style={styles.title}>Review Your</Text>
        <Text style={styles.titleAccent}>Code Instantly</Text>
        <Text style={styles.subtitle}>
          Paste any code and get bugs, improvements,{'\n'}
          and quality suggestions in seconds.
        </Text>
      </View>

      {/* Language Selector */}
      <GradientCard style={styles.langCard}>
        <Text style={styles.sectionLabel}>Language</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.langScroll}
        >
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.langChip,
                selectedLang === lang.id && styles.langChipActive,
              ]}
              onPress={() => setSelectedLang(lang.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.langChipText,
                  selectedLang === lang.id && styles.langChipTextActive,
                ]}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </GradientCard>

      {/* Code Input */}
      <GradientCard style={styles.codeCard}>
        <View style={styles.codeHeader}>
          <Text style={styles.sectionLabel}>Your Code</Text>
          <View style={styles.codeActions}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handlePaste}
              activeOpacity={0.7}
            >
              <Text style={styles.actionBtnText}>📋 Paste</Text>
            </TouchableOpacity>
            {code.length > 0 && (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleClear}
                activeOpacity={0.7}
              >
                <Text style={[styles.actionBtnText, { color: theme.colors.error }]}>
                  ✕ Clear
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TextInput
          style={styles.codeInput}
          multiline
          placeholder="// Paste or type your code here..."
          placeholderTextColor={theme.colors.textMuted}
          value={code}
          onChangeText={setCode}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          textAlignVertical="top"
        />

        {/* Character count */}
        {code.length > 0 && (
          <Text style={styles.charCount}>
            {code.length} characters
          </Text>
        )}
      </GradientCard>

      {/* Review Button */}
      <TouchableOpacity
        style={[styles.reviewBtn, !isReady && styles.reviewBtnDisabled]}
        onPress={handleReview}
        activeOpacity={isReady ? 0.8 : 1}
        disabled={!isReady}
      >
        <Text style={styles.reviewBtnText}>
          {isReady ? '🔍 Review My Code' : 'Paste code to begin'}
        </Text>
      </TouchableOpacity>

      {/* Bottom hint */}
      <Text style={styles.hint}>
        Your code is sent securely to Claude AI
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
  badge: {
    alignSelf: 'center',
    backgroundColor: theme.colors.primaryGlow,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  badgeText: {
    color: theme.colors.primaryLight,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  heroArea: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleAccent: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: theme.spacing.xs,
  },
  langCard: {
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  langScroll: {
    marginTop: theme.spacing.xs,
  },
  langChip: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
  langChipActive: {
    backgroundColor: theme.colors.primaryGlow,
    borderColor: theme.colors.primary,
  },
  langChipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  langChipTextActive: {
    color: theme.colors.primaryLight,
  },
  codeCard: {
    gap: theme.spacing.sm,
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionBtn: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
  },
  actionBtnText: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  codeInput: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.sm,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    minHeight: 200,
    lineHeight: 20,
  },
  charCount: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
    textAlign: 'right',
  },
  reviewBtn: {
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
  reviewBtnDisabled: {
    backgroundColor: theme.colors.surfaceLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  reviewBtnText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  hint: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
    textAlign: 'center',
  },
});