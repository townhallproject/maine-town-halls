/* eslint-disable max-len */
import React from 'react';
import { Layout, Row, Col } from 'antd';
import { partners } from '../../constants';

import './style.scss';

const {
  Footer,
} = Layout;


const FooterBanner = () => (
  <Footer className="layout-footer" style={{ textAlign: 'center' }} >
    <Row type="flex" justify="center">
      {partners.map(partner => (

        <Col sm={6} xs={8} key={partner.name}>
          <a
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`images/${partner.src}`} alt={`${partner.name} logo`} />
          </a>
        </Col>
      ))}
    </Row>
  </Footer>
);

export default FooterBanner;