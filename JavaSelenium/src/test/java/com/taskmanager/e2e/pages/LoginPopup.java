package com.taskmanager.e2e.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.taskmanager.e2e.models.User;

public class LoginPopup extends BasePage {

  private static final String TITLE_TEST_ID = "login-title";
  private static final String USERNAME_INPUT_TEST_ID = "username-input";
  private static final String PASSWORD_INPUT_TEST_ID = "password-input";
  private static final String LOGIN_BUTTON_TEST_ID = "login-submit";

  public LoginPopup(WebDriver driver) {
    super(driver);
  }

  private WebElement waitForOpen() {
    return waitVisible(Locators.testId(TITLE_TEST_ID));
  }

  private WebElement usernameInput() {
    return driver.findElement(Locators.testId(USERNAME_INPUT_TEST_ID));
  }

  private WebElement passwordInput() {
    return driver.findElement(Locators.testId(PASSWORD_INPUT_TEST_ID));
  }

  private WebElement loginButton() {
    return driver.findElement(Locators.testId(LOGIN_BUTTON_TEST_ID));
  }

  public void login(User user) {
    waitForOpen();
    usernameInput().sendKeys(user.name());
    passwordInput().sendKeys(user.password());
    loginButton().click();
  }
}
