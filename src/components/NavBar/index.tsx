import React from 'react';
import { _cs } from '@togglecorp/fujs';
import styles from './styles.scss';
import Button from '#rsca/Button';
import Icon from '#rscg/Icon';

interface PropTypes {
    className?: string;
    onTodayButton?: () => void;
}


const NavBar: React.FC<PropTypes> = ({ className, onTodayButton }: PropTypes) => (
    <div className={_cs(className, styles.navBar)}>
        <h1>
            मिति
        </h1>
        <div className={styles.buttons}>
            <Button
                className={styles.todayButton}
                onClick={onTodayButton}
                transparent
            >
                <Icon name="today" />
            </Button>
        </div>
    </div>
);

export default NavBar;
