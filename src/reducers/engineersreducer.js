import { ENGINEERS } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case ENGINEERS:
            return action.payload || false;
        default:
            return state;
    }
}
