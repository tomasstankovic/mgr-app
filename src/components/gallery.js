import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Colors from '../config/colors';

export default class Gallery extends React.Component {
  render() {
    let images = this.props.photos.map((photo) => {
      return <Image key={photo.id} style={styles.image} source={{ uri: photo.url }}/>;
    });

    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>{this.props.title}</Text>
        <ScrollView horizontal style={styles.scrollView}>
          {images}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    backgroundColor: '#15141a'
  },

  scrollView: {
    paddingTop: 10,
    paddingHorizontal: 10
  },

  title: {
    color: Colors.whiteMain,
    fontSize: 13,
    marginHorizontal: 20
  },

  right: {
    color: Colors.whiteMain,
    textAlign: 'right'
  },

  image: {
    borderRadius: 5,
    width: 125,
    height: 125,
    marginLeft: 10,
    marginRight: 10
  },
});
