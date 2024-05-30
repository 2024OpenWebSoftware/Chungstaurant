import Link from 'next/link';
import styles from "./page.module.css";

export default function LoginPage() {
    return (
        <div className={styles.loginWrapper}>
            <h1 style={{fontWeight: "200"}}>LOGIN</h1>
            <input className={styles.input} type="text" placeholder="ID" />
            <input className={styles.input} type="password" placeholder="PASSWORD" />
            <div className={styles.buttons}>
                <button className={styles.loginButton}>LOGIN</button>
                <div>
                    처음 방문하셨나요?&nbsp;
                    <Link className={styles.navButton} href="/signup">회원가입</Link>
                </div>
            </div>
        </div>
    )
}