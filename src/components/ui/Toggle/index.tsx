import styles from '@/styles/Toggle/Toggle.module.css';

export default function Toggle({ toggleState = false, setToggleState }: any) {
    return (
        <label className={styles.switch}>
            <input type="checkbox" checked={toggleState} onChange={(e) => setToggleState(e.target.checked)} />
            <span className={`${styles.round} ${styles.slider}`}></span>
        </label>
    );
}
