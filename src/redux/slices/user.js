import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isMember: false,
	formValues: {
		firstName: '',
		lastName: '',
		email: '',
		postcode: '',
		phone: '',
		isTermsAgreed: false,
		isRulesAgreed: false
	},
	isFemale: false,
	fitnessGoal: '',
	isValued: false,
	prize: null,
	id: null,
	isPosted: false
}

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsMember: (state, { payload }) => ({ ...state, isMember: payload }),
		setFormValues: (state, { payload }) => ({ ...state, formValues: payload }),
		setIsFemale: (state, { payload }) => ({ ...state, isFemale: payload }),
		setFitnessGoal: (state, { payload }) => ({
			...state,
			fitnessGoal: payload
		}),
		setIsValued: (state, { payload }) => ({ ...state, isValued: payload }),
		setId: (state, { payload }) => ({ ...state, id: payload }),
		setIsPosted: (state, { payload }) => ({ ...state, isPosted: payload }),
		setPrize: (state, { payload }) => ({ ...state, prize: payload }),
		resetUserSlice: (state, { payload }) => initialState
	}
})

export const {
	setIsMember,
	setFormValues,
	setIsFemale,
	setFitnessGoal,
	setIsValued,
	setId,
	setIsPosted,
	setPrize,
	resetUserSlice
} = user.actions
export default user.reducer
