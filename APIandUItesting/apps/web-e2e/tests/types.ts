import { DashboardPage } from '../pages/dashboard_page';
import { HeaderPage } from '../pages/header_page';
import { LoginPopup } from '../pages/login_popup';
import { MainPage } from '../pages/main_page';
import { TranslationService } from '../services/translation_service';

export type PageObjects = {
  mainPage: MainPage;
  headerPage: HeaderPage;
  loginPopup: LoginPopup;
  dashboard: DashboardPage;
};

export type Services = {
  translationService: TranslationService;
};

export type User = {
  name: string;
  password: string;
};

export type TestOptions = {
  user: User;
  language: string;
  apiKey: string;
};
