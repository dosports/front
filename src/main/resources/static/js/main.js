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
 * container
 */
function article_container(article) {
	return `
		<div class="article-item">
			<img class="article-item-img src="${article.img_path}"">
			<div class="article-item-info flex_row">
				<span class="item_brand article-item-info_font">${article.brand}</span>
				<span class="item_name article-item-info_font">${article.title}</span>
			</div>
		</div>
	`;
}

/**
 * API
 */
/* 추천 리뷰 fetch */
get_recommend_reviews();
async function get_recommend_reviews() {
	const gender = localStorage.getItem("gender");
	let requestOptions = {
		method: "GET",
		redirect: "follow",
	};
	let sports = undefined;
	const recommend_reviews_container = document.querySelectorAll("#recommend-container>a");
	if (gender == null) {
	} else if (gender == "f") {
	} else if (gender == "m") {
	}
	const recommend_reviews = await fetch("/review/?sort_param=4&page_num=1&review_num=8", requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log("error", error));
	for (let i = 0; i < 4; i++) {
		recommend_reviews_container[i].setAttribute("href", `review/${recommend_reviews[i].reviewIdx}`); //TODO : review/:reviewIdx
		recommend_reviews_container[i].querySelector(".article-item-img").setAttribute("src", `review/${recommend_reviews[i].img_path}`);
		recommend_reviews_container[i].querySelector(".article-item-img").classList.remove("loading");
		recommend_reviews_container[i].querySelector(".article-item-info").classList.remove("loading");
		recommend_reviews_container[i].querySelector(".item_brand").setAttribute("src", `review/${recommend_reviews[i].brand}`);
		recommend_reviews_container[i].querySelector(".item_name").setAttribute("src", `review/${recommend_reviews[i].title}`);
	}
	if (recommend_reviews.length > 4) {
		for (let i = 4; i < recommend_reviews.length; i++) {
			const addElement = document.createElement("a").setAttribute("href", `/revies/${recommend_reviews[i].reviewIdx}`); //TODO : review/:reviewIdx
			addElement.innerHTML = article_container(recommend_reviews[i]);
			document.querySelector("#recommend-container").appendChild();
		}
	}
}
/* 베스트리뷰 fetch */
get_best_reviews();
async function get_best_reviews() {
	let requestOptions = {
		method: "GET",
		redirect: "follow",
	};
	const best_reviews_container = document.querySelectorAll("#best-container>a");
	const best_reviews = await fetch("/review/?sort_param=2&page_num=1&review_num=8", requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log("error", error));
	for (let i = 0; i < 8; i++) {
		best_reviews_container[i].setAttribute("href", `review/${best_reviews[i].reviewIdx}`); //TODO : review/:reviewIdx
		best_reviews_container[i].querySelector(".article-item-img").setAttribute("src", `review/${best_reviews[i].img_path}`);
		best_reviews_container[i].querySelector(".article-item-img").classList.remove("loading");
		best_reviews_container[i].querySelector(".item_brand").setAttribute("src", `review/${best_reviews[i].brand}`);
		best_reviews_container[i].querySelector(".item_brand").classList.remove("loading");
		best_reviews_container[i].querySelector(".item_name").setAttribute("src", `review/${best_reviews[i].title}`);
		best_reviews_container[i].querySelector(".item_name").classList.remove("loading");
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
