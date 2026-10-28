import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './EmptyState.styles';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'Không có công việc nào',
  subMessage = 'Hãy nhấn nút "+ Thêm việc" để bắt đầu lên kế hoạch!',
  icon = '📋',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.message}>{message}</Text>
      {subMessage ? <Text style={styles.subMessage}>{subMessage}</Text> : null}
    </View>
  );
};
