import { useForm } from 'hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Step4.scss'
import UserIcon from 'assets/images/user-icon.svg'
import EmailIcon from 'assets/images/email-icon.svg'
import PostcodeIcon from 'assets/images/postcode-icon.svg'
import PhoneIcon from 'assets/images/phone-icon.svg'
import { setFormValues, setId, setIsPosted } from 'redux/slices/user'
import { useEffect, useState } from 'react'
import axios from 'utils/api'
import { toast, ToastContainer } from 'react-toastify'
import CloseModal from 'assets/images/close-modal.svg'
import { texts } from 'utils/localizedTexts'
import Layout from 'components/Layout/Layout'

const Step4 = () => {
	const [rulesText, setRulesText] = useState('')
	const [rulesTitle, setRulesTitle] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { formValues, isPosted, isMember, id } = useSelector(
		state => state.user
	)
	const lang = useSelector(state => state.lang)
	const eventInfo = useSelector(state => state.eventInfo)
	const [toggleRules, setToggleRules] = useState(false)
	const postFormValues = async v => {
		try {
			const { data } = await axios.post('/apps/startLeadRegister', {
				event_id: eventInfo.id,
				gl_member: isMember ? 'Yes' : 'No',
				first_name: v.firstName,
				last_name: v.lastName,
				email: v.email,
				postal_code: v.postcode,
				phone_number: v.phone,
				waiver: v.isWaiver ? 'Yes' : 'No',
				receive_email: v.isTermsAgreed ? 'Yes' : 'No',
				lang
			})
			dispatch(setFormValues(values))
			dispatch(setId(data.data.id))
			dispatch(setIsPosted(true))
			navigate('/step4')
		} catch (err) {
			console.log(err)
			toast.error(err.response.data.message)
		}
	}
	const putFormValues = async v => {
		try {
			const { data } = await axios.put('/apps/updateLeadRegister', {
				id,
				event_id: eventInfo.id,
				gl_member: isMember ? 'Yes' : 'No',
				first_name: v.firstName,
				last_name: v.lastName,
				email: v.email,
				postal_code: v.postcode,
				phone_number: v.phone,
				isWaiver: v.isWaiver ? 'Yes' : 'No',
				receive_email: v.isTermsAgreed ? 'Yes' : 'No'
			})
			dispatch(setFormValues(values))
			navigate('/step4')
		} catch (err) {
			console.log(err)
			toast.error(err.response.data.message)
		}
	}
	const submitForm = () => {
		if (values.isRulesAgreed) {
			isPosted ? putFormValues(values) : postFormValues(values)
		} else {
			if (lang === 'en') {
				toast.error(
					'Please agree to the rules and regulations to enter the contest'
				)
			} else
				toast.error(
					'Veuillez accepter les règles et règlements pour participer au concours'
				)
		}
	}
	const initialFormState = formValues
	const { values, onChange, onSubmit } = useForm(submitForm, initialFormState)
	useEffect(() => {
		getRules()
	}, [])

	const getRules = async () => {
		try {
			const {
				data: { data }
			} = await axios.get(`/apps/getRulesRegs/${eventInfo.campaign_id}/${lang}`)
			setRulesText(data[0].text)
			setRulesTitle(data[0].title)
		} catch (err) {
			console.log('error: ', err)
		}
	}

	return (
		<Layout setting={false} info={false} next={() => postFormValues(values)} prev={() => navigate('/step2')}>
			<div className='Step4'>
				<h1 className='Step4__header c-main-header'>
					{texts[lang].step4.formHeader}
				</h1>
				<div className='Step4__form' id='user-info'>
					<div className='Step4__form--row'>
						<div className='form-input'>
							<img src={UserIcon} alt='first name' />
							<input
								autoComplete='off'
								type='text'
								name='firstName'
								value={values?.firstName}
								onChange={onChange}
								required
								placeholder={texts[lang].step4.formPlaceholders.firstName}
							/>
						</div>
						<div className='form-input'>
							<img src={UserIcon} alt='last name' />
							<input
								autoComplete='off'
								type='text'
								name='lastName'
								value={values?.lastName}
								onChange={onChange}
								required
								placeholder={texts[lang].step4.formPlaceholders.lastName}
							/>
						</div>
					</div>
					<div className='Step4__form--row'>
						<div className='form-input'>
							<img src={EmailIcon} alt='email' />
							<input
								autoComplete='off'
								type='email'
								name='email'
								value={values?.email}
								onChange={onChange}
								required
								placeholder={texts[lang].step4.formPlaceholders.email}
							/>
						</div>
					</div>
					<div className='Step4__form--row'>
						<div className='form-input'>
							<img src={PostcodeIcon} alt='postcode' />
							<input
								autoComplete='off'
								type='text'
								name='postcode'
								value={values?.postcode}
								onChange={onChange}
								required
								placeholder={texts[lang].step4.formPlaceholders.postcode}
							/>
						</div>
						<div className='form-input'>
							<img src={PhoneIcon} alt='phone number' />
							<input
								autoComplete='off'
								type='text'
								name='phone'
								value={values?.phone}
								onChange={onChange}
								required
								placeholder={texts[lang].step4.formPlaceholders.phone}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							maxWidth: '812px',
							margin: '0 auto',
							gap: '32px'
						}}>
						<div className='Step4__form--checkbox-container'>
							<button style={{ background: '#F90036' }} type='button'>
								<input
									type={'checkbox'}
									id='isTermsAgreed'
									name='isTermsAgreed'
									defaultChecked={values?.isTermsAgreed}
									onChange={onChange}
								/>
								<span>YES</span>
								<span>NO</span>

								<i
									style={{ left: values?.isTermsAgreed ? '12px' : '71px' }}></i>
							</button>
							<label>{texts[lang].step4.emailAgreementText}</label>
						</div>
						<div className='Step4__form--checkbox-container'>
							<button style={{ background: '#2242E0' }} type='button'>
								<input
									type={'checkbox'}
									id='isRulesAgreed'
									name='isRulesAgreed'
									defaultChecked={values?.isRulesAgreed}
									onChange={onChange}
								/>
								<span>YES</span>
								<span>NO</span>
								<i
									style={{ left: values?.isRulesAgreed ? '12px' : '71px' }}></i>
							</button>
							<label>
								{texts[lang].step4.rulesHeader.text}{' '}
								<span onClick={() => setToggleRules(true)}>
									{texts[lang].step4.rulesHeader.link}
								</span>
							</label>
						</div>
					</div>
				</div>
				{toggleRules && (
					<div className='Step4__prize-modal'>
						<div className='Step4__prize-modal--content'>
							<div className='close-button'>
								<h2>{rulesTitle ? rulesTitle : null}</h2>
								<img
									src={CloseModal}
									alt='close modal'
									onClick={() => setToggleRules(false)}
								/>
							</div>
							{rulesText && (
								<div dangerouslySetInnerHTML={{ __html: rulesText }}></div>
							)}
							{/* <p>
							<b>
								THIS CONTEST IS OPEN ONLY TO RESIDENTS OF CANADA (OTHER THAN
								RESIDENTS OF QUEBEC) AND IS GOVERNED BY CANADIAN LAW
							</b>
						</p>
						<p>
							<b>1. SPONSOR. </b>The Contest sponsor is GoodLife Fitness (
							<b>“GoodLife”</b>
							or the <b>“Sponsor”</b>) with its head office located at 710
							Proudfoot Lane, London, N6H 5G5, ON, Canada
						</p>
						<p>
							<b>2. ADMINISTRATOR</b>. The Contest administrator is InField
							Marketing Group Inc. d/b/a (Influence Marketing) (the{' '}
							<b>“Administrator”</b>).
						</p>
						<p>
							<b>3. KEY DATES</b>
						</p>
						<p>
							The “Get You Back” Contest (the <b>“Contest”</b>) begins on April
							29, 2022 at 12:00:00 a.m. Eastern Time (<b>“ET”</b>) and ends on
							December 31, 2022 at 11:59:59 p.m. ET (the <b>“Contest Period”</b>
							)
						</p>
						<p>
							<b>4. ELIGIBILITY TO ENTER:</b>
						</p>
						<p>
							The Contest is open only to residents of Canada (not including
							residents of Quebec) who have reached the legal age of majority in
							their province/territory of residence at the time of entry.
							Employees, officers, directors, representatives or agents (and
							those with whom such persons are living, whether related or not)
							of GoodLife its parent companies, subsidiaries, associated and
							affiliated entities, prize suppliers, advertising/promotion
							agencies and any other individual(s), entity or entities involved
							in the development, production, implementation, administration or
							fulfillment of the Contest (collectively with the Sponsor, the{' '}
							<b>“Contest Parties”</b>) are not eligible to enter the Contest.
						</p>
						<p>
							<b>5. AGREEMENT TO BE LEGALLY BOUND BY RULES:</b>
						</p>
						<p>
							By participating in this Contest, you are signifying your
							agreement that you have read and agree to be legally bound by
							these Official Rules and Regulations (the <b>“Rules”</b>).
						</p>
						<p>
							<b>6. HOW TO ENTER:</b>
						</p>
						<p>
							<b>
								NO PURCHASE NECESSARY TO ENTER OR WIN. MAKING A PURCHASE WILL
								NOT INCREASE YOUR CHANCES OF WINNING. ENTRY IN THIS CONTEST
								CONSTITUTES ACCEPTANCE OF THESE OFFICIAL RULES. VOID IN QUEBEC
								AND WHERE PROHIBITED BY LAW.
							</b>
						</p>
						<p>
							To be eligible to earn one (1) entry (each, an <b>“Entry”</b> and
							collectively, the <b>“Entries”</b>) in the draw for the Grand
							Prize go to
							<b>www.GLMembership.ca</b> (the <b>“Website”</b>) and follow the
							on-screen instructions to enter the Contest (the{' '}
							<b>“Entry Form”</b>). Alternatively, entry to the Contest may be
							completed through an iPad install available at select GoodLife
							sponsored events that are hosted within the Contest Period. Dates
							and locations of GoodLife sponsored events will be specified by
							GoodLife Fitness in its sole and absolute discretion. By
							submitting your entry, you confirm your agreement that you have
							read and agree to be legally bound by the terms and conditions of
							these Rules. Once you have fully completed the Entry Form with all
							required information , follow the on-screen instructions to submit
							your Entry Form to be eligible to earn one (1) Entry.{' '}
							<b>There is a limit of one (1) Entry per person.</b>
						</p>
						<p>
							The instant win portion of the Contest is also available to those
							who enter at the Contest Events. Following completion of the Entry
							Form on the iPad, entrants will have the opportunity to scratch a
							digital ticket to reveal a prize.
						</p>
						<p>
							<b>7. ENTRY CONDITIONS:</b>
						</p>
						<p>
							If it is discovered by the Administrator (using any evidence or
							other information made available to or otherwise discovered by the
							Administrator) that any person has attempted to: (i) obtain more
							than one (1) Entry and/or (ii) use multiple names, multiple
							identities, multiple email addresses, multiple accounts from the
							same Social Media Platform, any automated, macro, script, robotic
							or other system(s) or program(s) and/or any other means not in
							keeping with the Administrator’s interpretation of the letter and
							spirit of these Rules to enter or otherwise participate in or to
							disrupt this Contest; then he/she may be disqualified from the
							Contest in the sole and absolute discretion of the Administrator.
							The Contest Parties and each of their respective agents,
							employees, officers, directors, successors, and assigns
							(collectively, the <b>“Released Parties”</b>) are not responsible
							for, and accept no liability whatsoever in relation to, any late,
							lost, misdirected, delayed, incomplete or incompatible Entries
							(collectively, <b> “Contest Entries”</b>), all of which are void.
							A Contest Entry may be rejected if, in the sole and absolute
							discretion of the Administrator it is not submitted and received
							in accordance with these Rules during the Contest Period (as
							determined by Administrator in its sole and absolute discretion).
						</p>
						<p>
							<b>8. VERIFICATION:</b>
						</p>
						<p>
							All Contest Entries and entrants are subject to verification at
							any time and for any reason. The Administrator reserves the right,
							in its sole and absolute discretion, to require proof of identity
							and/or eligibility (in a form acceptable to the Administrator –
							including, without limitation, government-issued photo
							identification): (i) for the purposes of verifying an individual’s
							eligibility to participate in this Contest; (ii) for the purposes
							of verifying the eligibility and/or legitimacy of any Contest
							Entry and/or other information entered (or purportedly entered)
							for the purposes of this Contest; and/or (iii) for any other
							reason the Administrator deems necessary, in its sole and absolute
							discretion, for the purposes of administering this Contest in
							accordance with the Administrator’s interpretation of the letter
							and spirit of these Rules. Failure to provide such proof to the
							complete satisfaction of the Administrator within the timeline
							specified may result in disqualification in the sole and absolute
							discretion of the Administrator. The sole determinant of the time
							for the purposes of this Contest will be the official time-keeping
							device(s) of the Administrator.
						</p>
						<p>
							<b>9. PRIZES:</b>
						</p>
						<p>
							<b>GRAND PRIZE</b>
						</p>
						<p>
							There will be one (1) non-transferable Grand Prize, comprising of
							Personal Training sessions with a retail value of $10,000 CAD to
							be used at any GoodLife Fitness location in Canada. Also, included
							in the Grand Prize are two (2), one-year GoodLife Fitness
							memberships (retail value of $1,000 CAD each).
						</p>
						<p>
							ADDITIONAL GYM FEES FOR SPECIFIC CLASSES OR SERVICES ARE NOT
							INCLUDED AS PART OF THE PRIZE. Membership must be claimed no later
							than March 15, 2023 (or on such other dates as may be specified by
							GoodLife Fitness in its sole and absolute discretion). Prize
							cannot be exchanged for cash, is not assignable or transferable.
						</p>
						<p>
							Without limiting the generality of the foregoing, the following
							general conditions apply to the Grand Prize: (i) Grand Prize must
							be accepted as awarded and is not transferable, assignable and/or
							or convertible to cash (except as may be specifically permitted by
							Administrator in its sole and absolute discretion); (ii) no
							substitutions are permitted, except at Administrator’s option;
							(iii) if the confirmed winner and/or his/her Guest do not utilize
							any part(s) of the Grand Prize, then any such part(s) not utilized
							may, in the sole and absolute discretion of the Administrator, be
							forfeited in their entirety and, if forfeited, nothing will be
							substituted in their place; (iv) Administrator reserves the right
							at any time to: (a) place reasonable restrictions on the
							availability or use of the Grand Prize or any component thereof;
							and (b) substitute the Grand Prize or a component thereof for any
							reason with a prize or prize component(s) of equal or greater
							retail value, including, without limitation, but solely at the
							Administrator’s sole discretion, a cash award; (v) by accepting
							the Grand Prize, the confirmed winner agrees to waive all recourse
							against the Released Parties if the Grand Prize or a component
							thereof does not prove satisfactory, either in whole or in part;
							and (vi) the confirmed winner’s Guest must: (a) be of the legal
							age of majority in his/her jurisdiction of residence; and (b) sign
							and return the Administrator’s release (by the date indicated on
							the release form) indicating (among other things) that he/she
							waives all recourse against the Released Parties relating to
							his/her participation in the Grand Prize.
						</p>
						<p>
							The Released Parties are not responsible for any delay,
							postponement, suspension, rescheduling or cancellation, for any
							reason, of any aspect of the Grand Prize. Neither the confirmed
							Grand Prize winner nor his/her Guest nor any other person or
							entity will be compensated in the event of such delay,
							cancellation or other event contemplated herein.
						</p>
						<p>
							None of the Released Parties makes any representation or offers
							any warranty, express or implied, as to the quality or fitness of
							the Grand Prize awarded in connection with the Contest. To the
							fullest extent permitted by applicable law, the confirmed winner
							and his/her Guest understands and acknowledges that he or she may
							not seek reimbursement or pursue any legal or equitable remedy
							from either the Sponsor or any of the other Released Parties
							should the Grand Prize fail to be fit for its purpose or is in any
							way unsatisfactory. For greater certainty and the avoidance of any
							doubt, by accepting the Grand Prize, the confirmed winner agrees
							to waive all recourse against the Sponsor and all of the other
							Released Parties if the Grand Prize or a component thereof does
							not prove satisfactory, either in whole or in part.
						</p>
						<p>
							<b>INSTANT WIN PRIZES</b>
						</p>
						<p>
							There are 70,000 instant win prizes available to be won, as below:
						</p>
						<p>
							• 20,000 Totes (ARV $1.30) <br />• 20,000 Mint Cards (ARV $0.99){' '}
							<br />• 20,000 Towels (ARV $1.75) <br />• 10,000 Buffs (ARV $1.45)
						</p>
						<p>‘ARV’ stands for approximate retail value.</p>
						<p>
							The number of instant win prizes offered will diminish as they are
							awarded. The instant win prizes that are not awarded during the
							Contest Period will be cancelled. The Administrator reserves the
							right to increase the total number of instant win prizes offered
							or substitute different prizes.
						</p>
						<p>
							The odds of winning another instant win prize vary depending on
							the number of eligible entrants at each Contest Event. The actual
							instant win prize awarded will be randomly selected via the
							computer program. Winners cannot exchange the instant win prize
							awarded for another prize. Each instant win prize must be accepted
							as awarded, cannot be exchanged and is not transferable,
							assignable or convertible to cash. The Administrator reserves the
							right, in its sole and absolute discretion, to substitute a prize
							or a component thereof with an item or items of equal or greater
							retail value, including, without limitation, but at the
							Administrator’s sole and absolute discretion, a cash award.
						</p>
						<p>
							To be confirmed as an instant prize winner, entrants must: (i) be
							onsite at one of the GoodLife Fitness activations as per the event
							schedule in Schedule A.
						</p>
						<p>
							If: (i) the selected entrant fails to meet any condition set forth
							in the Rules or is otherwise found to be ineligible; (ii) there is
							a return of any notification as undeliverable; (iii) the selected
							entrant refuses the prize; he/she will be disqualified and forfeit
							the prize. In such a case, the Administrator may, at its sole
							discretion, cancel the Prize or select another eligible entrant
							via random draw, until an entrant is selected that meets all the
							conditions in these Rules and is declared a winner.
						</p>
						<p>
							The prizes will be distributed to confirmed winners onsite at the
							Contest Event.
						</p>
						<p>
							<b>10. IMAGE RELEASE</b>
						</p>
						<p>
							By entering into this Contest, each entrant agrees to release,
							discharge, and forever hold harmless the Released Parties and
							their shareholders, officers and directors from any and all
							claims, actions, damages, demands, manner of actions, causes of
							action, suits, debts, duties, accounts, bonds, covenants,
							warranties, indemnities, claims over, contracts and liabilities of
							whatever nature or kind arising out of, or in connection with, the
							entrant’s participation or attempted participation in this
							Contest, compliance or non-compliance with these Official Rules
							and the delivery, non-delivery, acceptance, use, misuse or non-use
							of the prize or any travel related thereto and, if selected as a
							potential winner, to sign and deliver the Request for Information
							and Waiver form or Affidavit before receiving his/her prize. Each
							entrant grants the Sponsor and Administrator, and their
							respectivedesignees a perpetual, worldwide, royalty-free license
							to use, broadcast, publish and otherwise use the entrant’s name,
							statements regarding this Contest, image, photograph, video, voice
							and/or likeness for advertising, promotional and/or any other
							purpose in any and all media now or hereafter devised worldwide in
							perpetuity without additional compensation, notification or
							permission, unless prohibited by law.
						</p>
						<p>
							<b>11. ELIGIBLE GRAND PRIZE WINNER SELECTION PROCESS:</b>
						</p>
						<p>
							On January 7, 2023 (the <b>“Selection Date”</b>) in Toronto, ON at
							approximately 2:00 p.m. ET, one (1) eligible entrant will be
							selected by random draw from among all eligible Contest Entries
							submitted and received in accordance with these Rules aa the
							potential Grand Prize winner. The odds of winning the Grand Prize
							depend on the number of eligible Contest Entries submitted and
							received in accordance with these Rules.
						</p>
						<p>
							<b>12. ELIGIBLE WINNER NOTIFICATION PROCESS:</b>
						</p>
						<p>
							The Administrator or its designated representative will make a
							minimum of three (3) attempts to contact the selected entrant
							within three (3) business days of the Selection Date. If the
							selected entrant cannot be contacted as outlined above, or if
							there is a return of any notification as undeliverable; then
							he/she may, in the sole and absolute discretion of the
							Administrator, be disqualified (and, if disqualified, will forfeit
							all rights to the Grand Prize) and the Administrator reserves the
							right, in its sole and absolute discretion and time permitting, to
							select an alternate eligible entrant for the Grand Prize from
							among the remaining eligible Contest Entries submitted and
							received in accordance with these Rules (in which case the
							foregoing provisions of this section shall apply to such newly
							selected eligible winner).
						</p>
						<p>
							<b>13. ELIGIBLE WINNER CONFIRMATION PROCESS:</b>
						</p>
						<p>
							NO ONE IS A WINNER UNLESS AND UNTIL THE ADMINISTRATOR OFFICIALLY
							CONFIRMS HIM/HER AS A WINNER IN ACCORDANCE WITH THESE RULES, EVEN
							IF SUCH PERSON IS ANNOUNCED AS THE WINNER OR AN ELIGIBLE WINNER.
							BEFORE BEING DECLARED AS THE CONFIRMED GRAND PRIZE WINNER, the
							eligible winner will be required to: (a) correctly answer a
							mathematical skill-testing question without mechanical or other
							aid (which may, in the sole and absolute discretion of the
							Administrator, be administered online, by email or other
							electronic means, by telephone, or in the Administrator’s form of
							declaration and release); and (b) sign and return within two (2)
							business days of notification the Administrator’s declaration and
							release form, which (among other things): (i) confirms compliance
							with these Rules; (ii) acknowledges acceptance of the Grand Prize
							(as awarded); (iii) releases the Released Parties from any and all
							liability in connection with this Contest, his/her participation
							therein and/or the awarding and use/misuse of the Grand Prize or
							any portion thereof (including, but not limited to, any travel
							related thereto); and (iv) agrees to the publication, reproduction
							and/or other use of his/her name, city/province/territory, voice,
							statements about the Contest and/or photograph or other likeness
							without further notice or compensation, in any publicity or
							advertisement carried out by or on behalf of the Administrator in
							any manner or medium whatsoever, including print, broadcast or the
							Internet. If the eligible winner: (a) fails to correctly answer
							the skill-testing question; (b) fails to return the properly
							executed Contest documents within the specified time; (c) cannot
							accept (or is unwilling to accept) the Grand Prize (as awarded)
							for any reason; and/or (d) is determined to be in violation of
							these Rules (all as determined by the Administrator in its sole
							and absolute discretion); then he/she will be disqualified (and
							will forfeit all rights to the Grand Prize) and the Administrator
							reserves the right, in its sole and absolute discretion and time
							permitting, to select an alternate eligible entrant for the Grand
							Prize from among the remaining eligible Contest Entries submitted
							and received in accordance with these Rules (in which case the
							foregoing provisions of this section shall apply to such newly
							selected eligible winner).
						</p>
						<p>
							<b>14. GENERAL CONDITIONS:</b>
						</p>
						<p>
							This Contest is subject to all applicable federal, provincial and
							municipal laws. The decisions of the Administrator with respect to
							all aspects of this Contest are final and binding on all entrants
							without right of appeal. ANYONE DEEMED BY THE ADMINISTRATOR TO BE
							IN VIOLATION OF THE ADMINISTRATOR’S INTERPRETATION OF THE LETTER
							AND/OR SPIRIT OF THESE RULES FOR ANY REASON IS SUBJECT TO
							DISQUALIFICATION IN THE SOLE AND ABSOLUTE DISCRETION OF THE
							ADMINISTRATOR AT ANY TIME.
						</p>
						<p>
							The Released Parties will not be liable for: (i) any failure of
							any website or any platform during the Contest; (ii) any technical
							malfunction or other problems of any nature whatsoever, including,
							without limitation, those relating to the telephone network or
							lines, computer on-line systems, servers, access providers,
							computer equipment or software; (iii) the failure of any Contest
							Entry and/or other information to be received, captured or
							recorded for any reason whatsoever, including, but not limited to,
							technical problems or traffic congestion on the Internet or at any
							website; (iv) any injury or damage to an entrant’s or any other
							person’s computer or other device related to or resulting from
							participating in the Contest; (v) anyone being incorrectly and/or
							mistakenly identified as a winner or eligible winner; and/or (vi)
							any combination of the above.
						</p>
						<p>
							By entering this Contest, each entrant expressly consents to the
							Sponsor and Administrator, its agents and/or representatives,
							storing, sharing and using the personal information submitted for
							the purpose of administering the Contest in accordance with
							Administrator’s privacy policy, available at:
							https://influencemarketing.ca/privacy-policy/ This section does
							not limit any other consent(s) that an individual may provide the
							Sponsor or Administrator or others in relation to the collection,
							use and/or disclosure of their personal information.
						</p>
						<p>
							In the event of any discrepancy or inconsistency between the terms
							and conditions of these Rules and disclosures or other statements
							contained in any Contest-related materials, including, but not
							limited to point of sale, television, print or online advertising
							and/or any instructions or interpretations of these Rules given by
							any representative of the Administrator, the terms and conditions
							of these Rules shall prevail, govern and control to the fullest
							extent permitted by law.
						</p>
						<p>
							The invalidity or unenforceability of any provision of these Rules
							shall not affect the validity or enforceability of any other
							provision. In the event that any provision is determined to be
							invalid or otherwise unenforceable or illegal, these Rules shall
							otherwise remain in effect and shall be construed in accordance
							with the terms as if the invalid or illegal provision were not
							contained herein.
						</p>
						<p>
							To the fullest extent permitted by applicable law, all issues and
							questions concerning the construction, validity, interpretation
							and enforceability of these Rules or the rights and obligations of
							participants, Administrator or any of the other the Released
							Parties in connection with the Contest will be governed by and
							construed in accordance with the domestic laws of the Province of
							Ontario and the federal laws of Canada applicable therein, without
							giving effect to any choice of law or conflict of law rules or
							provisions that would cause the application of any other
							jurisdiction’s laws.
						</p>
						<p>
							The parties hereby consent to the exclusive jurisdiction and venue
							of the courts located in Ontario in any action to enforce (or
							otherwise relating to) these Rules or relating to this Contest.
						</p>
						<p>
							BY ACCEPTING THE GRAND PRIZE, WINNER ACCEPTS THE RISK OF THE
							WORKING OUT, AND THEY ARE ADVISED TO CONSULT THEIR MEDICAL DOCTOR
							PRIOR TO ENGAGING IN SUCH ACTIVITY. RISK INCLUDES PERSONAL INJURY
							AND/OR DEATH, ACKNOWLEDGES THAT HIS/HER PARTICIPATION IN THE PRIZE
							IS VOLUNTARY.
						</p>
						<p>
							SPONSOR IS IN NO WAY RESPONSIBLE FOR THE ADMINISTRATION OF THIS
							CONTEST. ALL INQUIRIES, COMMENTS OR COMPLAINTS REGARDING THE
							CONTEST MUST BE DIRECTED TO THE ADMINISTRATOR, INFEILD MARKETING
							GROUP INC.
						</p> */}
						</div>
					</div>
				)}

				<ToastContainer />
			</div>
		</Layout>
	)
}

export default Step4
