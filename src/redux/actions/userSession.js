//auth actions...
import {
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_RESPONSE,
  SIGNIN_RESPONSE,
  USER_SESSION_CHANGE_STATE,
  PREFERRED_INDUSTRY,
  PREFERRED_JOB_TYPE
} from './types';

export const logoutUser = () => ({
  type: LOGOUT
})

export const signupRequest = (payload) => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const signupResponse = (response) => ({
  type: SIGNUP_RESPONSE,
  response,
});

export const signInRespone = (response) => ({
  type: SIGNIN_RESPONSE,
  response,
})

export const onUserSessionChangeState = (payload) => ({
  type: USER_SESSION_CHANGE_STATE,
  payload,
})

export const preferredIndustry = (payload) => ({
  type:PREFERRED_INDUSTRY,
  payload,
})

export const preferredJobType = (payload) => ({
  type:PREFERRED_JOB_TYPE,
  payload
})