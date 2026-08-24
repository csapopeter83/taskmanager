package com.taskmanager.e2e.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class HeaderPage extends BasePage {

  private static final String LOGIN_BUTTON_TEST_ID = "open-login-button";

  public HeaderPage(WebDriver driver) {
    super(driver);
  }

  private WebElement loginButton() {
    return driver.findElement(Locators.testId(LOGIN_BUTTON_TEST_ID));
  }

  public void openLogin() {
    loginButton().click();
  }
}
