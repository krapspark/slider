/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';

const dim = Dimensions.get('window');
const data = [{key: 'a'}, {key: 'b'}, {key: 'c'}];

export default class slider extends Component {
  constructor(props) {
    super(props);

    this.topScroll = new Animated.Value(0);
    this.bottomScroll = new Animated.Value(0);

    this._scrollTop = Animated.event(
      [{nativeEvent: { contentOffset: { x: this.topScroll } }}],
    );


    this.onScrollTop = this.onScrollTop.bind(this);
    this.onScrollBottom = this.onScrollBottom.bind(this);
  }

  onScrollTop(e) {
    if (!this.scrollingTop) {
      this.bottomList.scrollTo({x: e.nativeEvent.contentOffset.x, y: 0, animated: true});
    }
  }

  onScrollBottom(e) {
    if (!this.scrollingBottom) {
      this.topList.scrollTo({x: e.nativeEvent.contentOffset.x, y: 0, animated: true});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(list) => {this.topList = list;}}
          style={[styles.scroll, styles.top]}
          horizontal={true}
          onScroll={this.onScrollTop}
          pagingEnabled={true}
        >
          <View style={styles.card}>
            <Text>
              a
            </Text>
          </View>
          <View style={styles.card}>
            <Text>
              b
            </Text>
          </View>
          <View style={styles.card}>
            <Text>
              c
            </Text>
          </View>
        </ScrollView>
        <ScrollView
          ref={(list) => {this.bottomList = list;}}
          style={[styles.scroll]}
          horizontal={true}
          data={data}
          pagingEnabled={true}
        >
          <View style={styles.card}>
            <Text>
              a
            </Text>
          </View>
          <View style={styles.card}>
            <Text>
              b
            </Text>
          </View>
          <View style={styles.card}>
            <Text>
              c
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scroll: {
    width: dim.width,
    height: dim.height / 2,
    borderWidth: 5,
    borderColor: 'blue',
  },
  top: {
    transform: [{rotate: '180deg'}], 
  },
  card: {
    width: dim.width,
    height: dim.height / 2,
    flexGrow: 1,
    borderWidth: 5,
    borderColor: 'blue',
    backgroundColor: 'green',
  },
});

AppRegistry.registerComponent('slider', () => slider);
