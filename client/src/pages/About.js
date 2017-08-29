import React, { Component } from 'react';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import PageSection from '../components/PageSection';

import '../styles/pages/About.scss';

const TITLE = 'Zehut';
const DESCRIPTION = `Zehut was established in San Francisco CA in 2007 as a ` +
`community for millennial Jewish folk who want to have a  spiritual `+
`experience that is both authentic and personal.`;

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
              10 years later Zehut has curated events in SF LA NY Paris & Israel 
              while moving it's headquarters to Venice Beach CA.
            </p>
            <p>
              Led by the dynamic leadership of Peretz and Miryum Mochkin, the 
              future of Jewish life looks as bright and colorful as it ever has.
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