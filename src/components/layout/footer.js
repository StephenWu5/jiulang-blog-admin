import React from 'react';

import styles from './footer.module.css';

class FooterContent extends React.PureComponent {
    render() {
        return <div className={styles.footerWrapper}>
            @旧浪博客2019-12～2021-12
        </div>;
    }
}
export default FooterContent;
