import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Head from '../components/head';
import Loader from '../components/loader';
import Header from '../components/header';
import Social from '../components/social';
import Email from '../components/email';
import Footer from '../components/footer';
import { nav } from '../config';
import styled from 'styled-components';
import { GlobalStyle, theme } from '../styles';
const { colors, fontSizes, fonts } = theme;

const SkipToContent = styled.a`
  position: absolute;
  top: auto;
  left: -999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -99;
  &:hover {
    background-color: ${colors.darkGrey};
  }
  &:focus,
  &:active {
    outline: 0;
    color: ${colors.green};
    background-color: ${colors.lightNavy};
    border-radius: ${theme.borderRadius};
    padding: 18px 23px;
    font-size: ${fontSizes.small};
    font-family: ${fonts.SFMono};
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: ${theme.transition};
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    overflow: auto;
    z-index: 99;
  }
`;

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object,
  };

  state = {
    isLoading: true,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  finishLoading = () => {
    if (this._isMounted) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { children, location } = this.props;
    const { isLoading } = this.state;

    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                title
                siteUrl
                description
              }
            }
          }
        `}
        render={({ site }) => (
          <div id="root">
            <Head metaData={site.siteMetadata} />

            <GlobalStyle />

            <SkipToContent href="#content">Skip To Content</SkipToContent>

            {isLoading ? (
              <Loader finishLoading={this.finishLoading} />
            ) : (
              <div className="container">
                <Header location={location} navLinks={nav} />

                <Social />

                <Email />

                {children}

                <Footer />
              </div>
            )}
          </div>
        )}
      />
    );
  }
}

export default Layout;
