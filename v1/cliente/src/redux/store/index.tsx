import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers';

const persistConfig = {
    key: 'chatOnlineTsTeste',
    storage,
    expires: 1,
    blacklist: ['geral', 'usuario']
}

const persistedReducer = persistReducer(persistConfig, reducers, )

let store: any = createStore(persistedReducer)
let persistor = persistStore(store)

export { store, persistor } 
