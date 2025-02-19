import { Action, createReducer, on } from "@ngrx/store"
import { setErrorMessage, setLoadingSpinner } from "./shared.action"
import { state } from "@angular/animations"
import { retry } from "rxjs"
import { initialState, SharedState } from "./shared.state"

const _sharedReducer = createReducer(
    initialState,
    on(setLoadingSpinner,(state,action)=>{
        return{
            ...state,
            showLoading:action.status
        }
    }),
    on(setErrorMessage,(state,action)=>{
        return{
            ...state,
            errorMessage:action.message
        }
    })
)

export function SharedReducer(state: SharedState | undefined,action: Action){
    return _sharedReducer(state, action)
}