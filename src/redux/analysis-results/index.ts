import * as slice from "./slice";
import slideSaga from "./saga";

export const { getAnalysisResultSuccess, loading } = slice.actions;

export { slideSaga };
export default slice.reducer;
