import { header_onload, header_onscroll, alarm_reset } from "./header.js";

/**
 * 토큰확인
 */
function checkToken() {
    const token = localStorage.getItem("obj");
    return token;
}
let myHeaders = new Headers();
if (checkToken() != null) {
    myHeaders.append("Authorization", checkToken());
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const user_name = await fetch("/user/name", requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));

    document.querySelector("#log").innerText = "로그아웃";
    document.querySelector("#header-desktop > #header_title > #header-right > .header-right-item").innerText = `${user_name}님 안녕하세요`;
}

let screen1080 = window.innerWidth;

/**
 * 추천리뷰 스크롤 버튼에 따른 작동 제어 (데스크탑)
 */
function scroll_right() {
    const offset = document.querySelector("#recommend-container > a").offsetWidth * 4;
    document.querySelector("#recommend-container").scrollLeft += offset;
}
function scroll_left() {
    const offset = document.querySelector("#recommend-container > a").offsetWidth * 4;
    document.querySelector("#recommend-container").scrollLeft -= offset;
}

/**
 * 헤더 푸터 fetch
 */

await fetch("../../templates/main/main_header.html")
    .then((res) => res.text())
    .then((text) => {
        document.querySelector("header").innerHTML = text;
        console.log(2);
    });
if (screen1080 < 1080) {
    const best_reviews = document.querySelectorAll("#best-container > a");
    best_reviews[6].style.display = "none";
    best_reviews[7].style.display = "none";
}
header_onload();
window.addEventListener("scroll", header_onscroll);
window.addEventListener("resize", alarm_reset);