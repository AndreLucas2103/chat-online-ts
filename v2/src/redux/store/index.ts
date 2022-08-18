import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers';


const persistConfig = {
    key: 'root-escola-inteligente-persist-react-usuario',
    storage,
    expires: 1,
    whitelist: ['unidade']
}


const persistedReducer = persistReducer(persistConfig, reducers,)

let store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})
let persistor = persistStore(store)

export { store, persistor } 
