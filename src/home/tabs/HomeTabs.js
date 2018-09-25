import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native'
import {Tabs, Tab, TabHeading, Icon, ScrollableTab} from 'native-base';

import OpenWATab from './OpenWATab';
import HistoryTab from './HistoryTab';
import InfoTab from './InfoTab';

class HomeTabs extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      initialPage: 0,
      activeTab: 0,
      defaultPhone: {
        dialCodeSelected: undefined,
        phoneNumber: undefined,
      },
    };

    //this.setDefaultPhone.bind(this);
  }

  /**
   * Set a default number in the tab OpenWATab
   * @param phoneObject
   */
  setDefaultPhone(phoneObject) {
    console.log('setDefaultPhone2', phoneObject);
    this.setState({
      defaultPhone: phoneObject,
      activeTab: 0,
    });
  };

  render() {
    return (
      <Tabs
        initialPage={this.state.initialPage}
        page={this.state.activeTab}
        renderTabBar={() => <ScrollableTab/>}
      >
        <Tab heading={ <TabHeading><Icon name="logo-whatsapp"/></TabHeading> }>
          <OpenWATab defaultPhone={this.state.defaultPhone} />
        </Tab>
        <Tab heading={ <TabHeading><Icon name="list-box"/></TabHeading> }>
          <HistoryTab setDefaultPhone={this.setDefaultPhone.bind(this)}/>
        </Tab>
        <Tab heading={ <TabHeading><Icon name="information-circle"/></TabHeading> }>
          <InfoTab/>
        </Tab>
      </Tabs>
    );
  }
}

HomeTabs.propTypes = {};

export default HomeTabs;
