export type Category = 'Học tập' | 'Công việc' | 'Sức khoẻ' | 'Cá nhân';

export type Priority = 'Cao' | 'Trung bình' | 'Thấp';

export type FilterStatus = 'all' | 'pending' | 'completed' | 'overdue';

export type SortBy = 'dueDate' | 'priority';

export interface Task {
  id: string;
  title: string;
  note?: string;
  category: Category;
  priority: Priority;
  dueDate: string;
  done: boolean;
}

export type RootStackParamList = {
  TaskList: undefined;
  TaskForm: { task?: Task };
  TaskDetail: { taskId: string };
};
