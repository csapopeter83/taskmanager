package com.taskmanager.e2e.tests;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.taskmanager.e2e.models.CreateTask;
import com.taskmanager.e2e.pages.TaskPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class TaskTest extends TestBase {

    protected final CreateTask createTask = new CreateTask("automation task title", "automation task description");

  @BeforeEach
  void openMainPage() {
    mainPage.open();
    headerPage.openLogin();
    loginPopup.login(user);
  }

  @Test
  void successfulLoginWithValidCredentials() {
    dashboard.addTask(createTask);
    TaskPage task = dashboard.waitForTaskByTitle(createTask.title());
    task.delete();

    assertTrue(dashboard.findTaskByTitle(createTask.title()).isEmpty());
  }
}
