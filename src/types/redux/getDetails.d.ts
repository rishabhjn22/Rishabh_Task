type GET_DETAILS = 'task/getDetails';

type details = {
  id: string;
  name: string;
  status: string;
  campaign: {
    adsquads: {
      ad_format: string;
      lifetime_budget: 1000;
      creatives: {
        attachment: {
          url: string;
        };
        media: {
          url: string;
        };
      };
      targeting: {
        geos: [
          {
            country: {
              id: number;
              name: string;
              iso_alpha_2: string;
            };
          },
        ];
        gender: {
          id: number;
          name: string;
        };
        age_range: {
          max_age: number;
          min_age: number;
        };
        languages: [
          {
            id: number;
            name: string;
            language_id: string;
          },
          {
            id: number;
            name: string;
            language_id: string;
          },
        ];
      };
    };
  };
};

type DetailsState = {
  data: details | null;
  called: boolean;
};

type DetailsAction = {
  type: GET_DETAILS;
  payload: DetailsState;
};
