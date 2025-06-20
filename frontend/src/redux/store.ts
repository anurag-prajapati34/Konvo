import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import themeReducer from './slices/themSlice'
export const store=configureStore({
    reducer:{

        auth:authReducer,
        theme:themeReducer

    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDistpatch=typeof store.dispatch