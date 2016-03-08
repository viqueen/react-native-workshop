'use strict';

import React, {
  Component,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import * as messageActions from '../actions/actions';
import { connect } from 'react-redux';

import MessageList from './message-list';
import ColoredFab from './colored-fab';
import { fetchMessages, postMessage } from '../actions/actions';
import { ActivityIndicator } from './activity-indicator';
import { ErrorMessage } from './error-message'
import StartPage from './start-page';

class ListMessagesContainer extends Component {
  componentWillMount() {
    this._refreshView();
  }

  _goto() {
    this.props.navigator.push({component: StartPage, title: 'Test'});
  }

  render() {
    if (this.props.failedToFetchMessages) {
      return <ErrorMessage />
    }

    return (
      <View style={{ flex: 1, paddingTop: 50, backgroundColor: '#fff' }}>
        <MessageList
          refreshing={ this.props.isFetchingMessages }
          messages={ this.props.messages }
          refreshView={ this._refreshView.bind(this) }
          navigator={this.props.navigator}
        />
        <ColoredFab onPress={this._goto.bind(this)}>+</ColoredFab>
      </View>
    );
  }

  _refreshView() {
    this.props.fetchMessages();
  }
}

ListMessagesContainer.propTypes = {
  failedToFetchMessages: React.PropTypes.bool,
  isFetchingMessages: React.PropTypes.bool,
  messages: React.PropTypes.array
};

const mapStateToProps = state => {
  return {
    failedToFetchMessages: state.failedToFetchMessages,
    isFetchingMessages: state.isFetchingMessages,
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMessages: () => dispatch(fetchMessages(dispatch)),
  postMessage: (message) => dispatch(postMessage(dispatch, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListMessagesContainer);
