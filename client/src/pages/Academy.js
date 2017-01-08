import React, { Component } from 'react';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import PageSection from '../components/PageSection';
import InfoCard from '../components/InfoCard';
import InfoCardGrid from '../components/InfoCardGrid';
import '../styles/pages/Academy.scss';

const MAX_DESCRIPTION_LENGTH =  25;

const TITLE = 'Jewish Live!';
const DESCRIPTION = 'We broadcast our weekly learning on Facebook Live, ' +
  'here are some recent videos and podcasts.';

class Academy extends Component {
  constructor() {
    super();

    this.state = { loaded: false, loading: false, data: {} };
  }

  async componentDidMount() {
    if (this.state.loaded  || this.state.loading) {
      return;
    }

    try {
      const response = await fetch('/api/academy/config');
      const data = await response.json();
      this.setState({ loading: false, loaded: true, data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  renderVideoCard() {
    const { data: { videoInfo } } = this.state;
    if (!videoInfo) {
      return null;
    }

    const { title, image, url } = videoInfo;
    let { description } = videoInfo;

    if (description && description.length > MAX_DESCRIPTION_LENGTH) {
      description = description.substr(0, MAX_DESCRIPTION_LENGTH) + '...';
    }

    return (
      <InfoCard
        url={url}
        title={title}
        subtitle={description}
        actionTitle="See latest videos"
        image={image}
      />
    );
  }

  renderBumpersCard() {
    const { data: { bumpersInfo } } = this.state;
    if (!bumpersInfo) {
      return null;
    }

    const { title, image, url } = bumpersInfo;
    return (
      <InfoCard
        url={url}
        title={title}
        actionTitle="Listen on Bumpers.fm"
        image={image}
      />
    );
  }

  render() {
    return (
      <div>
        <PageHeader 
          headline={TITLE}
          text={DESCRIPTION} 
        />
        <PageSection alt>
          <Container size="md">
            <InfoCardGrid>
              {this.renderVideoCard()}
              {this.renderBumpersCard()}
            </InfoCardGrid>
          </Container>
        </PageSection>
      </div>
    );
  }
}

export default Academy;