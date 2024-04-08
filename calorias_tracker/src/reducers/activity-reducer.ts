import { Activity } from "../types"


export type ActivityActions =
    { type: "save-activity", payload: { newActivity: Activity } } |
    { type: "set-activeId", payload: { id: Activity['id'] } } |
    { type: "delete-activeId", payload: { id: Activity['id'] } }|
    { type: "restart-app" }


export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivitis = () : Activity[] =>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : [];
}

export const initialState: ActivityState = {
    activities:  localStorageActivitis() ,
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    switch (action.type) {
        case "save-activity": {
            let updateActivitis: Activity[] = []

            if (state.activeId) {
                updateActivitis = state.activities.map(activity =>
                    activity.id === state.activeId ? action.payload.newActivity : activity)
            } else {
                updateActivitis = [...state.activities, action.payload.newActivity]
            }

            return {
                ...state,
                activities: updateActivitis,
                activeId: ''
            }
        }
        case "set-activeId": {
            return {
                ...state,
                activeId: action.payload.id
            }
        }
        case "delete-activeId": {
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id),
            }
        }
        case "restart-app": {
            return {
                activities: [],
                activeId:''
            }
        }
    }
    return state;
}