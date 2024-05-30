import styles from "../login/page.module.css";

import Link from 'next/link';

export default function SignUpPage() {
    return (
        <div className={styles.loginWrapper}>
            <h1 style={{fontWeight: "200"}}>SIGNUP</h1>
            <input className={styles.input} type="text" placeholder="ID" />
            <input className={styles.input} type="email" placeholder="EMAIL" />
            <input className={styles.input} type="password" placeholder="PASSWORD" />
            <input className={styles.input} type="password" placeholder="RE-PASSWORD" />
            <div className={styles.buttons}>
                <button className={styles.loginButton}>SIGNUP</button>
                <div>
                    이미 계정이 있습니까?&nbsp;
                    <Link className={styles.navButton} href="/login">로그인하기</Link>
                </div>
            </div>
        </div>
    )
}