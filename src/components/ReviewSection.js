import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function ReviewSection({ icon, title, items = [], color }) {
  return (
    <View style={[styles.container, { borderColor: color + '40' }]}>

      {/* Section Header */}
      <View style={[styles.header, { backgroundColor: color + '15' }]}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={[styles.title, { color }]}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: color + '25' }]}>
          <Text style={[styles.badgeText, { color }]}>{items.length}</Text>
        </View>
      </View>

      {/* Items */}
      <View style={styles.itemsContainer}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>✓ Nothing to report</Text>
        ) : (
          items.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={[styles.dot, { backgroundColor: color }]} />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    flex: 1,
  },
  badge: {
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '700',
  },
  itemsContainer: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  itemText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    lineHeight: 20,
    flex: 1,
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
    fontStyle: 'italic',
  },
});