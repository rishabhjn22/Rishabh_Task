import {AxiosResponse} from 'axios';
import axiosInstance from '../../axios';
import {POST_CAMPAIGN} from '../../utils/api';
import {AppDispatch} from '../store';

const POST_CAMPAIGN_DATA: POST_CAMPAIGN_DATA = 'task/postCampign';

const initialState: PostCampaignState = {
  data: null,
  called: false,
  api_version: '',
  success: false,
  message: '',
};

export default (state = initialState, action: PostCampaignAction) => {
  switch (action.type) {
    case POST_CAMPAIGN_DATA:
      return {...state, ...action.payload};
    default:
      return {...state};
  }
};

const postCampaignAction = (res: PostCampaignState): PostCampaignAction => {
  return {type: POST_CAMPAIGN_DATA, payload: {...res, called: true}};
};

export const onPostCampaignDetails =
  (name: string, objective: string) => (dispatch: AppDispatch) => {
    const url = POST_CAMPAIGN;

    const data = {
      name: name,
      objective: objective,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axiosInstance
      .post(url, JSON.stringify(data), config)
      .then((res: AxiosResponse) => {
        dispatch(postCampaignAction(res.data));
      });
  };
