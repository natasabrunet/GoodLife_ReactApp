import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const teamLeads = createSlice({
	name: 'teamLeads',
	initialState,
	reducers: {
		setTeamLeads: (state, { payload }) => payload,
		resetTeamLeadsSlice: (state, { payload }) => initialState
	}
})

export const { setTeamLeads, resetTeamLeadsSlice } = teamLeads.actions
export default teamLeads.reducer
