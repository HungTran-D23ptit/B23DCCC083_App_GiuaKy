import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../theme/colors';
import { styles } from './HeaderProgressBar.styles';

interface HeaderProgressBarProps {
  total: number;
  completed: number;
}

export const HeaderProgressBar: React.FC<HeaderProgressBarProps> = ({ total, completed }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={[styles.card, commonStyles.cardShadow]}>
      <View style={styles.topRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Tiến độ hoàn thành</Text>
          <Text style={styles.subtitle}>
            {total > 0
              ? `Đã hoàn thành ${completed}/${total} công việc`
              : 'Chưa có công việc nào'}
          </Text>
        </View>
        <View style={[styles.badge, percentage === 100 ? styles.badgeSuccess : styles.badgeNormal]}>
          <Text style={[styles.badgeText, percentage === 100 ? styles.badgeSuccessText : styles.badgeNormalText]}>
            {percentage}%
          </Text>
        </View>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%` },
            percentage === 100 ? styles.fillSuccess : styles.fillNormal,
          ]}
        />
      </View>
    </View>
  );
};
