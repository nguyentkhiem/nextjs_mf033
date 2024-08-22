export const ROUTES = {
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  AUTH_REGISTER_SIGN_UP: "/auth/sign-up/register",
  AUTH_SIGN_UP: "/auth/sign-up",
  AUTH_RESET_PASSWORD: "/auth/reset-password",
  AUTH_FORGOT_PASSWORD: "/auth/forgot-password",
  HOME: "/",
  ADMIN: "/admin",
  ADMIN_SIGIN: "/admin/sign-in",
  ADMIN_RESET_PASSWORD: "/admin/reset-password",
};

export const PUBLIC_ROUTES: string[] = [
  ROUTES.AUTH_LOGIN,
  ROUTES.AUTH_REGISTER,
  ROUTES.AUTH_REGISTER_SIGN_UP,
  ROUTES.ADMIN_RESET_PASSWORD,
  ROUTES.ADMIN_SIGIN,
  ROUTES.AUTH_SIGN_UP,
  ROUTES.AUTH_RESET_PASSWORD,
  ROUTES.AUTH_FORGOT_PASSWORD,
];
