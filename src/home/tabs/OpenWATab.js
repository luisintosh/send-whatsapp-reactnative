import React, {Component} from 'react';
import Expo from 'expo';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Alert, Linking, AsyncStorage, KeyboardAvoidingView, ScrollView} from 'react-native';
import {H1, Form, Item, Input, Icon, Picker, Button} from 'native-base';

const countryCodes = require('../../../assets/CountryCodes.json');

class OpenWATab extends Component {

  constructor(props) {
    super(props);
    this.state = props.defaultPhone || {
      dialCodeSelected: undefined,
      phoneNumber: undefined,
    };

    this.sendWAMessage.bind(this);
    this.callToNumber.bind(this);
  }

  async componentWillMount() {
    const currentLocale = await Expo.DangerZone.Localization.getCurrentDeviceCountryAsync();
    const dialCode = countryCodes.filter( country => country.code === currentLocale);
    // auto select the current device country code
    if (dialCode && dialCode[0] && !this.state.dialCodeSelected) {
      this.setState({
        dialCodeSelected: dialCode[0].dial_code
      });
    }
  }

  componentWillReceiveProps(props) {
    // will update the view
    this.setState({
      dialCodeSelected: props.defaultPhone.dialCode,
      phoneNumber: props.defaultPhone.phone,
    });
  }

  /**
   * Save the selected value on Picker component
   * @param value
   */
  onDialCodeValueChanged(value) {
    this.setState({
      dialCodeSelected: value
    });
  }

  /**
   * Save the selected value on Input component
   * @param value
   */
  onPhoneValueChanged(value) {
    value = value.replace(' ', '');

    this.setState({
      phoneNumber: value
    });
  }

  /**
   * Save the selected country code and phone number to User's history
   */
  async saveHistory(dialCodeSelected, phoneNumber) {
    const record = {
      dialCode: dialCodeSelected,
      phone: phoneNumber,
      dateTime: new Date().toLocaleDateString('en-US', {hour: "numeric", minute: "numeric"})
    };

    try {
      // get records
      let allRecords = await AsyncStorage.getItem('history');

      if (allRecords) {
        // save new record
        allRecords = JSON.parse(allRecords);
        allRecords.push(record);
        await AsyncStorage.setItem('history', JSON.stringify(allRecords));

      } else {
        // create table and save record
        const tableHistory = [record];
        await AsyncStorage.setItem('history', JSON.stringify(tableHistory));
      }

    } catch (e) {
      console.log('saveHistory', 'Error! We can\'t save the history');
    }
  }

  /**
   * Open WhatsApp to send a message
   */
  sendWAMessage() {
    const {dialCodeSelected, phoneNumber} = this.state;

    if (typeof phoneNumber === 'string' && phoneNumber.length >= 10) {
      Linking.openURL(`https://wa.me/${dialCodeSelected}${phoneNumber}`);
      this.saveHistory(dialCodeSelected, phoneNumber)

    } else {
      Alert.alert('Please enter a valid phone number');
    }
  }

  /**
   * Open the phone app
   */
  callToNumber() {
    const {dialCodeSelected, phoneNumber} = this.state;
    Linking.openURL(`tel:+${dialCodeSelected}${phoneNumber}`);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.titleSection}>
              <H1 style={styles.h1Text}>Send WhatsApp message without adding contact</H1>
            </View>

            <View style={styles.phoneSection}>
              <Form>

                <Item style={styles.inputs} rounded>
                  <Icon name="map"/>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline"/>}
                    style={{width: undefined}}
                    placeholder="Select country"
                    selectedValue={this.state.dialCodeSelected}
                    onValueChange={this.onDialCodeValueChanged.bind(this)}
                  >
                    {countryCodes.map((country, index) => <Picker.Item
                      key={index}
                      label={`${country.name} +${country.dial_code}`}
                      value={country.dial_code}
                    />)}
                  </Picker>
                </Item>

                <Item style={styles.inputs} rounded>
                  <Icon name="phone-portrait"/>
                  <Input placeholder="Phone number"
                         value={this.state.phoneNumber}
                         onChangeText={this.onPhoneValueChanged.bind(this)}
                         keyboardType="numeric"/>
                </Item>

                <Button style={styles.sendBtn} onPress={() => this.sendWAMessage()} rounded block primary>
                  <Text style={styles.sendBtnTxt}>Send Message</Text>
                </Button>

                <Button style={styles.callBtn} onPress={() => this.callToNumber()} rounded block light>
                  <Text style={styles.callBtnTxt}>Normal Call</Text>
                </Button>
              </Form>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

OpenWATab.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleSection: {
    flex: 1,
    backgroundColor: '#1ebea5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneSection: {
    flex: 1,
    margin: 20
  },
  h1Text: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  inputs: {
    marginTop: 25
  },
  sendBtn: {
    marginTop: 25
  },
  sendBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  callBtn: {
    marginTop: 25
  },
  callBtnTxt: {
    fontWeight: 'bold',
  }
});

export default OpenWATab;
