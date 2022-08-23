/**
 * 페이지 로드
 */
import { header_onload, header_onscroll, alarm_reset } from "./header.js";
await fetch("../../templates/main/main_header.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector("header").innerHTML = text;
	});
// window.onload = () => {
// 	main_onload();
// 	header_onload();
// };
main_onload();
header_onload();
window.onscroll = header_onscroll;
function main_onload() {
	document.querySelector("#article-arrow-left").addEventListener("click", scroll_left);
	document.querySelector("#article-arrow-right").addEventListener("click", scroll_right);
	// header_onload();
}
window.addEventListener("resize", () => {
	scrollX_reset();
	alarm_reset();
});
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
 * 화면사이즈 변화할때 x축 스크롤 리셋
 */
function scrollX_reset() {
	if (window.innerWidth >= 1424) {
		const container = document.querySelector("#recommend-container");
		container.style.scrollBehavior = "unset";
		container.scrollLeft = 0;
		container.style.scrollBehavior = "smooth";
	}
}
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
 * API
 */
/* 알람 fetch */
function getAlarm() {}
