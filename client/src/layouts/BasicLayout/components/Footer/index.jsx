import React from 'react';
import Layout from '@icedesign/layout';
import Logo from '../Logo';

import styles from './index.module.scss';

export default function Footer() {
  return (
    <Layout.Footer className={styles.iceDesignLayoutFooter}>
      <div className={styles.iceDesignLayoutFooterBody}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.copyright}>
          © 2019 ITP
        </div>
      </div>
    </Layout.Footer>
  );
}
