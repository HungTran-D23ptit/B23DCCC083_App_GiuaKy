import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#4F46E5',
  primaryDark: '#4338CA',
  primaryLight: '#EEF2FF',
  primaryMuted: '#C7D2FE',

  priorityHigh: '#EF4444',
  priorityHighBg: '#FEE2E2',
  priorityHighBorder: '#FCA5A5',
  priorityHighText: '#B91C1C',

  priorityMedium: '#F59E0B',
  priorityMediumBg: '#FEF3C7',
  priorityMediumBorder: '#FCD34D',
  priorityMediumText: '#B45309',

  priorityLow: '#10B981',
  priorityLowBg: '#D1FAE5',
  priorityLowBorder: '#6EE7B7',
  priorityLowText: '#047857',

  categoryStudy: '#2563EB',
  categoryStudyBg: '#DBEAFE',
  categoryWork: '#7C3AED',
  categoryWorkBg: '#EDE9FE',
  categoryHealth: '#059669',
  categoryHealthBg: '#D1FAE5',
  categoryPersonal: '#EA580C',
  categoryPersonalBg: '#FFEDD5',

  background: '#F8FAFC',
  card: '#FFFFFF',
  cardAlt: '#F1F5F9',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',

  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textLight: '#FFFFFF',

  danger: '#DC2626',
  dangerBg: '#FEE2E2',
  dangerBorder: '#F87171',
  success: '#16A34A',
  successBg: '#DCFCE7',
  warning: '#D97706',

  disabledBg: '#E2E8F0',
  disabledText: '#94A3B8',
  disabledBorder: '#CBD5E1',
};

export const commonStyles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardShadowHover: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
});
