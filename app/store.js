import { combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import myApplicationReducer from 'app_reducers/myApplicationReducer';


const rootReducer = combineReducers({myApplicationReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
