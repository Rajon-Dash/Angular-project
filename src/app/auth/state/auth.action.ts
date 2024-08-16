import { createAction, props } from "@ngrx/store"
import { User } from "src/app/models/user.model";

export const LOGIN_STARTS = '[auth page] login start'
export const LOGIN_SUCCESS = '[auth page] login success'
export const LOGIN_FAIL = '[auth page] login fail'

//signup
export const SIGNUP_START = '[auth page] signup start'
export const SIGNUP_SUCCESS = '[auth page] signup success'

//create login action 

export const loginStart = createAction(
    LOGIN_STARTS,
    props<{email:string,password:string}>()
);
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{user:User}> ());


//CREATE  signup acrion

export const signupStart = createAction(
    SIGNUP_START,
    props<{email:string,password:string}>()
);
export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{user:User}> ());
