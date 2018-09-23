import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native'
import {Tabs, Tab, TabHeading, Icon, ScrollableTab} from 'native-base';

import OpenWATab from './OpenWATab';
import HistoryTab from './HistoryTab';
import InfoTab from './InfoTab';

class HomeTabs extends Component {
  render() {
    return (
      <Tabs renderTabBar={() => <ScrollableTab/>}>
        <Tab heading={ <TabHeading><Icon name="logo-whatsapp"/><Text>Open</Text></TabHeading> }>
          <OpenWATab/>
        </Tab>
        <Tab heading={ <TabHeading><Icon name="list-box"/><Text>History</Text></TabHeading> }>
          <HistoryTab/>
        </Tab>
        <Tab heading={ <TabHeading><Icon name="information-circle"/><Text>Info</Text></TabHeading> }>
          <InfoTab/>
        </Tab>
      </Tabs>
    );
  }
}

HomeTabs.propTypes = {};

export default HomeTabs;
