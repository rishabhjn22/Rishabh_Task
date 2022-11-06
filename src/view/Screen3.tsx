/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../utils/colors';
import {useDispatch} from 'react-redux';
import {onGetDetails} from '../redux/ducks/getDetails';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/responsive';
import {Screen3Props} from '../types/propsTypes';
import CustomInput from '../components/CustomInput';
import Toast from 'react-native-simple-toast';
import {useAppSelector} from '../utils/hooks';

export default function Screen3({navigation}: Screen3Props) {
  const dispatch = useDispatch<any>();
  const getDetails = useAppSelector(state => state.getDetails);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(onGetDetails());
  }, []);

  useEffect(() => {
    if (getDetails.called) {
      const {data} = getDetails;
      if (data) {
        setTitle(data.name);
        setStatus(data.status);
        setGender(data.campaign.adsquads.targeting.gender.name);
        setAge(
          data.campaign.adsquads.targeting.age_range.min_age +
            '-' +
            data.campaign.adsquads.targeting.age_range.max_age,
        );
        setLanguage(
          data.campaign.adsquads.targeting.languages[0].name +
            '-' +
            data.campaign.adsquads.targeting.languages[1].name,
        );
        setLocation(data.campaign.adsquads.targeting.geos[0].country.name);
        setImage(data.campaign.adsquads.creatives.media.url);
        setUrl(data.campaign.adsquads.creatives.attachment.url);
      }
    }
  }, [getDetails]);

  function copyToClipboard() {
    Clipboard.setString(url);
    Toast.show('URL copied');
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color={colors.white}
          />
        </TouchableOpacity>

        <View style={styles.center}>
          <MaterialCommunityIcons
            name="snapchat"
            size={30}
            color={colors.white}
          />
          <View>
            <Text style={styles.headerText}>{title}</Text>
            <Text style={styles.status}>
              {'\u2B22'} {status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.dataCont}>
        {image && (
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="center"
          />
        )}
        <View style={styles.children}>
          <View style={styles.childCont}>
            <MaterialCommunityIcons
              name="gender-male-female"
              size={25}
              color={colors.secondary}
            />
            <View style={styles.data}>
              <Text style={styles.title}>Gender</Text>
              <Text style={styles.desc}>{gender}</Text>
            </View>
          </View>
          <View style={styles.childCont}>
            <MaterialCommunityIcons
              name="human-male-child"
              size={25}
              color={colors.secondary}
            />
            <View style={styles.data}>
              <Text style={styles.title}>Age</Text>
              <Text style={styles.desc}>{age}</Text>
            </View>
          </View>
          <View style={styles.childCont}>
            <FontAwesome name="language" size={25} color={colors.secondary} />
            <View style={styles.data}>
              <Text style={styles.title}>Language</Text>
              <Text style={styles.desc}>{language}</Text>
            </View>
          </View>
          <View style={styles.childCont}>
            <Entypo name="location-pin" size={25} color={colors.secondary} />
            <View style={styles.data}>
              <Text style={styles.title}>Location</Text>
              <Text style={styles.desc}>{location}</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{margin: 20}}
        onPress={() => copyToClipboard()}
        activeOpacity={0.8}>
        <CustomInput
          value={url}
          editable={false}
          label="AD DESTINATION"
          placeholder=""
          events="none"
          endIcon={true}
          icon="content-save"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  titleContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  headerText: {
    color: colors.white,
    fontSize: moderateScale(20),
    fontFamily: 'Montserrat-Bold',
    marginLeft: 5,
  },
  dataCont: {
    backgroundColor: colors.primaryDark2,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    margin: 20,
  },
  title: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontFamily: 'Montserrat-Regular',
  },
  desc: {
    color: '#FAFAFA',
    fontSize: moderateScale(10),
    fontFamily: 'Montserrat-Regular',
    // lineHeight: verticalScale(15),
  },
  childCont: {
    flexDirection: 'row',
    paddingVertical: verticalScale(5),
  },
  children: {
    paddingHorizontal: horizontalScale(20),
  },
  image: {
    width: horizontalScale(120),
    height: verticalScale(200),
    borderRadius: 10,
  },
  center: {
    flexDirection: 'row',
    marginLeft: verticalScale(50),
  },
  data: {
    paddingHorizontal: horizontalScale(10),
  },
  status: {
    color: colors.secondary,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    marginLeft: horizontalScale(5),
    fontSize: moderateScale(12),
    lineHeight: 20,
  },
});
