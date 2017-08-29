import React, { Component } from 'react';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import PageSection from '../components/PageSection';

import '../styles/pages/About.scss';

const TITLE = 'Judaism 2.0';
const DESCRIPTION = 'San Francisco is the place for it';

class About extends Component {
  render() {
    return (
      <div>
        <PageHeader 
          headline={TITLE}
          text={DESCRIPTION}
          image={require('../images/parade.jpg')}
        />
        <Container size="md">
          <PageSection>
            <p>
              Awesome stuff goes here.
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