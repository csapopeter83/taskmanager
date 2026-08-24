import { randomUUID } from 'node:crypto';
import { CreateTaskRequest } from './models/create-task-request';
import { LoginSuccessResponse } from './models/login-response';
import { TaskResponse } from './models/task-response';
import { TasksResponse } from './models/tasks-response';
import { loginRequest } from './services/auth-service';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from './services/task-service';
import { expect, test } from './test-base';

test.describe('Tasks API', () => {
  let accessToken: string;
  let authHeaders: { Authorization: string };

  const validRequestBody = () => ({
    title: `automation ${randomUUID()}`,
    description: 'Q3 summary',
  });

  const missingTitleRequest = {
    description: 'automation missing title',
  } as CreateTaskRequest;

  test.beforeAll(async ({ request, user }) => {
    const response = (await loginRequest(request, user)) as LoginSuccessResponse;

    accessToken = response.accessToken;
    authHeaders = { Authorization: `Bearer ${response.accessToken}` };
  });

  test.afterAll(async ({ request }) => {
    const response = (await getTasks(request, authHeaders)) as TasksResponse;
    const automationTasks = response.tasks.filter(
      (t) => t.title.includes('automation') || t.description.includes('automation')
    );

    await Promise.all(automationTasks.map((t) => deleteTask(request, t.id, authHeaders)));
  });

  test('get tasks without a token returns with 401', async ({ request }) => {
    const response = await getTasks(request);

    expect(response.status).toBe(401);
  });

  test('get tasks with an invalid token returns with 401', async ({ request }) => {
    const response = await getTasks(request, { Authorization: 'Bearer not-a-real-token' });

    expect(response.status).toBe(401);
  });

  test('get tasks with a malformed Authorization header returns with 401', async ({ request }) => {
    const response = await getTasks(request, { Authorization: `Token ${accessToken}` });

    expect(response.status).toBe(401);
  });

  test('create task with the expected fields is successful', async ({ request }) => {
    const body = validRequestBody();
    const task = (await createTask(request, authHeaders, body)) as TaskResponse;

    expect(task.status).toBe(201);
    expect(task.title).toBe(body.title);
    expect(task.description).toBe(body.description);
    expect(task.id).toBeTruthy();
    expect(task.creationDate).toBeTruthy();
    expect(task.modificationDate).toBe(task.creationDate);
  });

  test('create task without a title is rejected', async ({ request }) => {
    const response = await createTask(request, authHeaders, missingTitleRequest);

    expect(response.status).toBe(400);
  });

  test('get tasks with valid token returns with values', async ({ request }) => {
    const response = (await getTasks(request, authHeaders)) as TasksResponse;

    expect(response.status).toBe(200);
    expect(response.tasks.length).toBeGreaterThan(0);
  });

  test('get all tasks includes a previously created task', async ({ request }) => {
    const created = (await createTask(request, authHeaders, validRequestBody())) as TaskResponse;

    const response = (await getTasks(request, authHeaders)) as TasksResponse;

    expect(response.status).toBe(200);
    expect(Array.isArray(response.tasks)).toBe(true);
    expect(response.tasks.some((t) => t.id === created.id)).toBe(true);
  });

  test('get task by id returns the appropriate value', async ({ request }) => {
    const created = (await createTask(request, authHeaders, validRequestBody())) as TaskResponse;

    const response = (await getTaskById(request, created.id, authHeaders)) as TaskResponse;

    expect(response.status).toBe(200);
    expect(response.title).toBe(created.title);
    expect(response.description).toBe(created.description);
  });

  test('get task by invalid id returns 404', async ({ request }) => {
    const response = await getTaskById(request, 'does-not-exist', authHeaders);

    expect(response.status).toBe(404);
  });

  test('update task and updates modificationDate and the value', async ({ request }) => {
    const updatedDescription = 'automation updated description';
    const created = (await createTask(request, authHeaders, validRequestBody())) as TaskResponse;

    const updated = (await updateTask(request, created.id, authHeaders, {
      description: updatedDescription,
    })) as TaskResponse;

    expect(updated.status).toBe(200);
    expect(updated.description).toBe(updatedDescription);
    expect(updated.creationDate).toBe(created.creationDate);
    expect(new Date(updated.modificationDate).getTime()).toBeGreaterThanOrEqual(
      new Date(created.modificationDate).getTime()
    );
  });

  test('update task with invalid id returns 404', async ({ request }) => {
    const response = await updateTask(request, 'does-not-exist', authHeaders, {
      title: 'irrelevant',
    });

    expect(response.status).toBe(404);
  });

  test('deleted task by id is not available anymore', async ({ request }) => {
    const created = (await createTask(request, authHeaders, {
      title: 'automation Temporary task',
    })) as TaskResponse;

    const deleteResponse = await deleteTask(request, created.id, authHeaders);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await getTaskById(request, created.id, authHeaders);
    expect(getResponse.status).toBe(404);
  });

  test('delete task with invalid id returns 404', async ({ request }) => {
    const response = await deleteTask(request, 'does-not-exist', authHeaders);

    expect(response.status).toBe(404);
  });
});
