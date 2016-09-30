import { Component, PropTypes } from 'react';
import { getLoginStatus, addStatusListener } from '../utils/facebook';

const DEFAULT_STATUS = {
  status: 'not_authorized',
  authResponse: null
};

class FacebookStatus extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  state = { status: DEFAULT_STATUS };

  async componentWillMount() {
    try {
      this.setState({ loading: true });
      const status = await getLoginStatus();
      this.setState({ loading: false, status });
    } catch (err) {}

    this._statusSubscrption = addStatusListener(this.onStatusUpdate)
  }

  componentWillUnmount() {
    if (this._statusSubscription) {
      this._statusSubscrption();
    }
  }

  onStatusUpdate = status => {
    this.setState({ loading: false, status });
  }

  render() {
    return this.props.children(this.state.status);
  }
}

export default FacebookStatus;
