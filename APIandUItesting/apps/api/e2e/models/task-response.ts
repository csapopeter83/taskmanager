import { ResponseBase } from './response-base';
import { Task } from './task';

export interface TaskResponse extends ResponseBase, Task {}
