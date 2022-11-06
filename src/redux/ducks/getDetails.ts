import {AxiosResponse} from 'axios';
import {AppDispatch} from '../store';
import {GET_PUBLIC_DETAILS} from '../../utils/api';
import axiosInstance from '../../axios';

const GET_DETAILS: GET_DETAILS = 'task/getDetails';

const initialState: DetailsState = {
  data: null,
  called: false,
};

export default (state = initialState, action: DetailsAction) => {
  switch (action.type) {
    case GET_DETAILS:
      return {...state, ...action.payload};
    default:
      return {...state};
  }
};

const detailsAcion = (res: DetailsState): DetailsAction => {
  return {type: GET_DETAILS, payload: {...res, called: true}};
};

export const onGetDetails = () => (dispatch: AppDispatch) => {
  const url = GET_PUBLIC_DETAILS;

  axiosInstance.get(url).then((res: AxiosResponse) => {
    dispatch(detailsAcion(res.data));
  });
};
