import { ACTIVEPROJECTID } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case ACTIVEPROJECTID:
            return action.payload || false;
        default:
            return state;
    }
}
