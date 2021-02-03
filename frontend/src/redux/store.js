import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./getTasks/reducer";

// const initialState = {
//   tasks: [
//     {
//       id: 1, title: "Task1", description: "Lalala", isActive: true,
//     },
//     {
//       id: 2, title: "Task2", description: "Inactivedddddd", isActive: false,
//     },
//   ],
// };

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
