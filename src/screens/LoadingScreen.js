import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingReview from '../components/LoadingReview';
import { theme } from '../theme';

export default function LoadingScreen({ navigation, route }) {
  const { code, language } = route.params;

  useEffect(() => {
    // Simulate AI processing for now — real API call comes in Step 9
    const timer = setTimeout(() => {
      navigation.replace('Result', {
        code,
        language,
        // mock result for now
        review: null,
      });
    }, 3500);

    return () => clearTimeout(timer);
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