import {AxiosResponse} from 'axios';
import axiosInstance from '../../axios';
import {STEP_2} from '../../utils/api';
import {AppDispatch} from '../store';

const STEP2: STEP2 = 'task/step2';

const initialState: Step2State = {
  data: null,
  called: false,
};

export default (state = initialState, action: Step2Action) => {
  switch (action.type) {
    case STEP2:
      return {...state, ...action.payload};
    default:
      return {...state};
  }
};

const step2Action = (res: Step2State): Step2Action => {
  return {type: STEP2, payload: {...res, called: true}};
};

export const onStep2 =
  (name: string, website_url: string, media: string) =>
  (dispatch: AppDispatch) => {
    const url = STEP_2;

    const data = {
      name: name,
      website_url: website_url,
      media: media,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axiosInstance
      .post(url, JSON.stringify(data), config)
      .then((res: AxiosResponse) => {
        dispatch(step2Action(res.data));
      });
  };
