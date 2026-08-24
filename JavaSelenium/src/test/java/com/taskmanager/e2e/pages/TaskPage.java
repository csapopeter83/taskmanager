package com.taskmanager.e2e.pages;

import java.time.Duration;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TaskPage {

  private static final String TITLE_INPUT_TEST_ID = "task-title-input";
  private static final String DELETE_BUTTON_TEST_ID = "delete-task-button";

  private final WebElement row;
  private final WebDriverWait wait;

  public TaskPage(WebDriver driver, WebElement row) {
    this.row = row;
    this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
  }

  private WebElement titleInput() {
    return row.findElement(Locators.testId(TITLE_INPUT_TEST_ID));
  }

  public String getTitle() {
    return titleInput().getDomProperty("value");
  }

  public void delete() {
    row.findElement(Locators.testId(DELETE_BUTTON_TEST_ID)).click();
    wait.until(ExpectedConditions.stalenessOf(row));
  }
}
