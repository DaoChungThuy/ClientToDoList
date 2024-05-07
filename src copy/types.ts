export interface Category {
  id: number
  name: string
}

export interface Task {
  id: number | null;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  status: number | 1;
}

export interface User {
  id: number
  email: string
  name: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  email_verified_at: string | null
}

export interface Category {
  id: number
  name: string
  created_at: string | null
  updated_at: string | null
}
