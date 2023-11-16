import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {createAsyncAction} from 'typesafe-actions';

import {fetchUsers, fetchUser, TUsers, TUser} from '../API';
import {RootState} from '../store';

export const fetchUsersAsync = createAsyncAction('FETCH_USERS_REQUEST', 'FETCH_USERS_SUCCESS', 'FETCH_USERS_FAILURE')<
    undefined,
    {users: TUsers; length: number}
>();

export const fetchUsersThunk = (): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const response = await fetchUsers();
    dispatch(fetchUsersAsync.success({users: response.data, length: response.length}));
};

export const fetchUserAsync = createAsyncAction('FETCH_USER_REQUEST', 'FETCH_USER_SUCCESS', 'FETCH_USER_FAILURE')<
    number,
    TUser | null
>();

export const fetchUserThunk =
    (userId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        dispatch(fetchUserAsync.request(userId));
        const response = await fetchUser(userId);
        dispatch(fetchUserAsync.success(response.data));
    };
