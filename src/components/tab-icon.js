import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Colors from './../config/colors';

export default class TabIcon extends React.Component {

  getIconName() {
    if (this.props.name === 'leaf') {
      return 'folder-alt';
    } else if (this.props.name === 'profile') {
      return 'user';
    } else if (this.props.name === 'camera') {
      return 'camera';
    } else if (this.props.name === 'contributor') {
      return 'plus';
    }
    return '';
  }

  getIconColor() {
    if (this.props.name === 'contributor') {
      return Colors.helpMain;
    } else {
      return this.props.selected ? Colors.greenMain : Colors.greyMain;
    }
  }

  render() {
    return (
      <View>
        <Icon
          name={this.getIconName()}
          style={[styles.icon, { color: this.getIconColor() }]}
        />
        <Text
          style={[styles.text, { color: this.getIconColor() }]}
        >
          {this.props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 3
  },

  text: {
    fontSize: 12,
    textAlign: 'center'
  }
});
