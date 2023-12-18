import { Request } from 'express';

export type QueryType = {
    sort: string,
    skip: number,
    limit: number
}

export type RequestType = Request & {
  user: {
    id: string,
    name: string,
    email: string
  };
  query: QueryType
}

export type UpdateTaskType = {
  title: string;
  description: string;
  status: string;
  priority: string;
} | null

export type UserType =  {
  id: string;
  name: string;
  email: string;
  password: string;
  date: Date;
  isValidPassword(password: string): Promise<boolean>;
} | null

export type TaskType ={
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  user: string; 
}
