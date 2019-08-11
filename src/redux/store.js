import { createStore } from 'redux';
import reducers from './reducers';

export default function buildStore() {
    const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(reducers);
            });
        }
    }
    return store;
}
