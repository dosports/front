import {getReviewDetail, getMyReviewIdx, pageUpEventHandler, beforePageBtnHandler, sports_img, sports_level, createFullReviewItem, like_toggle}  from "./myPage_modules.js";
import {reviewIdx_noPostman, reviewInfoArr_noPostman, userInfo_noPostman} from "./myPage_data.js"; // FIXME: postman 대신
import {ioCallback_my, addNewMyContent, loadFirstItems} from "./myPage_load10Review.js";

pageUpEventHandler(); // 페이지 맨 위로
beforePageBtnHandler(); // 이전 페이지로


// 1. 내가 쓴 리뷰 목록 가져와서 review_item 박스 만들어서 보여주기

// 2. 리뷰 작성하기 누르면 리뷰 작성하기 페이지로 이동

// 하트 toggle
const $main = document.querySelector('main');
$main.addEventListener('click', like_toggle);


const $review_container = document.querySelector('.review_container');
const io = new IntersectionObserver(ioCallback_my, {threshold : 0.7});
window.addEventListener('load', () => {
    $review_container.innerHTML = ""; // 처음에 모두 삭제
    loadFirstItems(io, addNewMyContent);
})