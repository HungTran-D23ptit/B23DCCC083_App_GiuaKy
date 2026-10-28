import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, Task, FilterStatus, SortBy } from '../types/task';
import { useTasks } from '../context/TaskContext';
import { HeaderProgressBar } from '../components/HeaderProgressBar';
import { FilterBar } from '../components/FilterBar';
import { TaskCard } from '../components/TaskCard';
import { EmptyState } from '../components/EmptyState';
import { colors, commonStyles } from '../theme/colors';
import {
  isTaskOverdue,
  compareDueDates,
  priorityWeight,
} from '../utils/dateUtils';
import { styles } from './TaskListScreen.styles';

type TaskListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TaskList'
>;

export const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<TaskListNavigationProp>();
  const { tasks, isLoading, toggleTaskDone, deleteTask, deleteCompletedTasks } =
    useTasks();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>('all');
  const [currentSort, setCurrentSort] = useState<SortBy>('dueDate');

  const counts = useMemo(() => {
    let pending = 0;
    let completed = 0;
    let overdue = 0;

    tasks.forEach(t => {
      if (t.done) {
        completed++;
      } else {
        pending++;
        if (isTaskOverdue(t.dueDate, t.done)) {
          overdue++;
        }
      }
    });

    return {
      all: tasks.length,
      pending,
      completed,
      overdue,
    };
  }, [tasks]);

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter(t => {
        if (currentFilter === 'pending') return !t.done;
        if (currentFilter === 'completed') return t.done;
        if (currentFilter === 'overdue') return isTaskOverdue(t.dueDate, t.done);
        return true;
      })
      .filter(t => {
        if (!searchQuery.trim()) return true;
        return t.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
      })
      .sort((a, b) => {
        if (currentSort === 'dueDate') {
          return compareDueDates(a.dueDate, b.dueDate);
        } else {
          const weightA = priorityWeight[a.priority] || 0;
          const weightB = priorityWeight[b.priority] || 0;
          return weightB - weightA;
        }
      });
  }, [tasks, currentFilter, searchQuery, currentSort]);

  const handleLongPressTask = (task: Task) => {
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
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteCompleted = () => {
    if (counts.completed === 0) return;

    Alert.alert(
      'Xoá việc đã hoàn thành',
      `Bạn có chắc muốn xoá ${counts.completed} công việc đã hoàn thành không?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            await deleteCompletedTasks();
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Đang tải danh sách công việc...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredAndSortedTasks}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <HeaderProgressBar
              total={counts.all}
              completed={counts.completed}
            />

            <View style={styles.actionsBar}>
              <Pressable
                onPress={() => navigation.navigate('TaskForm', {})}
                style={({ pressed }) => [
                  styles.addBtn,
                  commonStyles.cardShadow,
                  pressed && styles.pressedEffect,
                ]}
              >
                <Text style={styles.addBtnText}>+ Thêm việc</Text>
              </Pressable>

              <Pressable
                disabled={counts.completed === 0}
                onPress={handleDeleteCompleted}
                style={({ pressed }) => [
                  styles.deleteCompletedBtn,
                  counts.completed === 0
                    ? styles.deleteCompletedBtnDisabled
                    : styles.deleteCompletedBtnActive,
                  pressed && counts.completed > 0 && styles.pressedEffect,
                ]}
              >
                <Text
                  style={[
                    styles.deleteCompletedText,
                    counts.completed === 0
                      ? styles.deleteCompletedTextDisabled
                      : styles.deleteCompletedTextActive,
                  ]}
                >
                  🗑️ Xoá việc đã xong ({counts.completed})
                </Text>
              </Pressable>
            </View>

            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              counts={counts}
            />
          </View>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
            onLongPress={() => handleLongPressTask(item)}
            onToggleDone={() => toggleTaskDone(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            message={
              searchQuery.trim()
                ? 'Không tìm thấy công việc phù hợp'
                : currentFilter === 'overdue'
                ? 'Tuyệt vời! Không có việc nào bị quá hạn'
                : currentFilter === 'completed'
                ? 'Chưa có công việc nào hoàn thành'
                : currentFilter === 'pending'
                ? 'Không có việc nào chưa xong'
                : 'Chưa có công việc nào'
            }
            subMessage={
              searchQuery.trim()
                ? 'Thử thay đổi từ khoá tìm kiếm hoặc đặt lại bộ lọc'
                : 'Nhấn vào nút "+ Thêm việc" phía trên để tạo công việc mới'
            }
            icon={currentFilter === 'overdue' && counts.overdue === 0 ? '🎉' : '📋'}
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

