import {StackNavigationProp} from '@react-navigation/stack';

type CustomInputProps = {
  value: string;
  onChangeText?: (value: string) => void;
  placeholder: string;
  label: string;
  editable?: boolean;
  events: 'none' | 'auto' | 'box-none' | 'box-only' | undefined;
  error?: string;
  onPress?: () => void;
  icon: string;
  color?: string;
  size?: number;
  endIcon?: boolean;
};

type CustomButtonProps = {
  onPress: () => void;
};

type Screen1Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Screen1'>;
};

type ProgressStepsProps = {
  isStep1: boolean;
  isStep2: boolean;
  isCompleted1stStep?: boolean;
  isCompleted2ndStep?: boolean;
};

type Screen2Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Screen2'>;
};
type Screen3Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Screen3'>;
};

type Errors = {
  name?: string;
  objective?: string;
};

type Screen2Errors = {
  name?: string;
  url?: string;
  filepath?: string;
};
