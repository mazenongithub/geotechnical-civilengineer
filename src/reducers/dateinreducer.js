import { DATEIN } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case DATEIN:
            return action.payload || false;
        default:
            return state;
    }
}
