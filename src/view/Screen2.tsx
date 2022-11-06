import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  // ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProgressSteps from '../components/ProgressSteps';
import {colors} from '../utils/colors';
import Header from '../components/Header';
import {horizontalScale, verticalScale} from '../utils/responsive';
import CustomInput from '../components/CustomInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton';
import {Screen2Errors, Screen2Props} from '../types/propsTypes';
import {useAppSelector} from '../utils/hooks';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
// import {onStep2} from '../redux/ducks/step2';
// import {useDispatch} from 'react-redux';

export default function Screen2({navigation}: Screen2Props) {
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [url, setUrl] = useState('');
  const getCampaignData = useAppSelector(state => state.postCampaign);
  const [errors, setErrors] = useState<Screen2Errors>({});
  const [filePath, setFilePath] = useState('');
  // const [loading, setLoading] = useState(false);
  // const getStep2 = useAppSelector(state => state.step2);
  // const dispatch = useDispatch<any>();

  // function onSubmit() {
  //   navigation.navigate('Screen3');
  // }

  useEffect(() => {
    if (getCampaignData.called) {
      const {data} = getCampaignData;
      if (data) {
        setName(data?.name);
        setObjective(data?.objective);
      }
    }
  }, [getCampaignData]);

  const onCameraPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1080,
        maxHeight: 1920,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          Toast.show('User cancelled image picker');
          return;
        } else if (response.errorCode === 'permission') {
          Toast.show('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          if (response.errorMessage) {
            Toast.show(response.errorMessage);
          }
          return;
        }
        if (response.assets) {
          console.log('base64 -> ', response);
          if (response.assets[0].uri) {
            setFilePath(response.assets[0].uri);
          }
        }
      },
    );
  };

  function validURL(str: string) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  }

  function validateInput(): Screen2Errors {
    const validationErrors: Screen2Errors = {};
    if (name.length === 0) {
      validationErrors.name = 'Please enter name';
    }
    if (objective === 'WEBSITE') {
      if (!validURL(url)) {
        validationErrors.url = 'Please enter valid url';
      }
    }
    // if (filePath.length === 0) {
    //   Toast.show('Please Upload Image');
    // }

    return validationErrors;
  }

  function onSubmit() {
    const validate = validateInput();
    setErrors(validate);
    if (!validate.name && !validate.url) {
      //&& validate.filepath
      // setLoading(true);
      // dispatch(onStep2(name, url, filePath));
      navigation.navigate('Screen3');
    }
  }

  // useEffect(() => {
  //   if (getStep2.called) {
  //     navigation.navigate('Screen3');
  //     setLoading(false);
  //   }
  // }, [getStep2]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.stepsCont}>
        <ProgressSteps
          isStep1={false}
          isStep2={true}
          isCompleted1stStep={true}
        />
      </View>
      {/* {loading && <ActivityIndicator size={30} color={'#fff'} />} */}
      <View style={styles.bgContainer}>
        <View style={styles.inputContainer}>
          <CustomInput
            events="auto"
            label="Campaign Name"
            placeholder="Enter campaign name"
            value={name}
            onChangeText={value => setName(value)}
            editable={true}
            error={errors.name}
            icon={''}
          />
        </View>
        {objective === 'WEBSITE' && (
          <View style={styles.inputContainer}>
            <CustomInput
              events="auto"
              label="Website"
              placeholder="Enter website url"
              value={url}
              onChangeText={value => setUrl(value)}
              editable={true}
              error={errors.url}
              icon={''}
            />
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onCameraPress}
          style={styles.cameraCont}>
          {filePath.length !== 0 && (
            <Image source={{uri: filePath}} style={styles.image} />
          )}
          <MaterialCommunityIcons
            name="camera"
            size={50}
            color={colors.secondary}
          />
        </TouchableOpacity>

        <View style={styles.button}>
          <CustomButton onPress={() => onSubmit()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  stepsCont: {
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
  inputContainer: {
    marginLeft: horizontalScale(20),
    marginRight: horizontalScale(20),
    marginTop: verticalScale(10),
  },
  bgContainer: {
    backgroundColor: colors.primaryDark2,
    marginTop: verticalScale(20),
    margin: horizontalScale(10),
    paddingVertical: verticalScale(20),
    borderRadius: 20,
  },
  cameraCont: {
    backgroundColor: colors.primaryDark,
    width: horizontalScale(300),
    height: verticalScale(220),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  image: {
    height: verticalScale(220),
    width: horizontalScale(300),
    position: 'absolute',
  },
  button: {
    width: horizontalScale(100),
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
});
