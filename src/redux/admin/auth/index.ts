import * as slice from "./slice";
import authSagaAdmin from "./saga";

export const {
  logout,
  loginSuccess,
  loading: loginLoading,
  sentEmail,
  setUser,
} = slice.actions;

export { authSagaAdmin };
export default slice.reducer;
