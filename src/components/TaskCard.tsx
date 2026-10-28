import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Task } from '../types/task';
import { commonStyles } from '../theme/colors';
import { isTaskOverdue } from '../utils/dateUtils';
import { styles } from './TaskCard.styles';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onLongPress: () => void;
  onToggleDone: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onLongPress,
  onToggleDone,
}) => {
  const overdue = isTaskOverdue(task.dueDate, task.done);

  const getPriorityStyle = () => {
    switch (task.priority) {
      case 'Cao':
        return {
          container: styles.priorityHighBg,
          text: styles.priorityHighText,
        };
      case 'Trung bình':
        return {
          container: styles.priorityMediumBg,
          text: styles.priorityMediumText,
        };
      case 'Thấp':
      default:
        return {
          container: styles.priorityLowBg,
          text: styles.priorityLowText,
        };
    }
  };

  const getCategoryBadgeStyle = () => {
    switch (task.category) {
      case 'Học tập':
        return styles.categoryStudyBadge;
      case 'Công việc':
        return styles.categoryWorkBadge;
      case 'Sức khoẻ':
        return styles.categoryHealthBadge;
      case 'Cá nhân':
      default:
        return styles.categoryPersonalBadge;
    }
  };

  const getCategoryTextStyle = () => {
    switch (task.category) {
      case 'Học tập':
        return styles.categoryStudyText;
      case 'Công việc':
        return styles.categoryWorkText;
      case 'Sức khoẻ':
        return styles.categoryHealthText;
      case 'Cá nhân':
      default:
        return styles.categoryPersonalText;
    }
  };

  const priorityStyle = getPriorityStyle();

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
      android_ripple={{ color: '#E2E8F0' }}
      style={({ pressed }) => [
        styles.card,
        commonStyles.cardShadow,
        task.done && styles.cardCompleted,
        overdue && styles.cardOverdue,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.row}>
        <Pressable
          hitSlop={8}
          onPress={onToggleDone}
          style={({ pressed }) => [
            styles.checkbox,
            task.done && styles.checkboxChecked,
            pressed && styles.checkboxPressed,
          ]}
        >
          {task.done ? (
            <Text style={styles.checkmark}>✓</Text>
          ) : (
            <View style={styles.checkboxEmpty} />
          )}
        </Pressable>

        <View style={styles.content}>
          <View style={styles.badgesRow}>
            <View style={[styles.categoryBadge, getCategoryBadgeStyle()]}>
              <Text
                style={[styles.categoryBadgeText, getCategoryTextStyle()]}
              >
                {task.category}
              </Text>
            </View>

            {overdue && (
              <View style={styles.overdueBadge}>
                <Text style={styles.overdueBadgeText}>Quá hạn</Text>
              </View>
            )}
          </View>

          <Text
            numberOfLines={2}
            style={[
              styles.title,
              task.done && styles.titleCompleted,
            ]}
          >
            {task.title}
          </Text>

          <View style={styles.footerRow}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text
                style={[
                  styles.dateText,
                  overdue && styles.dateTextOverdue,
                  task.done && styles.textMuted,
                ]}
              >
                {task.dueDate}
              </Text>
            </View>

            <View style={[styles.priorityBadge, priorityStyle.container]}>
              <Text style={[styles.priorityText, priorityStyle.text]}>
                {task.priority}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

