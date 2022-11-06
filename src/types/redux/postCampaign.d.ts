type POST_CAMPAIGN_DATA = 'task/postCampign';

type PostCampaignState = {
  api_version: string;
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    objective: string;
  } | null;
  called: boolean;
};

type PostCampaignAction = {
  type: POST_CAMPAIGN_DATA;
  payload: PostCampaignState;
};
