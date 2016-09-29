import { Component, PropTypes } from 'react';
import throttle from 'lodash/throttle';

export default class Resizer extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.onResize = throttle(this.onResize, 10);
  }

  updateSize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  onResize = () => {
    this.updateSize();
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResize);

    this.updateSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize); 
  }

  render() {
    return this.props.children(this.state);
  }
}
