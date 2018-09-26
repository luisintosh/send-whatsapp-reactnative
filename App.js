import React from 'react';
import Expo from 'expo';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import {Container, Header, Body, Title, StyleProvider, Footer} from 'native-base';
import getTheme from './native-base-theme/components';
import theme from './native-base-theme/variables/variables';

import HomeTabs from './src/home/tabs/HomeTabs';
import FooterAds from './src/ads/FooterAds';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      isReady: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return null;
    }
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <View style={styles.statusBar} />
          <Header>
            <Body>
            <Title>{Expo.Constants.manifest.name}</Title>
            </Body>
          </Header>
          <HomeTabs/>
          <FooterAds/>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Expo.Constants.statusBarHeight,
    backgroundColor: theme.statusBarColor
  },
});
