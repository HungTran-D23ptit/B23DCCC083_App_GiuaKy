import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardCompleted: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    opacity: 0.65,
  },
  cardOverdue: {
    borderColor: '#FECACA',
    backgroundColor: '#FFFBFB',
  },
  cardPressed: {
    transform: [{ scale: 0.985 }],
    backgroundColor: '#F8FAFC',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkboxPressed: {
    opacity: 0.7,
  },
  checkboxEmpty: {
    width: 10,
    height: 10,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: -2,
  },
  content: {
    flex: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  overdueBadge: {
    backgroundColor: colors.dangerBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: colors.dangerBorder,
  },
  overdueBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.danger,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 20,
    marginBottom: 8,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  dateTextOverdue: {
    color: colors.danger,
    fontWeight: '600',
  },
  textMuted: {
    color: colors.textMuted,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700',
  },
  priorityHighBg: {
    backgroundColor: colors.priorityHighBg,
    borderColor: colors.priorityHighBorder,
  },
  priorityHighText: {
    color: colors.priorityHighText,
    fontSize: 11,
    fontWeight: '700',
  },
  priorityMediumBg: {
    backgroundColor: colors.priorityMediumBg,
    borderColor: colors.priorityMediumBorder,
  },
  priorityMediumText: {
    color: colors.priorityMediumText,
    fontSize: 11,
    fontWeight: '700',
  },
  priorityLowBg: {
    backgroundColor: colors.priorityLowBg,
    borderColor: colors.priorityLowBorder,
  },
  priorityLowText: {
    color: colors.priorityLowText,
    fontSize: 11,
    fontWeight: '700',
  },
  categoryStudyBadge: {
    backgroundColor: colors.categoryStudyBg,
  },
  categoryStudyText: {
    color: colors.categoryStudy,
  },
  categoryWorkBadge: {
    backgroundColor: colors.categoryWorkBg,
  },
  categoryWorkText: {
    color: colors.categoryWork,
  },
  categoryHealthBadge: {
    backgroundColor: colors.categoryHealthBg,
  },
  categoryHealthText: {
    color: colors.categoryHealth,
  },
  categoryPersonalBadge: {
    backgroundColor: colors.categoryPersonalBg,
  },
  categoryPersonalText: {
    color: colors.categoryPersonal,
  },
});
