package com.taskmanager.e2e;

import io.github.cdimascio.dotenv.Dotenv;

public final class Config {

  private static final Dotenv DOTENV =
      Dotenv.configure().directory(".").ignoreIfMissing().ignoreIfMalformed().load();

  public static final int PORT = 4200;
  public static final String BASE_URL = "http://localhost:" + PORT;

  public static final String E2E_USERNAME = env("E2E_USERNAME");
  public static final String E2E_PASSWORD = env("E2E_PASSWORD");

  private Config() {}

  private static String env(String key) {
    String value = DOTENV.get(key);
    return value != null ? value : System.getenv(key);
  }

  public static void requireCredentials() {
    if (isBlank(E2E_USERNAME) || isBlank(E2E_PASSWORD)) {
      throw new IllegalStateException(
          "E2E_USERNAME and E2E_PASSWORD must be set. Copy .env.example to .env.");
    }
  }

  private static boolean isBlank(String value) {
    return value == null || value.isBlank();
  }
}
