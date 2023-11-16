import {RootState} from '../store';

export const getUsers = (state: RootState) => state.users.items;
export const getUserDetails = (state: RootState) => state.users.userDetails;
