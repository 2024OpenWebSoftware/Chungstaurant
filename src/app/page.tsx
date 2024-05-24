import Restaurant from './_component/Restaurant';
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>우리 오늘 뭐 먹니?</h1>
      <h2>충북대학교 주변 먹을만한 식당들을 소개합니다.</h2>
      <div style={{marginTop: "32px", marginBottom: "24px", fontWeight: "800"}}>음식 종류</div>
      <div className={styles.foodTypes}>
        <button className={styles.foodType}>전체</button>
        <button className={styles.foodType}>한식</button>
        <button className={styles.foodType}>일식</button>
        <button className={styles.foodType}>양식</button>
        <button className={styles.foodType}>중식</button>
        <button className={styles.foodType}>고기</button>
        <button className={styles.foodType}>분식</button>
        <button className={styles.foodType}>기타</button>
      </div>
      <div className={styles.restaurantWrapper}>
        <Restaurant />
        <Restaurant />
        <Restaurant />
        <Restaurant />
        <Restaurant />
      </div>
    </main>
  );
}
