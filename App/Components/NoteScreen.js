'use strict';

import React, {
  StyleSheet,
  TextInput,
  View,
  Component
} from 'react-native';

export default class NoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { note: Object.assign({}, props.note) };
  }

  _updateNote(title, body) {
    const note = Object.assign(this.state.note, {
      title: title,
      body: body
    });

    this.props.onChangeNote(note);
    this.setState(note);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Untitled Note"
            ref="title"
            autoFocus={true}
            autoCapitalize="sentences"
            onEndEditing={(text) => {this.refs.body.focus()}}
            style={[styles.textInput, styles.title]}
            underlineColorAndroid="transparent"
            value={this.state.note.title}
            onChangeText={(title) => {
              this._updateNote(title, this.state.note.body)
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput multiline={true} 
            placeholder="Start Typing"
            ref="body"
            style={[styles.textInput, styles.body]}
            textAlignVertical="top"
            underlineColorAndroid="transparent"
            value={this.state.note.body}
            onChangeText={(body) => {
              this._updateNote(this.state.note.title, body)
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    padding: 20
  },
  title: {
    height: 40
  },
  body: {
    height: 250
  },
  inputContainer: {
    borderBottomColor: '#9E7CE3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 10
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  }
});