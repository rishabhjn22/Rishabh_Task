import {combineReducers} from 'redux';
import postCampaign from './postCampaign';
import step2 from './step2';
import getDetails from './getDetails';

export default combineReducers({
  postCampaign,
  step2,
  getDetails,
});
