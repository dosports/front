import {getReviewDetail, getLikeReviewIdx, pageUpEventHandler, beforePageBtnHandler, sports_img, sports_level, createFullReviewItem}  from "./myPage_modules.js";
import {ioCallback_like, addNewLikeContent, loadFirstItems, reviewClickedEventHandler} from "./myPage_load10Review.js";
import {like_toggle} from "./myPage_likeBtn_modules.js";
import {header_onload, header_onscroll, alarm_reset} from "./header.js";

await fetch("../../templates/main/main_header.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector(".default_header").innerHTML = text;
        header_onload();
        window.onscroll = header_onscroll;
        window.addEventListener("resize", alarm_reset);
});


// 이전페이지로, 맨위로 버튼

pageUpEventHandler();
beforePageBtnHandler();

// 하트 toggle - 서버에 데이터 전달하는 것까지 포함
const $main = document.querySelector('main');
$main.addEventListener('click', like_toggle);

// 리뷰들 가져오기
const $review_container = document.querySelector('.review_container');
const io = new IntersectionObserver(ioCallback_like, {threshold : 0.7});
window.addEventListener('load', () => {
    console.log('my load');
    $review_container.innerHTML = ""; // 처음에 모두 삭제
    loadFirstItems(io, addNewLikeContent);
})

// 리뷰 제목, 사진 클릭시 리뷰 상세보기 페이지로 이동
$main.addEventListener('click', (event) => {
    reviewClickedEventHandler(event);
});


