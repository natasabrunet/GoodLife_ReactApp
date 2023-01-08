import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuthenticated: (state, { payload }) => payload
	}
})

export const { setIsAuthenticated } = auth.actions
export default auth.reducer
