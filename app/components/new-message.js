'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { postMessage, setNewMessageText, setUsername } from '../actions/actions';

class NewMessage extends Component {
    render() {
        const sendButton = Platform.OS === 'android' ? null : this._renderSendButton();
        const { username, newMessageText, setNewMessageText, setUsername, postMessage, navigator } = this.props;
        return (
            <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={username}
                  onChangeText={setUsername}
                  />
                <TextInput
                  style={styles.input}
                  placeholder="Message"
                  value={newMessageText}
                  onChangeText={setNewMessageText} />
                  { sendButton }
            </View>
        );
    }

    _renderSendButton() {
      return (
        <TouchableOpacity
          style={styles.sendButton}
          onPress={this._onSend.bind(this)}>
            <Text>Send</Text>
        </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 100
    },
    input: {
      height: 30,
      margin: 10,
      padding: 5,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5
    },
    sendButton: {
      alignSelf: 'flex-end',
      margin: 10
    }
});

const mapStateToProps = ({ username, newMessageText }) => ({ username, newMessageText });
const mapDispatchToProps = (dispatch) => ({
    postMessage: navigator => dispatch(postMessage(navigator)),
    setNewMessageText: message => dispatch(setNewMessageText(message)),
    setUsername: name => dispatch(setUsername(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
