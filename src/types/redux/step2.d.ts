type STEP2 = 'task/step2';

type Step2State = {
  called: boolean;
  data: {
    success: boolean;
    message: string;
  } | null;
};

type Step2Action = {
  type: STEP2;
  payload: step2State;
};
