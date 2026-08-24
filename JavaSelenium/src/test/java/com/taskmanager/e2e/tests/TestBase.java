package com.taskmanager.e2e.tests;

import com.taskmanager.e2e.Config;
import com.taskmanager.e2e.models.User;
import com.taskmanager.e2e.pages.DashboardPage;
import com.taskmanager.e2e.pages.HeaderPage;
import com.taskmanager.e2e.pages.LoginPopup;
import com.taskmanager.e2e.pages.MainPage;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

@ExtendWith(ScreenshotOnFailureExtension.class)
public abstract class TestBase {

  protected WebDriver driver;
  protected MainPage mainPage;
  protected HeaderPage headerPage;
  protected LoginPopup loginPopup;
  protected DashboardPage dashboard;
  protected User user;

  @BeforeEach
  void setUp() {
    Config.requireCredentials();

    ChromeOptions options = new ChromeOptions();
    if (Boolean.parseBoolean(System.getProperty("headless", "false"))) {
      options.addArguments("--headless=new");
    }
    options.addArguments("--window-size=1440,900");

    driver = new ChromeDriver(options);

    mainPage = new MainPage(driver);
    headerPage = new HeaderPage(driver);
    loginPopup = new LoginPopup(driver);
    dashboard = new DashboardPage(driver);
    user = new User(Config.E2E_USERNAME, Config.E2E_PASSWORD);
  }

  @AfterEach
  void tearDown() {
    if (driver != null) {
      driver.quit();
    }
  }
}
