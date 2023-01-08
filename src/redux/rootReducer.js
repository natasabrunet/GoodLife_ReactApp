import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import authReducer from './slices/auth'
import eventInfoReducer from './slices/eventInfo'
import teamLeadsReducer from './slices/teamLeads'
import reportReducer from './slices/report'
import langReducer from './slices/lang'

export const rootReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
	eventInfo: eventInfoReducer,
	teamLeads: teamLeadsReducer,
	report: reportReducer,
	lang: langReducer
})
