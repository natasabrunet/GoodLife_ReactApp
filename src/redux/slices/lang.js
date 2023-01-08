import { createSlice } from '@reduxjs/toolkit'

const initialState = 'en'

const lang = createSlice({
	name: 'lang',
	initialState,
	reducers: {
		setLang: (state, { payload }) => payload
	}
})

export const { setLang } = lang.actions
export default lang.reducer
