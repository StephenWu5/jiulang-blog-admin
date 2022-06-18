import React from 'react';

import styles from './footer.module.css';

class FooterContent extends React.PureComponent {
    render() {
        return <div className={styles.footerWrapper}>
            博客服务平台@ 2019-12～2022-12
        </div>;
    }
}
export default FooterContent;
