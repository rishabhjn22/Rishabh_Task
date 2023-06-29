type MyData = {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  zip: string;
  city: string;
  state: string;
  color: string;
  description: string;
};

type StoredData = {
  key: string;
  data: MyData | MyData[];
};
