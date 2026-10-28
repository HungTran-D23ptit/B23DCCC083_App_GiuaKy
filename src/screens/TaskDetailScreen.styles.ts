import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgePending: {
    backgroundColor: '#F1F5F9',
  },
  statusBadgeDone: {
    backgroundColor: colors.successBg,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusBadgeTextPending: {
    color: colors.textSecondary,
  },
  statusBadgeTextDone: {
    color: colors.success,
  },
  overdueBadge: {
    backgroundColor: colors.dangerBg,
    borderColor: colors.dangerBorder,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16,
  },
  overdueBadgeText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 28,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  infoSection: {
    gap: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  priorityBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  priorityHighBadge: {
    backgroundColor: colors.priorityHighBg,
    borderColor: colors.priorityHighBorder,
  },
  priorityHighText: {
    color: colors.priorityHighText,
  },
  priorityMediumBadge: {
    backgroundColor: colors.priorityMediumBg,
    borderColor: colors.priorityMediumBorder,
  },
  priorityMediumText: {
    color: colors.priorityMediumText,
  },
  priorityLowBadge: {
    backgroundColor: colors.priorityLowBg,
    borderColor: colors.priorityLowBorder,
  },
  priorityLowText: {
    color: colors.priorityLowText,
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
  timeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeBadgeRemaining: {
    backgroundColor: colors.primaryLight,
  },
  timeBadgeToday: {
    backgroundColor: '#FEF3C7',
  },
  timeBadgeOverdue: {
    backgroundColor: colors.dangerBg,
  },
  timeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  timeBadgeTextRemaining: {
    color: colors.primary,
  },
  timeBadgeTextToday: {
    color: '#D97706',
  },
  timeBadgeTextOverdue: {
    color: colors.danger,
  },
  noteSection: {},
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  noteTextEmpty: {
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  actionButtons: {
    marginTop: 20,
    gap: 12,
  },
  toggleDoneBtn: {
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleDoneBtnDone: {
    backgroundColor: colors.success,
  },
  toggleDoneBtnUndone: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleDoneText: {
    fontSize: 15,
    fontWeight: '700',
  },
  toggleDoneTextDone: {
    color: '#FFFFFF',
  },
  toggleDoneTextUndone: {
    color: colors.textPrimary,
  },
  editBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  deleteBtn: {
    backgroundColor: colors.dangerBg,
    borderColor: colors.dangerBorder,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  notFoundIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  notFoundSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pressedEffect: {
    opacity: 0.75,
  },
});
