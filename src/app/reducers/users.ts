import {ActionType, createReducer} from 'typesafe-actions';

import {fetchUsersAsync, fetchUserAsync} from '../asyncActions/users';
import {removeUser, toggleLikeUser} from '../actions/users';
import {TUser} from '../API';

export type TStatus = 'idle' | 'loading';

type TUsersState = {
    items: TUser[];
    itemsLength: number;
    usersStatus: TStatus;
    userDetailsStatus: TStatus;
    userDetails: TUser | null;
};

const initialState: TUsersState = {
    items: [],
    itemsLength: 0,
    usersStatus: 'loading',
    userDetailsStatus: 'idle',
    userDetails: null,
};

export type TUsersActions = ActionType<
    | typeof removeUser
    | typeof toggleLikeUser
    | typeof fetchUsersAsync.request
    | typeof fetchUsersAsync.success
    | typeof fetchUserAsync.request
    | typeof fetchUserAsync.success
>;

export const usersReducer = createReducer<TUsersState, TUsersActions>(initialState)
    .handleAction(removeUser, (state, {payload}) => ({
        ...state,
        items: state.items.filter(item => item.id !== payload),
        itemsLength: state.items.length - 1,
    }))
    .handleAction(fetchUsersAsync.request, state => ({...state, usersStatus: 'loading'}))
    .handleAction(fetchUsersAsync.success, (state, {payload}) => ({
        ...state,
        usersStatus: 'idle',
        items: payload.users,
        itemsLength: payload.length,
    }))
    .handleAction(toggleLikeUser, (state, {payload}) => ({
        ...state,
        items: state.items.map(item => (item.id !== payload ? item : {...item, isLiked: !item.isLiked})),
        userDetails:
            state.userDetails && state.userDetails?.id === payload
                ? {...state.userDetails, isLiked: !state.userDetails?.isLiked}
                : state.userDetails,
    }))
    .handleAction(fetchUserAsync.request, state => ({...state, userDetailsStatus: 'loading'}))
    .handleAction(fetchUserAsync.success, (state, {payload}) => ({
        ...state,
        userDetailsStatus: 'idle',
        userDetails: payload
            ? {...payload, isLiked: state.items.find(user => user.id === payload?.id)?.isLiked}
            : payload,
    }));
