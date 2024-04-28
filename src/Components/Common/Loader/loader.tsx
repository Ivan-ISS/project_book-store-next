import styles from './loader.module.scss';

const Loader = () => {

    return (
        <div className={styles.loader}>
            <span className={`${styles.one} ${styles.item}`}></span>
            <span className={`${styles.two} ${styles.item}`}></span>
            <span className={`${styles.three} ${styles.item}`}></span>
            <span className={`${styles.four} ${styles.item}`}></span>
        </div>
    );
};

export default Loader;