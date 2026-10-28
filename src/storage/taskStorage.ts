import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';
import { getOffsetDateString } from '../utils/dateUtils';

const STORAGE_KEY = '@student_planner_tasks_v2';

export function getInitialSampleTasks(): Task[] {
  return [
    {
      id: 'task_sample_1',
      title: 'Nộp bài tập lớn Lập trình Di động',
      note: 'Nộp file nén mã nguồn dự án và slide báo cáo qua hệ thống trường.',
      category: 'Học tập',
      priority: 'Cao',
      dueDate: getOffsetDateString(-3),
      done: false,
    },
    {
      id: 'task_sample_2',
      title: 'Đọc tài liệu React Navigation & Storage',
      note: 'Tìm hiểu Native Stack Navigator và cách lưu dữ liệu với AsyncStorage.',
      category: 'Học tập',
      priority: 'Trung bình',
      dueDate: getOffsetDateString(-1),
      done: true,
    },
    {
      id: 'task_sample_3',
      title: 'Họp nhóm hoàn thiện slide báo cáo',
      note: 'Họp online qua Google Meet lúc 20:00 để duyệt lại các phần thuyết trình.',
      category: 'Học tập',
      priority: 'Cao',
      dueDate: getOffsetDateString(0),
      done: false,
    },
    {
      id: 'task_sample_4',
      title: 'Chạy bộ 5km rèn luyện sức khoẻ',
      note: 'Duy trì thói quen tập luyện thể thao tại công viên gần trường.',
      category: 'Sức khoẻ',
      priority: 'Thấp',
      dueDate: getOffsetDateString(2),
      done: false,
    },
    {
      id: 'task_sample_5',
      title: 'Chuẩn bị CV ứng tuyển thực tập',
      note: 'Cập nhật các dự án React Native cá nhân và kỹ năng mềm vào CV.',
      category: 'Công việc',
      priority: 'Cao',
      dueDate: getOffsetDateString(4),
      done: false,
    },
    {
      id: 'task_sample_6',
      title: 'Mua sắm giáo trình và đồ dùng học tập',
      note: 'Mua tập vở mới và dụng cụ ghi chép cho học kỳ mới.',
      category: 'Cá nhân',
      priority: 'Thấp',
      dueDate: getOffsetDateString(7),
      done: false,
    },
  ];
}

export async function loadTasksFromStorage(): Promise<Task[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      const parsed = JSON.parse(jsonValue);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    const initialTasks = getInitialSampleTasks();
    await saveTasksToStorage(initialTasks);
    return initialTasks;
  } catch (error) {
    console.error('Error loading tasks from AsyncStorage:', error);
    return getInitialSampleTasks();
  }
}

export async function saveTasksToStorage(tasks: Task[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving tasks to AsyncStorage:', error);
    throw error;
  }
}
