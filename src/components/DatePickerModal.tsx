import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import { commonStyles } from '../theme/colors';
import { parseDate, getTodayDate } from '../utils/dateUtils';
import { styles } from './DatePickerModal.styles';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (dateStr: string) => void;
  initialDateStr?: string;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onSelectDate,
  initialDateStr,
}) => {
  const today = getTodayDate();
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [activeDateStr, setActiveDateStr] = useState<string>(initialDateStr || '');

  useEffect(() => {
    if (visible && initialDateStr) {
      const parsed = parseDate(initialDateStr);
      if (parsed) {
        setSelectedYear(parsed.getFullYear());
        setSelectedMonth(parsed.getMonth());
        setActiveDateStr(initialDateStr);
        return;
      }
    }
    const now = getTodayDate();
    setSelectedYear(now.getFullYear());
    setSelectedMonth(now.getMonth());
  }, [visible, initialDateStr]);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayIndex = (new Date(selectedYear, selectedMonth, 1).getDay() + 6) % 7;

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const d = String(day).padStart(2, '0');
    const m = String(selectedMonth + 1).padStart(2, '0');
    const dateStr = `${d}/${m}/${selectedYear}`;
    setActiveDateStr(dateStr);
    onSelectDate(dateStr);
    onClose();
  };

  const weekHeaders = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const calendarCells = [];

  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.calendarContainer, commonStyles.cardShadow]}>
          <View style={styles.headerRow}>
            <Pressable
              hitSlop={8}
              onPress={handlePrevMonth}
              style={({ pressed }) => [
                styles.navBtn,
                pressed && styles.pressedEffect,
              ]}
            >
              <Text style={styles.navBtnText}>◀</Text>
            </Pressable>

            <Text style={styles.monthTitle}>
              Tháng {selectedMonth + 1}, {selectedYear}
            </Text>

            <Pressable
              hitSlop={8}
              onPress={handleNextMonth}
              style={({ pressed }) => [
                styles.navBtn,
                pressed && styles.pressedEffect,
              ]}
            >
              <Text style={styles.navBtnText}>▶</Text>
            </Pressable>
          </View>

          <View style={styles.weekHeaderRow}>
            {weekHeaders.map((header, idx) => (
              <View key={header} style={styles.cellContainer}>
                <Text
                  style={[
                    styles.weekHeaderText,
                    idx === 6 && styles.sundayText,
                  ]}
                >
                  {header}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.grid}>
            {calendarCells.map((day, index) => {
              if (day === null) {
                return (
                  <View key={`empty-${index}`} style={styles.cellContainer} />
                );
              }

              const d = String(day).padStart(2, '0');
              const m = String(selectedMonth + 1).padStart(2, '0');
              const cellDateStr = `${d}/${m}/${selectedYear}`;

              const isSelected = activeDateStr === cellDateStr;
              const isToday =
                today.getDate() === day &&
                today.getMonth() === selectedMonth &&
                today.getFullYear() === selectedYear;

              return (
                <View key={`day-${day}`} style={styles.cellContainer}>
                  <Pressable
                    onPress={() => handleSelectDay(day)}
                    style={({ pressed }) => [
                      styles.dayButton,
                      isSelected && styles.dayButtonSelected,
                      isToday && !isSelected && styles.dayButtonToday,
                      pressed && styles.pressedEffect,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.dayTextSelected,
                        isToday && !isSelected && styles.dayTextToday,
                      ]}
                    >
                      {day}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>

          <View style={styles.footerRow}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeBtn,
                pressed && styles.pressedEffect,
              ]}
            >
              <Text style={styles.closeBtnText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

