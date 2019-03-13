import React, { Component } from 'react';
// import BlockText from '../components/BlockText';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import PageSection from '../components/PageSection';

import '../styles/pages/About.scss';

const TITLE = 'The Venice Synagogue';
const DESCRIPTION = `The mission of The Venice Synagogue is to develop a community for
millennial Jewish folk who want to have a spiritual experience that is
both authentic and personal.`;

class About extends Component {
  render() {
    return (
      <div>
        <PageHeader 
          headline={TITLE}
          text={DESCRIPTION}
          image={require('../images/rebeccas_minyan.jpg')}
        />
        <Container size="md">
          <PageSection>
            <p>
              The community began in 2011 in San Francisco, and has  curated events
in NY LA Paris & Israel.
            </p>
            <p>
              In 2018 we have begun a building campaign in the epicenter of todays
creative culture Venice Beach, CA  to establish a long term home for
our innovative programing.
            </p>
            <p>
              Our vision is to create a space that has the look and feel of the
surrounding establishments.
            </p>
            <p>
              We welcome you to participate by connecting and contributing
            </p>
            <p>
              <a href="mailto:rabbi@zehut.me">Get in touch</a>
            </p>
          </PageSection>
        </Container>
      </div>
    );
  }
}

export default About;