import { combineReducers } from "@reduxjs/toolkit";
import auth from "@/redux/auth";
import authAdmin from "@/redux/admin/auth";
import counter from "@/redux/counter";
import adminReducer from "@/redux/admin/users";
import homeReducer from "@/redux/home";
import donorReducer from "@/redux/donor";
import loadingReducer from "@/redux/loading";
import groupReducer from "@/redux/group";
import adminGroup from "@/redux/admin/group";
import adminCaseListReducer from "@/redux/admin/case-list";
import slideReducer from "@/redux/analysis-results";

const rootReducer = combineReducers({
  auth,
  counter,
  authAdmin,
  adminReducer,
  homeReducer,
  donorReducer,
  loadingReducer,
  groupReducer,
  adminGroup,
  adminCaseListReducer,
  slideReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
