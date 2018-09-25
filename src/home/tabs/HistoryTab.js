import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, AsyncStorage} from 'react-native';
import {List, ListItem, Icon, Left, Right} from 'native-base';

class HistoryTab extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      historyItems: []
    };

    // this.selectPhoneItem.bind(this);
  }

  async componentWillMount() {
    try {
      const allRecords = await AsyncStorage.getItem('history') || '[]';
      this.setState({
        historyItems: JSON.parse(allRecords)
      });
    } catch (e) { }
  }

  /**
   * Execute the parent function setDefaultPhone to set default phone
   * at the first tab
   * @param index
   */
  selectPhoneItem = (phoneObject) => {
    //console.log('selectPhoneItem', this.state, e.target);
    //const phoneObject = this.state.historyItems[e.target.key];
    this.props.setDefaultPhone(phoneObject);
  };

  render() {
    return (
      <List>
        {this.state.historyItems.map( (item, index) => (
          <ListItem key={index} onPress={() => this.props.setDefaultPhone(item)}>
            <Left>
              <Icon name="phone-portrait" />
              <Text>+{item.dialCode}{item.phone}</Text>
            </Left>
            <Right><Text>{item.dateTime}</Text></Right>
          </ListItem>
        ))}
      </List>
    );
  }
}

HistoryTab.propTypes = {};

export default HistoryTab;
