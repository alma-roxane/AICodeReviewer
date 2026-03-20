import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ResultScreen from '../screens/ResultScreen';
import { theme } from '../theme';

const Stack = createNativeStackNavigator();

function HomeHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerEmoji}>⚡</Text>
        <View>
          <Text style={styles.headerTitle}>AI Code Reviewer</Text>
          <Text style={styles.headerSubtitle}>Powered by Groq + Llama 3</Text>
        </View>
      </View>
      <View style={styles.headerBadge}>
        <Text style={styles.headerBadgeText}>FREE</Text>
      </View>
    </View>
  );
}

function ResultHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerEmoji}>📊</Text>
      <Text style={styles.headerTitle}>Review Results</Text>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.textPrimary,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <HomeHeader />,
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
          }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            headerTitle: () => <ResultHeader />,
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  headerEmoji: {
    fontSize: 22,
  },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
  },
  headerBadge: {
    backgroundColor: theme.colors.success + '25',
    borderWidth: 1,
    borderColor: theme.colors.success,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    marginLeft: theme.spacing.sm,
  },
  headerBadgeText: {
    color: theme.colors.success,
    fontSize: theme.fontSize.xs,
    fontWeight: '800',
    letterSpacing: 1,
  },
});