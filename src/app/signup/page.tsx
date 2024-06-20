"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "../login/page.module.css";

import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChungstaurantFirestore, auth } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            if (id == "" || email == "" || password == "") {
                throw "모든 폼을 입력해야 합니다.";
            }

            if (password != repassword) {
                throw "비밀번호가 일치하지 않습니다.";
            }

            const idDocRef = doc(ChungstaurantFirestore, "Users", id);
            const idDocSnapshot = await getDoc(idDocRef);

            if (idDocSnapshot.exists()) {
                throw new Error("이미 사용 중인 ID입니다.");
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await setDoc(doc(ChungstaurantFirestore, "Users", user.uid), {
                id: id,
                email: user.email,
            });

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

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setId(e.target.value);
    };

    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    const onChangeRepassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setRepassword(e.target.value);
    };

    return (
        <div className={styles.loginWrapper}>
            <h1 style={{ fontWeight: "200" }}>SIGNUP</h1>
            <form onSubmit={onSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="ID"
                    onChange={onChangeId}
                />
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
                <input
                    className={styles.input}
                    type="password"
                    placeholder="RE-PASSWORD"
                    onChange={onChangeRepassword}
                />
                <div className={styles.buttons}>
                    <button className={styles.loginButton}>SIGNUP</button>
                    <div>
                        이미 계정이 있습니까?&nbsp;
                        <Link className={styles.navButton} href="/login">
                            로그인하기
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
