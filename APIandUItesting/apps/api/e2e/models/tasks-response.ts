import { ResponseBase } from './response-base';
import { Task } from './task';

export interface TasksResponse extends ResponseBase {
  tasks: Task[];
}
