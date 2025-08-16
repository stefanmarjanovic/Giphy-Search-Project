import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router-dom'; 

interface Props {
  children: JSX.Element;
  title?: string;
}

const PageWrapper = (props: Props): JSX.Element => {
  const { children, title } = props;
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Baseline Core` : 'Baseline Core'}</title>
      </Helmet>
      {location.pathname !== "/" && <Navbar />}
      {children}
      {location.pathname !== "/" && <Footer />}
    </>
  );
};

export default PageWrapper;
