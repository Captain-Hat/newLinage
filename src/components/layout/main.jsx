import React from 'react';
import PropTypes from 'prop-types';
import { Layout, BackTop } from 'antd';
// import { connect } from 'dva';
import Header from './header.jsx';
import Footer from './footer.jsx';
import styles from './main.less';

function Main({
  children, location
}) {
  return (
    <Layout className={styles.normal}>
      <Layout.Header className={styles.header}>
        <Header location={location} />
      </Layout.Header>
      <Layout.Content className={styles.content}>
        <div className={styles.container}>
          {children}
        </div>
        <BackTop />
      </Layout.Content>
      <Layout.Footer className={styles.footer}>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

Main.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
//   const { location } = state.main;
//   return {
//     location
//   };
// }
// export default connect(mapStateToProps)(Main); 
export default Main; 
