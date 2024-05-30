import Image from "next/image";
import styles from "./page.module.css";
import KakaoMap from "@/app/_component/KakaoMap";
import AiFillStar from "./_component/AiFillStar";

export default function DetailPage() {
    return (
        <main className={styles.main}>
            <div className={styles.restaurantInfo}>
                <Image
                    src="https://d12zq4w4guyljn.cloudfront.net/750_750_20230912104151281_photo_d9db485df002.jpg"
                    width={400}
                    height={280}
                    alt="식당이미지"
                />
                <div className={styles.otherInfo}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <h1>쿠쉬</h1>
                        <button className={styles.heartButton}>
                            <svg
                                viewBox="0 0 24 24"
                                className={styles.heartButton}
                                width={32}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>
                    <div className={styles.foodTypes}>
                        <button className={styles.foodType}>#양식</button>
                        <button className={styles.foodType}>#중문</button>
                    </div>
                    <div className={styles.ratingsInfo}>
                        <div className={styles.starRatings}>
                            <div
                                className={styles.fillStars}
                                style={{ width: "80%" }}
                            >
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                            </div>
                            <div className={styles.baseStars}>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                            </div>
                        </div>
                        4/5 (7명의 평가)
                    </div>
                    <div className={styles.locInfo}>
                        <svg
                            fill="#000000"
                            height={18}
                            width={18}
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 297 297"
                            xmlSpace="preserve"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645 c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645 C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892 c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"></path>
                                    <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614 c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901 c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104 C179.265,127.948,165.464,141.901,148.5,141.901z"></path>
                                </g>
                            </g>
                        </svg>
                        <span style={{ marginLeft: "9px" }}>
                            충북 청주시 서원구 사창동 419
                        </span>
                    </div>
                    <div className={styles.contactInfo}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            width={18}
                            height={18}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M5 7V5C5 3.89543 5.89543 3 7 3H13H19C20.1046 3 21 3.89543 21 5V7V17V19C21 20.1046 20.1046 21 19 21H13H7C5.89543 21 5 20.1046 5 19V17V7Z"
                                    stroke="#323232"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M16 12C16 13.6569 14.6569 15 13 15C11.3431 15 10 13.6569 10 12C10 10.3431 11.3431 9 13 9C14.6569 9 16 10.3431 16 12Z"
                                    stroke="#323232"
                                    strokeWidth="2"
                                ></path>
                                <path
                                    d="M9 21C9.42546 18.6928 10.52 18 13 18C15.48 18 16.5745 18.6425 17 20.9497"
                                    stroke="#323232"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                ></path>
                                <path
                                    d="M3 7H5"
                                    stroke="#323232"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M3 17H5"
                                    stroke="#323232"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M3 12H5"
                                    stroke="#323232"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </g>
                        </svg>
                        <span style={{ marginLeft: "9px" }}>
                            0507-1428-0126
                        </span>
                    </div>
                </div>
            </div>
            <h2>위치 정보</h2>
            <KakaoMap />
            <h2 style={{ marginTop: "64px" }}>리뷰</h2>
            <div className={styles.stars}>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
            </div>
            <div className={styles.reviewWrapper}>
                <textarea
                    className={styles.reviewTextArea}
                    rows={5}
                    placeholder="리뷰 내용을 입력해주세요."
                />
                <div className={styles.uploadButtons}>
                    <button className={styles.imageButton}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            width={18}
                            height={18}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    </button>
                    <button className={styles.uploadButton}>등록하기</button>
                </div>
            </div>
        </main>
    );
}
