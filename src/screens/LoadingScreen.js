import { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingReview from '../components/LoadingReview';
import { reviewCode } from '../services/claudeService';
import { theme } from '../theme';

export default function LoadingScreen({ navigation, route }) {
  const { code, language } = route.params;
  const hasNavigated = useRef(false);

  useEffect(() => {
    const callAI = async () => {
      try {
        const review = await reviewCode(code, language);

        if (!hasNavigated.current) {
          hasNavigated.current = true;
          navigation.replace('Result', {
            code,
            language,
            review,
          });
        }
      } catch (error) {
        if (!hasNavigated.current) {
          hasNavigated.current = true;
          navigation.replace('Result', {
            code,
            language,
            review: null,
            error: error.message,
          });
        }
      }
    };

    callAI();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LoadingReview />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});