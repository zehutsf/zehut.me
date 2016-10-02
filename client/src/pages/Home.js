import React, { Component } from 'react';
import Resizer from '../components/Resizer';
import Scaler from '../components/Scaler';
import VCContainer from '../components/VCContainer';
import BlockText from '../components/BlockText';

import '../styles/pages/Home.scss';

const VIDEO_SOURCES = [
  { type: 'video/webm', src: require('../videos/tu-bav.webm') },
  { type: 'video/mp4', src: require('../videos/tu-bav.mp4') }
];

const INTRINSIC_VIDEO_SIZE = { width: 16, height: 9 };

class Home extends Component {
  renderVideo(viewportSize, videoSize) {
    const videoContainerStyle = {
      width: viewportSize.width,
      height: viewportSize.height,
    };

    const videoOffsetStyle = {
      left: viewportSize.width / 2 - videoSize.width / 2 | 0,
      top: viewportSize.height / 2 - videoSize.height / 2 | 0,
      width: videoSize.width,
      height: videoSize.height,
    };

    // https://webkit.org/blog/6784/new-video-policies-for-ios/ 
    return (
      <div className="Home-videoContainer" style={videoContainerStyle}>
        <div className="Home-videoOffset" style={videoOffsetStyle}>
          <video 
            muted loop autoPlay playsInline
            width={videoSize.width} 
            height={videoSize.height}>
            {VIDEO_SOURCES.map(({ type, src }) => <source key={type} type={type} src={src} />)}
          </video>
        </div>
      </div>
    )
  }

  componentDidMount() {

  }

  renderContent() {
    return (
      <VCContainer>
        <div className="Home-content">
          <div className="Home-logo">Zehut!</div>
          <BlockText>The Jewish engine in San Francisco</BlockText>
        </div>
      </VCContainer>
    );
  }

  render() {
    return (
      <div>
        <Resizer>
          {viewportSize => (
            <Scaler 
              viewportWidth={viewportSize.width} 
              viewportHeight={viewportSize.height} 
              width={INTRINSIC_VIDEO_SIZE.width}
              height={INTRINSIC_VIDEO_SIZE.height}>
              {scaledSize => this.renderVideo(viewportSize, scaledSize)}
            </Scaler>
          )}
        </Resizer>
        {this.renderContent()}
      </div>
    );
  }
}

export default Home;
