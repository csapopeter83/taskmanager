import { APIRequestContext } from '@playwright/test';
import { CreateTaskRequest } from '../models/create-task-request';
import { ErrorResponse } from '../models/error-response';
import { ResponseBase } from '../models/response-base';
import { TaskResponse } from '../models/task-response';
import { TasksResponse } from '../models/tasks-response';
import { UpdateTaskRequest } from '../models/update-task-request';

export const getTasks = async (
  request: APIRequestContext,
  headers?: { Authorization: string },
  body?: undefined
): Promise<TasksResponse | ErrorResponse> => {
  const response = await request.get('/tasks', {
    headers,
    data: body,
  });

  const status = response.status();
  const responseObj = await response.json();

  if (Array.isArray(responseObj)) {
    return { tasks: responseObj, status };
  }

  return { ...responseObj, status };
};

export const createTask = async (
  request: APIRequestContext,
  headers?: { Authorization: string },
  body?: CreateTaskRequest
): Promise<TaskResponse | ErrorResponse> => {
  const response = await request.post('/tasks', {
    headers,
    data: body,
  });

  const status = response.status();
  const responseObj = await response.json();

  return { ...responseObj, status };
};

export const getTaskById = async (
  request: APIRequestContext,
  id: string,
  headers?: { Authorization: string }
): Promise<TaskResponse | ErrorResponse> => {
  const response = await request.get(`/tasks/${id}`, {
    headers,
  });

  const status = response.status();
  const responseObj = await response.json();

  return { ...responseObj, status };
};

export const updateTask = async (
  request: APIRequestContext,
  id: string,
  headers?: { Authorization: string },
  body?: UpdateTaskRequest
): Promise<TaskResponse | ErrorResponse> => {
  const response = await request.put(`/tasks/${id}`, {
    headers,
    data: body,
  });

  const status = response.status();
  const responseObj = await response.json();

  return { ...responseObj, status };
};

export const deleteTask = async (
  request: APIRequestContext,
  id: string,
  headers?: { Authorization: string }
): Promise<ResponseBase | ErrorResponse> => {
  const response = await request.delete(`/tasks/${id}`, {
    headers,
  });

  const status = response.status();

  if (status === 204) {
    return { status };
  }

  const responseObj = await response.json();
  return { ...responseObj, status };
};
