import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { FilterStatus, SortBy } from '../types/task';
import { colors } from '../theme/colors';
import { styles } from './FilterBar.styles';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  currentSort: SortBy;
  onSortChange: (sort: SortBy) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
    overdue: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  currentFilter,
  onFilterChange,
  currentSort,
  onSortChange,
  counts,
}) => {
  const filterOptions: { key: FilterStatus; label: string; count: number }[] = [
    { key: 'all', label: 'Tất cả', count: counts.all },
    { key: 'pending', label: 'Chưa xong', count: counts.pending },
    { key: 'completed', label: 'Đã xong', count: counts.completed },
    { key: 'overdue', label: 'Quá hạn', count: counts.overdue },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên công việc..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={onSearchChange}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <Pressable
            hitSlop={8}
            onPress={() => onSearchChange('')}
            style={styles.clearBtn}
          >
            <Text style={styles.clearBtnText}>✕</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.filterRow}>
        {filterOptions.map(item => {
          const isActive = currentFilter === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => onFilterChange(item.key)}
              style={({ pressed }) => [
                styles.filterPill,
                isActive ? styles.filterPillActive : styles.filterPillInactive,
                item.key === 'overdue' && !isActive && counts.overdue > 0 && styles.overduePillBorder,
                pressed && styles.pressedEffect,
              ]}
            >
              <Text
                style={[
                  styles.filterPillText,
                  isActive
                    ? styles.filterPillTextActive
                    : item.key === 'overdue' && counts.overdue > 0
                    ? styles.overdueText
                    : styles.filterPillTextInactive,
                ]}
              >
                {item.label} ({item.count})
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sắp xếp:</Text>
        <View style={styles.sortButtonsContainer}>
          <Pressable
            onPress={() => onSortChange('dueDate')}
            style={({ pressed }) => [
              styles.sortBtn,
              currentSort === 'dueDate' ? styles.sortBtnActive : styles.sortBtnInactive,
              pressed && styles.pressedEffect,
            ]}
          >
            <Text
              style={[
                styles.sortBtnText,
                currentSort === 'dueDate' ? styles.sortBtnTextActive : styles.sortBtnTextInactive,
              ]}
            >
              📅 Hạn gần nhất
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onSortChange('priority')}
            style={({ pressed }) => [
              styles.sortBtn,
              currentSort === 'priority' ? styles.sortBtnActive : styles.sortBtnInactive,
              pressed && styles.pressedEffect,
            ]}
          >
            <Text
              style={[
                styles.sortBtnText,
                currentSort === 'priority' ? styles.sortBtnTextActive : styles.sortBtnTextInactive,
              ]}
            >
              ⚡ Ưu tiên (Cao→Thấp)
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
