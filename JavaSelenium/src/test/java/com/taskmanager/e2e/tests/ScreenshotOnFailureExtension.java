package com.taskmanager.e2e.tests;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.junit.jupiter.api.extension.AfterTestExecutionCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

public class ScreenshotOnFailureExtension implements AfterTestExecutionCallback {

  private static final Path SCREENSHOT_DIR = Paths.get("screenshots");
  private static final DateTimeFormatter TIMESTAMP_FORMAT =
      DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

  @Override
  public void afterTestExecution(ExtensionContext context) {
    if (context.getExecutionException().isEmpty()) {
      return;
    }

    WebDriver driver = resolveDriver(context);
    if (driver == null) {
      return;
    }

    String fileName =
        context.getRequiredTestMethod().getName()
            + "_"
            + LocalDateTime.now().format(TIMESTAMP_FORMAT)
            + ".png";

    try {
      Files.createDirectories(SCREENSHOT_DIR);
      File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
      Files.copy(
          screenshot.toPath(), SCREENSHOT_DIR.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException e) {
      System.err.println("Failed to save failure screenshot for " + fileName + ": " + e.getMessage());
    }
  }

  private WebDriver resolveDriver(ExtensionContext context) {
    Object testInstance = context.getRequiredTestInstance();
    if (testInstance instanceof TestBase testBase) {
      return testBase.driver;
    }
    return null;
  }
}
