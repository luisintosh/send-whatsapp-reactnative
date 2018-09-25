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
      <View>
        <Card>
          <CardItem>
            <Body>
              <H3>Discover more apps in our website.</H3>
              <Button onPress={this.openTequilapps} transparent iconLeft>
                <Icon name="planet"/>
                <Text>https://www.tequilapps.com</Text>
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
