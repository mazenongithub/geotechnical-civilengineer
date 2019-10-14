import { ACTIVEEVENTID } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case ACTIVEEVENTID:
            return action.payload || false;
        default:
            return state;
    }
}
