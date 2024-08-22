import { apiServices } from "./api";

const DashboardServices = {
  getListTodos() {
    return apiServices.get("common./todos");
  },
};

export default DashboardServices;
