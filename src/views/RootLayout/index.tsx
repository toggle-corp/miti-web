import {
    Outlet,
    useNavigation,
} from 'react-router-dom';
import { _cs } from '@togglecorp/fujs';

import useDebouncedValue from '#hooks/useDebouncedValue';

import styles from './styles.module.css';

// eslint-disable-next-line import/prefer-default-export
export function Component() {
    const { state } = useNavigation();
    const isLoading = state === 'loading';
    const isLoadingDebounced = useDebouncedValue(isLoading);

    return (
        <div className={styles.root}>
            {(isLoading || isLoadingDebounced) && (
                <div
                    className={_cs(
                        styles.navigationLoader,
                        !isLoading && isLoadingDebounced && styles.disappear,
                    )}
                />
            )}
            <div className={styles.navbar}>
                This is navbar
            </div>
            <div className={styles.pageContent}>
                <Outlet />
            </div>
            <div className={styles.footer}>
                This is footer
            </div>
        </div>
    );
}

Component.displayName = 'Root';
