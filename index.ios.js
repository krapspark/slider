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
  TouchableWithoutFeedback,
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
    this.onTopIn = this.onTopIn.bind(this);
    this.onTopOut = this.onTopOut.bind(this);
    this.onBotIn = this.onBotIn.bind(this);
    this.onBotOut = this.onBotOut.bind(this);
  }

  onTopIn() {
    this.scrollingTop = true;
  }

  onTopOut() {
    setTimeout(() => { this.scrollingTop = false; }, 1000);
  }

  onBotIn() {
    this.scrollingBottom = true;
  }

  onBotOut() {
    setTimeout(() => { this.scrollingBottom = false; }, 1000);
  }

  onScrollTop(e) {
    if (this.scrollingTop) {
      this.bottomList.scrollTo({x: e.nativeEvent.contentOffset.x, y: 0, animated: false});
    }
  }

  onScrollBottom(e) {
    if (this.scrollingBottom) {
      this.topList.scrollTo({x: e.nativeEvent.contentOffset.x, y: 0, animated: false});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.onTopIn}
          onPressOut={this.onTopOut}
        >
          <ScrollView
            ref={(list) => {this.topList = list;}}
            style={[styles.scroll, styles.top]}
            horizontal={true}
            onScroll={this.onScrollTop}
            scrollEventThrottle={33}
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
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={this.onBotIn}
          onPressOut={this.onBotOut}
        >
          <ScrollView
            ref={(list) => {this.bottomList = list;}}
            style={[styles.scroll]}
            horizontal={true}
            data={data}
            pagingEnabled={true}
            onScroll={this.onScrollBottom}
            scrollEventThrottle={33}
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
        </TouchableWithoutFeedback>
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
