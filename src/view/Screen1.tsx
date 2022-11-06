/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {colors} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import Toast from 'react-native-simple-toast';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/responsive';
import CustomButton from '../components/CustomButton';
import ProgressSteps from '../components/ProgressSteps';
import Modal from 'react-native-modalbox';
import {Objective} from '../utils/constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Errors, Screen1Props} from '../types/propsTypes';
import {useDispatch} from 'react-redux';
import {onPostCampaignDetails} from '../redux/ducks/postCampaign';
import {useAppSelector} from '../utils/hooks';

export default function Screen1({navigation}: Screen1Props) {
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const getCampaignData = useAppSelector(state => state.postCampaign);

  function onClosedModal() {
    setModalVisible(false);
  }

  function Validation(): Errors {
    const validationErrors: Errors = {};
    if (name.length === 0) {
      validationErrors.name = 'Please enter name';
    }
    if (objective.length === 0) {
      validationErrors.objective = 'Please select Objective';
    }
    return validationErrors;
  }

  function onSubmit() {
    const validate = Validation();
    setErrors(validate);
    if (!validate.name && !validate.objective) {
      setLoading(true);
      dispatch(onPostCampaignDetails(name, objective));
    }
  }

  useEffect(() => {
    if (getCampaignData.called) {
      setCurrentStep(true);
      setLoading(false);
      const {message} = getCampaignData;
      Toast.show(message);
      console.log('ERRRRRRROOOOOOOORRR');

      navigation.navigate('Screen2');
    }
  }, [getCampaignData]);

  function onSelectedObjective(value: string) {
    setObjective(value);
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.stepsCont}>
        <ProgressSteps
          isStep1={true}
          isStep2={false}
          isCompleted1stStep={currentStep}
        />
      </View>
      {loading && <ActivityIndicator size={30} color={'#fff'} />}
      <View style={styles.inputContainer}>
        <CustomInput
          events="auto"
          label="AD Name"
          placeholder="Enter your campaign's name"
          value={name}
          onChangeText={(value: string) => setName(value)}
          editable={true}
          error={errors.name}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.inputContainer}
        onPress={() => setModalVisible(true)}>
        <CustomInput
          events="none"
          label="OBJECTIVE"
          placeholder="Select Objective"
          value={objective}
          editable={false}
          error={errors.objective}
        />
      </TouchableOpacity>
      <View style={styles.button}>
        <CustomButton onPress={onSubmit} />
      </View>
      <Modal
        isOpen={modalVisible}
        onClosed={onClosedModal}
        style={styles.modal}>
        <View style={{paddingVertical: verticalScale(20)}}>
          <Text style={styles.title}>Select an Objective</Text>
          {Objective.map(item => {
            return (
              <TouchableOpacity
                key={item.value}
                style={styles.listContainer}
                activeOpacity={0.6}
                onPress={() => onSelectedObjective(item.value)}>
                {item.value === 'WEBSITE' ? (
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={30}
                    color={colors.text}
                  />
                ) : (
                  <Entypo name={item.icon} size={30} color={colors.text} />
                )}

                <View style={styles.modalTextContainer}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.desc}>{item.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  inputContainer: {
    marginLeft: horizontalScale(20),
    marginRight: horizontalScale(20),
    marginTop: verticalScale(10),
  },
  button: {
    width: horizontalScale(100),
    alignSelf: 'center',
    marginTop: verticalScale(40),
  },
  stepsCont: {
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
  modal: {
    height: 'auto',
    width: verticalScale(350),
  },
  listContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  modalTextContainer: {
    paddingLeft: verticalScale(15),
  },
  title: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontFamily: 'Montserrat-Bold',
    lineHeight: verticalScale(40),
  },
  label: {
    fontSize: moderateScale(15),
    fontFamily: 'Montserrat-Regular',
    lineHeight: verticalScale(20),
    fontWeight: '500',
    color: colors.primary,
  },
  desc: {
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    lineHeight: verticalScale(20),
    color: colors.primaryDark,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    borderWidth: 1,
  },
});
