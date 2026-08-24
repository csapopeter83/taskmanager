const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'Auth.Login.Title': 'Login',
    'Auth.Login.Username': 'Username',
    'Auth.Login.Password': 'Password',
    'Auth.Login.LoginButton': 'Login',
    'Auth.Login.ForgotPassword': 'Forgot password?',
    'Auth.Login.Register': 'Register',
  },
};

export class TranslationService {
  constructor(private readonly apiKey: string) {
    if (!this.apiKey) throw new Error('apiKey can not be undefined or null!');
  }

  getTranslation(key: string, language: string): string {
    const translation = TRANSLATIONS[language]?.[key];
    if (!translation) {
      throw new Error(`No translation found for key "${key}" in locale "${language}"`);
    }
    return translation;
  }
}
