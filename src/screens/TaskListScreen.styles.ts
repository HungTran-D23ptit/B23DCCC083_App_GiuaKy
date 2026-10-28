import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
  },
  listContent: {
    paddingBottom: 24,
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  addBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  deleteCompletedBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteCompletedBtnActive: {
    backgroundColor: colors.dangerBg,
    borderColor: colors.dangerBorder,
  },
  deleteCompletedBtnDisabled: {
    backgroundColor: colors.disabledBg,
    borderColor: colors.border,
  },
  deleteCompletedText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deleteCompletedTextActive: {
    color: colors.danger,
  },
  deleteCompletedTextDisabled: {
    color: colors.disabledText,
  },
  pressedEffect: {
    opacity: 0.75,
  },
});
