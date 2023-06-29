/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SInfo from 'react-native-sensitive-info';
import Input from '../components/Input';
import BasePicker from '../components/BasePicker';
import {Alert} from 'react-native';
import {Colors, Zipcode} from '../utils/constant';
import {isNameValid, isEmailValid} from '../utils/regex';
import Loader from '../components/Loader';
import base64 from 'react-native-base64';

type FormErrors = {
  name?: string;
  email?: string;
  mobile?: string;
  dob?: string;
  gender?: string;
  zip?: string;
  city?: string;
  state?: string;
  color?: string;
  description?: string;
};

export default function Form() {
  const [genders, setGenders] = useState([
    {id: 'female', label: 'Female', selected: false},
    {id: 'male', label: 'Male', selected: false},
    {id: 'other', label: 'Other', selected: false},
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [color, setColor] = useState('#919191');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<FormErrors>();
  const [loading, setLoading] = useState(false);
  const [storedData, setStoredData] = useState<StoredData | undefined>(
    undefined,
  );
  const [buttonDisable, setButtonDisbale] = useState(true);

  const storeData = async (key: string, data: MyData | MyData[]) => {
    setLoading(true);
    setTimeout(async () => {
      const serializedData = JSON.stringify(data);
      await SInfo.setItem(key, serializedData, {});
      setStoredData({key, data});
      setLoading(false);
    }, 2000);
  };
  const retrieveData = async (key: string) => {
    const serializedData = await SInfo.getItem(key, {});
    if (serializedData) {
      const data = JSON.parse(serializedData) as MyData | MyData[];
      setStoredData({key, data});
    }
  };
  const removeData = async (key: string) => {
    await SInfo.deleteItem(key, {});
    setStoredData(undefined); // Clear the stored data after removal
  };

  function onPressRadio(id: string) {
    setGender(id);
    const updatedGenders = genders.map(value => ({
      ...value,
      selected: value.id === id,
    }));
    setGenders(updatedGenders);
  }

  function onChangeZip(value: string) {
    setZip(value);
    if (value.length >= 3) {
      const matchingZipcodes = Zipcode.zipcode_data.filter(zipcode =>
        zipcode.zipcode.startsWith(value),
      );
      if (matchingZipcodes.length > 0) {
        console.log(matchingZipcodes, 'matchingZipcodes');
        setCity(matchingZipcodes[0].city);
        setState(matchingZipcodes[0].state);
      } else {
        setCity('');
        setState('');
      }
    } else {
      setCity('');
      setState('');
    }
  }

  function validateInputs() {
    const tempErrors: FormErrors = {};

    if (!isNameValid(name)) {
      tempErrors.name = 'Enter a valid name';
    }
    if (!isEmailValid(email)) {
      tempErrors.email = 'Enter a valid email address';
    }
    if (mobile.length === 0) {
      tempErrors.mobile = 'Enter a mobile number';
    }
    if (dob.length === 0) {
      tempErrors.dob = 'Enter a date of birth';
    }
    if (gender.length === 0) {
      tempErrors.gender = 'Select gender';
    }
    if (zip.length === 0) {
      tempErrors.zip = 'Enter a zip';
    }
    if (color.length === 0) {
      tempErrors.zip = 'Select Color';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function onSubmit() {
    const isValid = validateInputs();
    if (isValid) {
      setLoading(true);
      let temp = [];
      temp.push({
        name: name,
        email: email,
        mobile: mobile,
        dob: dob,
        gender: gender,
        zip: zip,
        city: city,
        state: state,
        color: color,
        description: description,
      });
      storeData('myData', temp);
      setButtonDisbale(false);
    }
  }

  async function onReset() {
    setButtonDisbale(true);
    setName('');
    setEmail('');
    setMobile('');
    setDob('');
    const updatedGenders = genders.map(value => ({
      ...value,
      selected: false,
    }));
    setGender('');
    setGenders(updatedGenders);
    setZip('');
    setCity('');
    setState('');
    setDescription('');
    const key = 'myData';
    await removeData(key);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  useEffect(() => {
    const key = 'myData';
    retrieveData(key);
  }, []);

  useEffect(() => {
    if (storedData) {
      const encodedData = {
        key: base64.encode(storedData.key),
        data: Array.isArray(storedData.data)
          ? storedData.data.map(d => base64.encode(JSON.stringify(d)))
          : base64.encode(JSON.stringify(storedData.data)),
      };

      Alert.alert('Encoded Data', JSON.stringify(encodedData));
    }
  }, [storedData]);

  const handleInputChange = (text: string) => {
    const cleanedText = text.replace(/[^\d]/g, '');

    let formattedText = '';
    if (cleanedText.length >= 1) {
      formattedText += cleanedText.substring(0, 2);
    }
    if (cleanedText.length >= 3) {
      formattedText += '-' + cleanedText.substring(2, 4);
    }
    if (cleanedText.length >= 5) {
      formattedText += '-' + cleanedText.substring(4, 8);
    }

    setDob(formattedText);
  };

  const handleMobileNumberChange = (text: string) => {
    let formattedNumber = text.replace(/\D/g, ''); // Remove non-digit characters

    if (formattedNumber.length > 4) {
      formattedNumber =
        formattedNumber.substring(0, 4) + '-' + formattedNumber.substring(4);
    }

    setMobile(formattedNumber);
  };

  function onChangeColor(value: string) {
    if (value !== '-1') {
      setColor(value);
    } else {
      setColor('#919191');
    }
  }

  function onShowData() {
    setDescription(JSON.stringify(storedData?.data));
  }

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Input
          label="Name"
          onChangeText={setName}
          value={name}
          error={errors?.name}
          color={color}
        />
        <Input
          label="Email"
          onChangeText={setEmail}
          value={email}
          error={errors?.email}
          color={color}
        />
        <Input
          label="Mobile"
          maxLength={11}
          keyboardType="numeric"
          onChangeText={handleMobileNumberChange}
          value={mobile}
          error={errors?.mobile}
          color={color}
        />
        <Input
          label="DOB"
          onChangeText={handleInputChange}
          value={dob}
          error={errors?.dob}
          color={color}
          maxLength={10}
          keyboardType="numeric"
        />
        <View>
          <Text style={[styles.genderTitle, {color: color}]}>Gender</Text>
          <View style={styles.genderContainer}>
            {genders.map((el, index) => {
              return (
                <Pressable
                  key={index.toString()}
                  style={styles.radioButtons}
                  onPress={() => onPressRadio(el.id)}>
                  <Icon
                    name={el.selected ? 'radiobox-marked' : 'radiobox-blank'}
                    color="#ACACAC"
                    size={20}
                    style={{marginRight: 2}}
                  />
                  <Text>{el.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Input
          label="ZIP"
          onChangeText={(value: string) => onChangeZip(value)}
          value={zip}
          keyboardType="numeric"
          color={color}
          error={errors?.zip}
          maxLength={6}
        />
        <Input
          label="City"
          onChangeText={setCity}
          value={city}
          editable={false}
          color={color}
        />
        <Input
          label="State"
          onChangeText={setState}
          value={state}
          editable={false}
          color={color}
        />
        {/* <Input label="Color" onChangeText={setColor} value={color} /> */}
        <View>
          <Text style={[styles.label, {color}]}>Color</Text>
          <View style={styles.picker}>
            <BasePicker
              data={Colors}
              color={color}
              selectedValue={color}
              onValueChange={(value: string) => onChangeColor(value)}
            />
          </View>
        </View>

        <Input
          label="Description"
          multiline={true}
          onChangeText={setDescription}
          value={description}
          color={color}
          input={{height: 'auto'}}
          editable={false}
        />
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={onSubmit} />
          <Button title="Reset" onPress={onReset} disabled={buttonDisable} />
          <Button
            title="Show Data"
            onPress={onShowData}
            disabled={buttonDisable}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    paddingVertical: hp('5%'),
    paddingHorizontal: wp('3%'),
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  genderTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  radioButtons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#C1C1C1',
    width: '100%',
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: '#919191',
    backgroundColor: '#fff',
    paddingLeft: 2,
    marginBottom: 4,
  },
  modal: {
    height: 'auto',
    width: '90%',
  },
  dataContainer: {
    padding: 20,
  },
});
