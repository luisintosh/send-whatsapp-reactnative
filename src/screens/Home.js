import React, {Component} from 'react';
import {StatusBar, View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Content, Header, Body, Title} from 'native-base';

class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <StatusBar />
        <Header>
          <Body>
            <Title>Open in WhatsApp</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.infoSection}>
            <Text>TOP</Text>
          </View>
          <View style={styles.actionSection}>
            <Text>BOTTOM</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

HomeScreen.propTypes = {};

const styles = StyleSheet.create({
  infoSection: {
    flex: 2,
    backgroundColor: '#FF3366'
  },
  actionSection: {
    flex: 1,
    backgroundColor: '#000'
  }
});

export default HomeScreen;
