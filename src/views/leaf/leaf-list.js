import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Database from '../../firebase/database';
import LeafItem from '../../components/leaf-item';
import Colors from '../../config/colors';


export default class LeafList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      mobile: '',
      mobileForm: '',
      leafs: [],
      loading: false,
      loaded: false
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      let user = await firebase.auth().currentUser;
      Database.getUserLeafList(user.uid, (leafs) => {
        this.setState({
          leafs: (leafs === null) ? [] : leafs,
          loading: false,
          loaded: true
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  goToDetail(leaf) {
    Actions.detail({ leaf: leaf, title: '' });
  }

  render() {
    let leafItems = Object.keys(this.state.leafs).map((key) => {
      if (this.state.leafs) {
        let leaf = this.state.leafs[key];
        return (
          <LeafItem key={leaf.id} data={leaf} onPress={() => {
            this.goToDetail(leaf);
          }}/>
        );
      }
    });
    let leafItemsLength = Object.keys(this.state.leafs).length;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
        { this.state.loading &&
        <View style={{ flex: 1, justifyContent: 'center', marginTop: -50 }}>
          <ActivityIndicator
            animating={true}
            style={styles.preloader}
            size="large"
            color="#fff"
          />
          <Text style={styles.textLoadingH1}>Please wait!</Text>
          <Text style={styles.textLoadingH2}>We preparing your herbarium.</Text>
        </View>
        }

        { !this.state.loading && this.state.loaded && leafItemsLength === 0 &&
        <View style={{ flex: 1, justifyContent: 'center', marginTop: -50 }}>
          <TouchableOpacity
            onPress={() => {
              Actions.camera();
            }}>
            <Icon
              name="camera"
              style={styles.cameraIcon}
            />
            <Text style={styles.textLoadingH2}>Let's analyze your first leaf!</Text>
          </TouchableOpacity>
        </View>
        }
        {
          this.state.loaded && leafItemsLength > 0 &&
          <View style={styles.itemsWrapper}>
            {leafItems}
          </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: Colors.darkMain
  },

  textLoadingH1: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.whiteMain,
    textAlign: 'center',
    marginBottom: 5,
  },

  textLoadingH2: {
    color: Colors.whiteMain,
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
  },

  cameraIcon: {
    color: Colors.whiteMain,
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 5,
  },

  textBlank: {
    color: Colors.whiteMain,
    textAlign: 'center'
  },

  itemsWrapper: {
    marginHorizontal: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  preloader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
});
