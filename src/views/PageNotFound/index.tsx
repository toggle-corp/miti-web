import Page from '#components/Page';

import styles from './styles.module.css';

// eslint-disable-next-line import/prefer-default-export
export function Component() {
    return (
        <Page
            className={styles.pageNotFound}
            title="Miti - Page not found!"
        >
            <h1>
                Page not found
            </h1>
            <div>
                The requested page does not exit or may have been removed.
            </div>
        </Page>
    );
}

Component.displayName = 'PageNotFound';
