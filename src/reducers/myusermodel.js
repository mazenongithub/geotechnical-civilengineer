import { MYUSERMODEL } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case MYUSERMODEL:
            return action.payload || false;
        default:
            return state;
    }
}
