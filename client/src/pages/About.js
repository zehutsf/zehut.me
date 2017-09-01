import React, { Component } from 'react';
import BlockText from '../components/BlockText';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import PageSection from '../components/PageSection';
import {getConfig} from '../utils/config';

import '../styles/pages/About.scss';

const TITLE = 'Zehut';
const DESCRIPTION = `Zehut is a community for millennial Jewish folk who want `+
 `to have a  spiritual experience that is both authentic and personal.`;

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
              Est. 10 years ago in San Francisco, Zehut has curated events in 
              SF LA NY Paris & Israel while moving it's headquarters to Venice Beach, CA.   
            </p>
            <p>
              Led by the dynamic leadership of Peretz and Miryum Mochkin, the 
              future of Jewish life looks as bright and colorful as it ever has. 
            </p>
            <p>
              <a href={getConfig().MAILCHIMP_URL}>
                Connect with us
              </a>
            </p>
          </PageSection>
        </Container>
      </div>
    );
  }
}

export default About;