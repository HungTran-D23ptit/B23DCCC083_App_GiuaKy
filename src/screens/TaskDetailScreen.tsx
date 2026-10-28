import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/task';
import { useTasks } from '../context/TaskContext';
import { commonStyles } from '../theme/colors';
import { isTaskOverdue, getDueDateStatus } from '../utils/dateUtils';
import { styles } from './TaskDetailScreen.styles';

type TaskDetailProps = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export const TaskDetailScreen: React.FC<TaskDetailProps> = ({
  route,
  navigation,
}) => {
  const { taskId } = route.params;
  const { getTaskById, toggleTaskDone, deleteTask } = useTasks();

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundIcon}>⚠️</Text>
        <Text style={styles.notFoundTitle}>Không tìm thấy công việc</Text>
        <Text style={styles.notFoundSubtitle}>
          Công việc này có thể đã bị xoá.
        </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backBtnText}>Quay lại danh sách</Text>
        </Pressable>
      </View>
    );
  }

  const overdue = isTaskOverdue(task.dueDate, task.done);
  const dueStatus = getDueDateStatus(task.dueDate);

  const getPriorityBadgeStyle = () => {
    switch (task.priority) {
      case 'Cao':
        return styles.priorityHighBadge;
      case 'Trung bình':
        return styles.priorityMediumBadge;
      case 'Thấp':
      default:
        return styles.priorityLowBadge;
    }
  };

  const getPriorityTextStyle = () => {
    switch (task.priority) {
      case 'Cao':
        return styles.priorityHighText;
      case 'Trung bình':
        return styles.priorityMediumText;
      case 'Thấp':
      default:
        return styles.priorityLowText;
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

  const handleDelete = () => {
    Alert.alert(
      'Xác nhận xoá',
      `Bạn có chắc chắn muốn xoá công việc "${task.title}" không?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.card, commonStyles.cardShadow]}>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusBadge,
              task.done ? styles.statusBadgeDone : styles.statusBadgePending,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                task.done ? styles.statusBadgeTextDone : styles.statusBadgeTextPending,
              ]}
            >
              {task.done ? '✓ Đã hoàn thành' : '⏳ Chưa hoàn thành'}
            </Text>
          </View>

          {overdue && (
            <View style={styles.overdueBadge}>
              <Text style={styles.overdueBadgeText}>Quá hạn</Text>
            </View>
          )}
        </View>

        <Text style={[styles.title, task.done && styles.titleCompleted]}>
          {task.title}
        </Text>

        <View style={styles.divider} />

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Danh mục</Text>
            <View
              style={[
                styles.categoryBadge,
                getCategoryBadgeStyle(),
              ]}
            >
              <Text
                style={[styles.categoryBadgeText, getCategoryTextStyle()]}
              >
                {task.category}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mức ưu tiên</Text>
            <View
              style={[
                styles.priorityBadge,
                getPriorityBadgeStyle(),
              ]}
            >
              <Text
                style={[styles.priorityBadgeText, getPriorityTextStyle()]}
              >
                {task.priority === 'Cao'
                  ? '🔴 '
                  : task.priority === 'Trung bình'
                  ? '🟡 '
                  : '🟢 '}
                {task.priority}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hạn hoàn thành</Text>
            <Text style={styles.infoValue}>📅 {task.dueDate}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Thời gian</Text>
            <View
              style={[
                styles.timeBadge,
                dueStatus.isOverdue
                  ? styles.timeBadgeOverdue
                  : dueStatus.isToday
                  ? styles.timeBadgeToday
                  : styles.timeBadgeRemaining,
              ]}
            >
              <Text
                style={[
                  styles.timeBadgeText,
                  dueStatus.isOverdue
                    ? styles.timeBadgeTextOverdue
                    : dueStatus.isToday
                    ? styles.timeBadgeTextToday
                    : styles.timeBadgeTextRemaining,
                ]}
              >
                {dueStatus.label}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.noteSection}>
          <Text style={styles.sectionHeading}>Ghi chú:</Text>
          <Text
            style={[
              styles.noteText,
              !task.note && styles.noteTextEmpty,
            ]}
          >
            {task.note ? task.note : 'Không có ghi chú nào cho công việc này.'}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <Pressable
          onPress={() => toggleTaskDone(task.id)}
          style={({ pressed }) => [
            styles.toggleDoneBtn,
            task.done ? styles.toggleDoneBtnUndone : styles.toggleDoneBtnDone,
            pressed && styles.pressedEffect,
          ]}
        >
          <Text
            style={[
              styles.toggleDoneText,
              task.done ? styles.toggleDoneTextUndone : styles.toggleDoneTextDone,
            ]}
          >
            {task.done ? '↩️ Đánh dấu chưa hoàn thành' : '✓ Đánh dấu hoàn thành'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('TaskForm', { task })}
          style={({ pressed }) => [
            styles.editBtn,
            pressed && styles.pressedEffect,
          ]}
        >
          <Text style={styles.editBtnText}>✏️ Chỉnh sửa công việc</Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.deleteBtn,
            pressed && styles.pressedEffect,
          ]}
        >
          <Text style={styles.deleteBtnText}>🗑️ Xoá công việc này</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

