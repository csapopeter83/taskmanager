package com.taskmanager.e2e.pages;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.taskmanager.e2e.models.CreateTask;

public class DashboardPage extends BasePage {

  private static final String NEW_TASK_TITLE_TEST_ID = "new-task-title";
  private static final String NEW_TASK_DESCRIPTION_TEST_ID = "new-task-description";
  private static final String ADD_TASK_BUTTON_TEST_ID = "add-task-button";
  private static final String TASK_ROW_TEST_ID = "task-row";

  public DashboardPage(WebDriver driver) {
    super(driver);
  }

  private WebElement newTaskTitleInput() {
    return driver.findElement(Locators.testId(NEW_TASK_TITLE_TEST_ID));
  }

  private WebElement newTaskDescriptionInput() {
    return driver.findElement(Locators.testId(NEW_TASK_DESCRIPTION_TEST_ID));
  }

  private WebElement addTaskButton() {
    return driver.findElement(Locators.testId(ADD_TASK_BUTTON_TEST_ID));
  }

  public List<TaskPage> getAllTask() {
    return driver.findElements(Locators.testId(TASK_ROW_TEST_ID)).stream()
        .map(row -> new TaskPage(driver, row))
        .collect(Collectors.toList());
  }

  public Optional<TaskPage> findTaskByTitle(String title) {
    return getAllTask().stream().filter(task -> title.equals(task.getTitle())).findFirst();
  }

  public TaskPage waitForTaskByTitle(String title) {
    return wait.until(d -> findTaskByTitle(title).orElse(null));
  }

  public void addTask(CreateTask createTask) {
    if (createTask == null) {
      return;
    }
    waitVisible(Locators.testId(NEW_TASK_TITLE_TEST_ID));

    if (createTask.title() != null) {
      newTaskTitleInput().sendKeys(createTask.title());
    }

    if (createTask.description() != null) {
      newTaskDescriptionInput().sendKeys(createTask.description());
    }
  
    addTaskButton().click();
  }
}
