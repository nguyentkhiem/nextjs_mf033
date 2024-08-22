import * as slice from "./slice";
import counterSaga from "./saga";

export const {
  increment,
  incrementSaga,
  incrementSuccces,
  decrement,
  incrementByAmount,
} = slice.actions;

export { counterSaga };
export default slice.reducer;
