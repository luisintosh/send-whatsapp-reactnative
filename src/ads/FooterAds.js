import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AdMobBanner} from 'expo';
import {Footer} from 'native-base';

class FooterAds extends Component {

  bannerError(e) {
    console.log('Banner error:', e);
  }

  render() {
    return (
      <Footer style={{ backgroundColor: '#ffffff' }}>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-6345442952981604/1574580286"
          onDidFailToReceiveAdWithError={this.bannerError}/>
      </Footer>
    );
  }
}

FooterAds.propTypes = {};

export default FooterAds;
