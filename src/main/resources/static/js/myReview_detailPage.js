import {getReviewDetail, getMyReviewIdx, pageUpEventHandler, beforePageBtnHandler, sports_img, sports_level, createFullReviewItem}  from "./myPage_modules.js";
// import {reviewIdx_noPostman, reviewInfoArr_noPostman, userInfo_noPostman} from "./myPage_data.js"; // FIXME: postman 대신
import {ioCallback_my, addNewMyContent, loadFirstItems, reviewClickedEventHandler} from "./myPage_load10Review.js";
import {like_toggle} from "./myPage_likeBtn_modules.js";
import {header_onload, header_onscroll, alarm_reset} from "./header.js";


const $review_container = document.querySelector('.review_container');
const io = new IntersectionObserver(ioCallback_my, {threshold : 0.7});


pageUpEventHandler(); // 페이지 맨 위로
beforePageBtnHandler(); // 이전 페이지로

// 하트 toggle
const $main = document.querySelector('main');
$main.addEventListener('click', like_toggle);


window.addEventListener('load', () => {
    $review_container.innerHTML = ""; // 처음에 모두 삭제
    loadFirstItems(io, addNewMyContent);
})


// 리뷰 제목, 사진 클릭시 리뷰 상세보기 페이지로 이동
$main.addEventListener('click', (event) => {
    reviewClickedEventHandler(event);
});

await fetch("../../templates/main/main_header.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector(".default_header").innerHTML = text;
});
header_onload();
window.onscroll = header_onscroll;
window.addEventListener("resize", alarm_reset);