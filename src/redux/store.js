import { createStore } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function buildStore() {
    const store = createStore(reducers, composeWithDevTools({ trace: true, traceLimit: 25 })());
    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(reducers);
            });
        }
    }
    return store;
}
