'use strict';

import React, {
  AppRegistry,
  Navigator,
  Component,
  StyleSheet,
  View,
  Text,
  StatusBarIOS,
  AsyncStorage
} from 'react-native';

import _ from 'lodash';

import SimpleButton from './App/Components/SimpleButton';
import NoteScreen from './App/Components/NoteScreen';
import HomeScreen from './App/Components/HomeScreen';
import NoteLocationScreen from './App/Components/NoteLocationScreen';

const NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <SimpleButton
            onPress={() => navigator.push({name: 'noteLocations'})}
            customText='Map'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'createNote':
      case 'noteLocations':
        return (
          <SimpleButton
            onPress={() => navigator.pop()}
            customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      default:
        return null;
    }
  },

  RightButton (route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <SimpleButton
            onPress={() => {
              navigator.push({
                name: 'createNote',
                note: {
                  id: new Date().getTime(),
                  title: '',
                  body: '',
                  isSaved: false
                }
              });
            }}
            customText='Create Note'
            style={styles.navBarRightButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'createNote':
        if (route.note.isSaved) {
          return (
            <SimpleButton
              onPress={
                () => {
                  navigator.props.onDeleteNote(route.note);
                  navigator.pop();
                }
              }
              customText='Delete'
              style={styles.navBarRightButton}
              textStyle={styles.navBarButtonText}
            />
          );
        } else {
          return null;
        }

      default:
        return null;
    }
  },

  Title (route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <Text style={styles.navBarTitleText}>React Notes</Text>
        );

      case 'createNote':
        return (
          <Text style={styles.navBarTitleText}>{route.note ? route.note.title : 'Create Note'}</Text>
        );

      case 'noteLocations':
        return (
          <Text style={styles.navBarTitleText}>Note Locations</Text>
        );
    }
  }
};

class ReactNotes extends Component {

  constructor(props) {
    super(props);

    StatusBarIOS.setStyle('light-content');

    this.state = {
      // selectedNote: { title: '', body: ''},
      notes: {
        1: {title: 'Note 1', body: 'Body 1', id: 1,
        location: {
          coords: {
            latitude: 33.987,
            longitude: -118.47
          }
        }},

        2: {title: 'Note 2', body: 'Body 2', id: 2,
        location: {
          coords: {
            latitude: 33.986,
            longitude: -118.46
          }
        }}
      }
    };

    this.loadNotes();
    this.trackLocation();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  trackLocation() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => alert(error.message)
    );

    this.watchID = navigator.geolocation.watchPosition(
      (lastPosition) => this.setState({lastPosition})
    );
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'home':
        return (
          <HomeScreen 
            navigator={navigator}
            notes={_.toArray(this.state.notes)}
            onSelectNote={(note) => navigator.push({
              name: 'createNote',
              note: note
            })}
          />
        );

      case 'createNote':
        return (
          <NoteScreen 
            note={route.note}
            onChangeNote={(note) => this.updateNote(note)}
          />
        );

      case 'noteLocations':
        return (
          <NoteLocationScreen
            notes={this.state.notes}
            onSelectNote={(note) => navigator.push({
              name: 'createNote', note: note
            })}
          />
        );
    }
  }

  updateNote(note) {
    let newNotes = Object.assign({}, this.state.notes);

    if (!note.isSaved) {
      note.location = this.state.lastPosition;
    }

    note.isSaved = true;
    newNotes[note.id] = note;
    this.setState({notes: newNotes});
    this.saveNotes(newNotes);
  }

  deleteNote(note) {
    let newNotes = Object.assign({}, this.state.notes);
    delete newNotes[note.id];
    this.setState({ notes: newNotes });
    this.saveNotes(newNotes);
  }

  async saveNotes(notes) {
    try {
      await AsyncStorage.setItem('@ReactNotes:notes', JSON.stringify(notes));
    } catch(error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async loadNotes() {
    try {
      const notes = await AsyncStorage.getItem('@ReactNotes:notes');
      if (notes !== null) {
        this.setState({ notes: JSON.parse(notes) });
      }
    } catch(error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'home'}}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
        onDeleteNote={(note) => this.deleteNote(note)}
      />
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#5B29C1',
    borderBottomColor: '#48209A',
    borderBottomWidth: 1
  },
  navBarTitleText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 9, // iOS
  },
  navBarLeftButton: {
    paddingLeft: 10
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {
    color: '#EEE',
    fontSize: 16,
    marginVertical: 10 // iOS
  }
});

AppRegistry.registerComponent('ReactNotes', () => ReactNotes);
