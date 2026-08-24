package com.taskmanager.e2e.pages;

import org.openqa.selenium.By;

public final class Locators {

  private Locators() {}

  public static By testId(String id) {
    return By.cssSelector("[data-testid='" + id + "']");
  }
}
