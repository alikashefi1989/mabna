import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalSearchState {
    value: string;
};

const initialState: GlobalSearchState = {
    value: '',
};

export const globalSearchSlice = createSlice({
    name: 'globalSearch',
    initialState,
    reducers: {
        onChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
});

export const { onChange } = globalSearchSlice.actions;

export default globalSearchSlice.reducer