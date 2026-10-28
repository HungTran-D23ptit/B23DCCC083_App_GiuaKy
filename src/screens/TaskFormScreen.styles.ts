import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  scrollContentKeyboard: {
    paddingBottom: 280,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  requiredStar: {
    color: colors.danger,
    fontWeight: 'bold',
  },
  charCount: {
    fontSize: 12,
    color: colors.textMuted,
  },
  charCountOver: {
    color: colors.danger,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: '#FFF8F8',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  pillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  choicePill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choicePillUnselected: {
    backgroundColor: '#F8FAFC',
    borderColor: colors.border,
  },
  choicePillSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  choicePillText: {
    fontSize: 13,
  },
  choicePillTextUnselected: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  choicePillTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  priorityPillSelectedCao: {
    backgroundColor: colors.priorityHighBg,
    borderColor: colors.priorityHigh,
    borderWidth: 2,
  },
  priorityPillSelectedTrungBinh: {
    backgroundColor: colors.priorityMediumBg,
    borderColor: colors.priorityMedium,
    borderWidth: 2,
  },
  priorityPillSelectedThap: {
    backgroundColor: colors.priorityLowBg,
    borderColor: colors.priorityLow,
    borderWidth: 2,
  },
  priorityTextCao: {
    color: colors.priorityHigh,
    fontWeight: '700',
  },
  priorityTextTrungBinh: {
    color: colors.priorityMedium,
    fontWeight: '700',
  },
  priorityTextThap: {
    color: colors.priorityLow,
    fontWeight: '700',
  },
  quickDateRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  quickDateBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  quickDateBtnText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  calendarQuickBtn: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  calendarQuickBtnText: {
    color: colors.primary,
    fontWeight: '700',
  },
  dateInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  dateInputWithIcon: {
    paddingRight: 46,
  },
  datePickerIconButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  calendarIconText: {
    fontSize: 18,
  },
  buttonsContainer: {
    marginTop: 12,
    gap: 10,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  pressedEffect: {
    opacity: 0.75,
  },
});
