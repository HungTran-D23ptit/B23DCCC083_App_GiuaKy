import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Category, Priority, Task } from '../types/task';
import { useTasks } from '../context/TaskContext';
import { colors, commonStyles } from '../theme/colors';
import {
  isValidDateFormat,
  parseDate,
  isPastDate,
  formatDate,
  getTodayDate,
  getOffsetDateString,
} from '../utils/dateUtils';
import { DatePickerModal } from '../components/DatePickerModal';
import { styles } from './TaskFormScreen.styles';

type TaskFormProps = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;

export const TaskFormScreen: React.FC<TaskFormProps> = ({ route, navigation }) => {
  const existingTask: Task | undefined = route.params?.task;
  const isEditMode = Boolean(existingTask);

  const { addTask, updateTask } = useTasks();

  const [title, setTitle] = useState<string>(existingTask?.title ?? '');
  const [note, setNote] = useState<string>(existingTask?.note ?? '');
  const [category, setCategory] = useState<Category>(
    existingTask?.category ?? 'Học tập'
  );
  const [priority, setPriority] = useState<Priority>(
    existingTask?.priority ?? 'Trung bình'
  );
  const [dueDate, setDueDate] = useState<string>(
    existingTask?.dueDate ?? formatDate(getTodayDate())
  );

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string>('');
  const [dueDateError, setDueDateError] = useState<string>('');

  const scrollViewRef = useRef<any>(null);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const categories: Category[] = ['Học tập', 'Công việc', 'Sức khoẻ', 'Cá nhân'];
  const priorities: Priority[] = ['Cao', 'Trung bình', 'Thấp'];

  const validate = (): boolean => {
    let isValid = true;

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleError('Tên công việc không được để trống');
      isValid = false;
    } else if (trimmedTitle.length > 50) {
      setTitleError('Tên công việc không được vượt quá 50 ký tự');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!isValidDateFormat(dueDate)) {
      setDueDateError('Hạn hoàn thành phải đúng định dạng dd/mm/yyyy (ví dụ: 28/10/2026)');
      isValid = false;
    } else {
      const parsed = parseDate(dueDate);
      if (!parsed) {
        setDueDateError('Ngày không hợp lệ trên lịch (ví dụ 31/02/2026 là sai)');
        isValid = false;
      } else if (!isEditMode && isPastDate(dueDate)) {
        setDueDateError('Khi thêm mới, hạn không được trước ngày hôm nay');
        isValid = false;
      } else {
        setDueDateError('');
      }
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    if (isEditMode && existingTask) {
      await updateTask({
        ...existingTask,
        title: title.trim(),
        note: note.trim(),
        category,
        priority,
        dueDate: dueDate.trim(),
      });
    } else {
      await addTask({
        title: title.trim(),
        note: note.trim(),
        category,
        priority,
        dueDate: dueDate.trim(),
      });
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          keyboardVisible && styles.scrollContentKeyboard,
        ]}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={[styles.card, commonStyles.cardShadow]}>
          <Text style={styles.formHeading}>
            {isEditMode ? 'Chỉnh sửa công việc' : 'Thông tin công việc mới'}
          </Text>

          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>
                Tên công việc <Text style={styles.requiredStar}>*</Text>
              </Text>
              <Text
                style={[
                  styles.charCount,
                  title.length > 50 && styles.charCountOver,
                ]}
              >
                {title.length}/50
              </Text>
            </View>
            <TextInput
              style={[
                styles.input,
                titleError ? styles.inputError : undefined,
              ]}
              placeholder="Nhập tên công việc (tối đa 50 ký tự)..."
              placeholderTextColor={colors.textMuted}
              value={title}
              maxLength={60}
              onChangeText={val => {
                setTitle(val);
                if (titleError) setTitleError('');
              }}
            />
            {titleError ? (
              <Text style={styles.errorText}>{titleError}</Text>
            ) : null}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Danh mục <Text style={styles.requiredStar}>*</Text>
            </Text>
            <View style={styles.pillGroup}>
              {categories.map(cat => {
                const isSelected = category === cat;
                return (
                  <Pressable
                    key={cat}
                    onPress={() => setCategory(cat)}
                    style={({ pressed }) => [
                      styles.choicePill,
                      isSelected ? styles.choicePillSelected : styles.choicePillUnselected,
                      pressed && styles.pressedEffect,
                    ]}
                  >
                    <Text
                      style={[
                        styles.choicePillText,
                        isSelected ? styles.choicePillTextSelected : styles.choicePillTextUnselected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Mức ưu tiên <Text style={styles.requiredStar}>*</Text>
            </Text>
            <View style={styles.pillGroup}>
              {priorities.map(p => {
                const isSelected = priority === p;
                return (
                  <Pressable
                    key={p}
                    onPress={() => setPriority(p)}
                    style={({ pressed }) => [
                      !isSelected && styles.choicePillUnselected,
                      isSelected && p === 'Cao' && styles.priorityPillSelectedCao,
                      isSelected && p === 'Trung bình' && styles.priorityPillSelectedTrungBinh,
                      isSelected && p === 'Thấp' && styles.priorityPillSelectedThap,
                      styles.choicePill,
                      pressed && styles.pressedEffect,
                    ]}
                  >
                    <Text
                      style={[
                        styles.choicePillText,
                        !isSelected && styles.choicePillTextUnselected,
                        isSelected && p === 'Cao' && styles.priorityTextCao,
                        isSelected && p === 'Trung bình' && styles.priorityTextTrungBinh,
                        isSelected && p === 'Thấp' && styles.priorityTextThap,
                      ]}
                    >
                      {p === 'Cao' ? '🔴 ' : p === 'Trung bình' ? '🟡 ' : '🟢 '}
                      {p}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>
                Hạn hoàn thành (dd/mm/yyyy) <Text style={styles.requiredStar}>*</Text>
              </Text>
            </View>

            <View style={styles.quickDateRow}>
              <Pressable
                onPress={() => {
                  setDueDate(getOffsetDateString(0));
                  if (dueDateError) setDueDateError('');
                }}
                style={styles.quickDateBtn}
              >
                <Text style={styles.quickDateBtnText}>Hôm nay</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setDueDate(getOffsetDateString(1));
                  if (dueDateError) setDueDateError('');
                }}
                style={styles.quickDateBtn}
              >
                <Text style={styles.quickDateBtnText}>Ngày mai</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setDueDate(getOffsetDateString(7));
                  if (dueDateError) setDueDateError('');
                }}
                style={styles.quickDateBtn}
              >
                <Text style={styles.quickDateBtnText}>+1 tuần</Text>
              </Pressable>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={[styles.quickDateBtn, styles.calendarQuickBtn]}
              >
                <Text style={[styles.quickDateBtnText, styles.calendarQuickBtnText]}>
                  📅 Lịch
                </Text>
              </Pressable>
            </View>

            <View style={styles.dateInputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  styles.dateInputWithIcon,
                  dueDateError ? styles.inputError : undefined,
                ]}
                placeholder="dd/mm/yyyy (ví dụ: 28/10/2026)"
                placeholderTextColor={colors.textMuted}
                value={dueDate}
                keyboardType="numbers-and-punctuation"
                onChangeText={val => {
                  setDueDate(val);
                  if (dueDateError) setDueDateError('');
                }}
              />
              <Pressable
                hitSlop={8}
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerIconButton}
              >
                <Text style={styles.calendarIconText}>📅</Text>
              </Pressable>
            </View>
            {dueDateError ? (
              <Text style={styles.errorText}>{dueDateError}</Text>
            ) : null}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Ghi chú (tuỳ chọn)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Thêm thông tin chi tiết, liên kết hoặc yêu cầu..."
              placeholderTextColor={colors.textMuted}
              value={note}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 150);
              }}
              onChangeText={setNote}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                styles.saveBtn,
                pressed && styles.pressedEffect,
              ]}
            >
              <Text style={styles.saveBtnText}>
                {isEditMode ? 'Lưu thay đổi' : 'Tạo công việc'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [
                styles.cancelBtn,
                pressed && styles.pressedEffect,
              ]}
            >
              <Text style={styles.cancelBtnText}>Huỷ bỏ</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <DatePickerModal
        visible={showDatePicker}
        initialDateStr={dueDate}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={val => {
          setDueDate(val);
          if (dueDateError) setDueDateError('');
        }}
      />
    </KeyboardAvoidingView>
  );
};

