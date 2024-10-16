import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import {AppDispatch, RootState} from '.';

export const RequestStatus = {
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
