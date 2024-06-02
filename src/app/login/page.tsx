"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error: any) {
            console.error(error);

            switch (error.code) {
                case "auth/user-not-found" || "auth/wrong-password":
                    alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
                    break;
                case "auth/email-already-in-use":
                    alert("이미 사용 중인 이메일입니다.");
                    break;
                case "auth/weak-password":
                    alert("비밀번호는 6글자 이상이어야 합니다.");
                    break;
                case "auth/network-request-failed":
                    alert("네트워크 연결에 실패 하였습니다.");
                    break;
                case "auth/invalid-email":
                    alert("잘못된 이메일 형식입니다.");
                    break;
                case "auth/internal-error":
                    alert("잘못된 요청입니다.");
                    break;
                default:
                    alert("로그인에 실패 하였습니다.");
            }
        }
    };

    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={styles.loginWrapper}>
            <h1 style={{ fontWeight: "200" }}>LOGIN</h1>
            <form onSubmit={onSubmit}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="EMAIL"
                    onChange={onChangeEmail}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="PASSWORD"
                    onChange={onChangePassword}
                />
                <div className={styles.buttons}>
                    <button className={styles.loginButton}>LOGIN</button>
                    <div>
                        처음 방문하셨나요?&nbsp;
                        <Link className={styles.navButton} href="/signup">
                            회원가입
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
