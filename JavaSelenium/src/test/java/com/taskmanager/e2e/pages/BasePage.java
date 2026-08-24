package com.taskmanager.e2e.pages;

import com.taskmanager.e2e.Config;
import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BasePage {

  protected final WebDriver driver;
  protected final WebDriverWait wait;

  public BasePage(WebDriver driver) {
    this.driver = driver;
    this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
  }

  public void open() {
    driver.get(Config.BASE_URL + "/" + pageUrl());
  }

  public String pageUrl() {
    return "";
  }

  protected WebElement waitVisible(By locator) {
    return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
  }
}
