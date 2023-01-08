import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const eventInfo = createSlice({
	name: 'eventInfo',
	initialState,
	reducers: {
		setEventInfo: (state, { payload }) => payload,
		resetEventInfoSlice: (state, { payload }) => initialState
	}
})

export const { setEventInfo, resetEventInfoSlice } = eventInfo.actions
export default eventInfo.reducer
