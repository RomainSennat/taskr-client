import { TASKS_UPDATE } from '../actions/tasks';

const initial_state = {
    tasks: [ ]
};

export default function calendar(state = initial_state, action) {
    switch (action.type) {
        case TASKS_UPDATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
