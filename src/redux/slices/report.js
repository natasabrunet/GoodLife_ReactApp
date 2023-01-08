import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	id: 0,
	name: '',
	event_id: 0,
	teamlead_id: 0,
	weather: '',
	highlights: '',
	challenges: '',
	inventory: '',
	attendance: '',
	notes: '',
	club_event: 0,
	leads_count: 0
}

const report = createSlice({
	name: 'report',
	initialState,
	reducers: {
		setTeamLeadId: (state, { payload }) => ({ ...state, teamlead_id: payload }),
		setLeadsCount: (state, { payload }) => ({ ...state, leads_count: payload }),
		setReportData: (state, { payload }) => ({
			...state,
			weather: payload.weather,
			highlights: payload.highlights,
			challenges: payload.highlights,
			inventory: payload.inventory,
			attendance: payload.attendance,
			notes: payload.notes
		}),
		resetReportSlice: (state, { payload }) => initialState
	}
})

export const { setTeamLeadId, setLeadsCount, setReportData, resetReportSlice } =
	report.actions
export default report.reducer
