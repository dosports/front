/**
 * 페이지 로드
 */
import { header_onload, header_onscroll, alarm_reset } from "./header.js";
function main_onload() {
    document.querySelector("#article-arrow-left").addEventListener("click", scroll_left);
    document.querySelector("#article-arrow-right").addEventListener("click", scroll_right);
    // header_onload();
}
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

/**
 * 화면사이즈 변화할때
 * x축 스크롤 리셋
 * 베스트 리뷰 개수 변화
 */
let screen1424 = false;
function scrollX_reset() {
    if (!screen1424) {
        if (window.innerWidth >= 1424) {
            const container = document.querySelector("#recommend-container");
            container.style.scrollBehavior = "unset";
            container.scrollLeft = 0;
            container.style.scrollBehavior = "smooth";
        }
        screen1424 = true;
    } else screen1424 = false;
}
let screen1080 = window.innerWidth;
function set_review_count() {
    if (window.innerWidth >= 1080) {
        if (screen1080 < 1080) {
            const best_reviews = document.querySelectorAll("#best-container > a");
            best_reviews[6].style.display = "block";
            best_reviews[7].style.display = "block";
            screen1080 = window.innerWidth;
        }
    } else {
        if (screen1080 >= 1080) {
            const best_reviews = document.querySelectorAll("#best-container > a");
            best_reviews[6].style.display = "none";
            best_reviews[7].style.display = "none";
            screen1080 = window.innerWidth;
        }
    }
}


/**
 * 헤더 푸터 fetch
 */
fetch("../../templates/main/footer.html")
    .then((res) => res.text())
    .then((text) => {
        document.querySelector("footer").innerHTML = text;
    });
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
main_onload();
header_onload();
window.addEventListener("scroll", header_onscroll);
window.addEventListener("resize", scrollX_reset);
window.addEventListener("resize", alarm_reset);
window.addEventListener("resize", set_review_count);
