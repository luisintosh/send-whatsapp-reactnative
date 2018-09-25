import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Linking} from 'react-native';
import {Card, CardItem, Body, Icon, Button, H3} from 'native-base';

class InfoTab extends Component {

  /**
   * Open tequilapps.com website
   */
  openTequilapps() {
    Linking.openURL('https://www.tequilapps.com');
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <Card>
          <CardItem>
            <Body style={{ padding: 10 }}>
              <H3>Discover more apps in our website.</H3>
              <Button onPress={this.openTequilapps} transparent iconLeft>
                <Icon name="planet"/>
                <Text>https://tequilapps.com</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

InfoTab.propTypes = {};

export default InfoTab;
