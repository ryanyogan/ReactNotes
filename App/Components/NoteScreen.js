'use strict';

import React, {
  StyleSheet,
  TextInput,
  View,
  Component
} from 'react-native';

export default class NoteScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Untitled Note"
          ref="title"
          autoFocus={true}
          onEndEditing={(text) => {this.refs.body.focus()}}
          style={styles.title} />

        <TextInput multiline={true} 
          placeholder="Start Typing"
          ref="body"
          style={styles.body} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64
  },
  title: {
    height: 40
  },
  body: {
    flex: 1
  }
});