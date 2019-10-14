import { PROJECTS } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case PROJECTS:
            return action.payload || false;
        default:
            return state;
    }
}
