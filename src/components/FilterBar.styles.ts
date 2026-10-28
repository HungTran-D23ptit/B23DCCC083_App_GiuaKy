import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
  clearBtnText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  filterPillInactive: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  overduePillBorder: {
    borderColor: colors.dangerBorder,
  },
  overdueText: {
    color: colors.danger,
    fontWeight: '600',
  },
  filterPillText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filterPillTextInactive: {
    color: colors.textSecondary,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginRight: 8,
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  sortBtn: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortBtnActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  sortBtnInactive: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  sortBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  sortBtnTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  sortBtnTextInactive: {
    color: colors.textSecondary,
  },
  pressedEffect: {
    opacity: 0.7,
  },
});
