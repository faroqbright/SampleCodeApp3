import {
  postRequest,
  getRequest,
  postWithFormRequest,
  getFilterRequest,
} from '../index';

export const signUpAPI = payload => postWithFormRequest(`/candidate-register`, payload);
export const signInAPI = payload => postWithFormRequest('/candidate-login', payload)
export const verifyAPI = payload => postWithFormRequest('/verify-user', payload)
export const resendOTPCodeAPI = payload => postWithFormRequest('/resend-verification-otp', payload)
export const forgotPasswordAPI = payload => postWithFormRequest('/forgot-password', payload)
export const resetPasswordAPI = payload => postWithFormRequest('/reset-password', payload)
export const candidateProfileAPI = payload => postWithFormRequest('/update-candidate-profile', payload)
export const jobFiltersAPi = payload => postWithFormRequest('/filter-job', payload)
export const jobTypeAPI = payload => postWithFormRequest('/job_types', payload)
export const applyJobAPI = payload => postWithFormRequest('/apply-job', payload)
export const jobStatusAPI = payload => postWithFormRequest('/update-applied-status', payload)
export const getcountryListAPI = payload => getRequest('/country-list', payload)
// export const getSimilarJobsAPI = (jobId) => postWithFormRequest(`/similar-jobs/${jobId}`)
export const getPreferredIndustry = payload => getRequest('/industry_types', payload)
export const getProfile = payload => getRequest('/my-profile', payload)
export const getPreferredJob = payload => getRequest('/job_types', payload)
export const getTermsOfUse = payload => getRequest('/get-tandc', payload)
export const getPrivacyPolicy = payload => getRequest('/get-pp', payload)
export const getCookiePolicy = payload => getRequest('/get-cp', payload)
export const changePassowrd = payload => postWithFormRequest('./change-password', payload)
export const getContactUs = payload => getRequest('/get-contact-us', payload)
export const deleteJob = payload => getRequest('/delete-applied-job', payload)
export const socialLogin = payload => postWithFormRequest('/social-login-signup', payload)
