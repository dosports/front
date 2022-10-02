/**
 * 페이지 로드
 */
import { header_onload, header_onscroll, alarm_reset } from "./header.js";

function review_container(review) {
	return `
		<div class="review_item">
			<div class="review_leftContainer">
				<div class="review_img_container">
					<img src="${review.img_path}" alt="내가 쓴 리뷰 사진" class="review_img" /> 
				</div>
				<div class="heart_container">
					<span class="iconify heart-icon" data-icon="akar-icons:heart"></span>
					<span class="heart_cnt">${review.likes}개</span>
				</div>
			</div>
			<div class="review_rightContainer">
				<div class="my_review_titleAndWriter">
					<div class="review_title">${review.brand} ${review.title}</div>
					<div class="review_writerAndTime">${review.reviewIdx} / ${review.regDate}</div>
				</div>
				<div class="my_review_star">${review.rate}</div>
				<div class="my_review_likeAndComment">${review.likes} / ${review.comments}</div>
				<div class="my_review_writerDetail">${review.gender} / ${review.height} / ${review.level}</div>
				<div class="my_review_buyInfo">${review.source} / ${review.price}</div>
				<div class="my_review_content">${review.content}</div>
			</div>
		</div>
	`;
}
get_review();
async function get_review() {
	let requestOptions = {
		method: "GET",
		redirect: "follow",
	};
	let best_reviews = await fetch("http://13.125.187.165/review?sort_param=2&page_num=1", requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log("error", error));
	const container = document.querySelector("#review_container");
	for (let i = 0; i < best_reviews.length; i++) {
		const addElement = document.createElement("a");
		addElement.setAttribute("href", `reviews/${best_reviews[i]}`); //TODO
		addElement.innerHTML = review_container(best_reviews[i]);
		container.appendChild(addElement);
	}
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
main_onload();
header_onload();
window.addEventListener("scroll", header_onscroll);
window.addEventListener("resize", scrollX_reset);
window.addEventListener("resize", alarm_reset);
window.addEventListener("resize", set_review_count);
