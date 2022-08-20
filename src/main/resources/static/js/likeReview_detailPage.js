import {getReviewDetail, getLikeReviewIdx, pageUpEventHandler, beforePageBtnHandler, sports_img, sports_level, like_toggle, createFullReviewItem}  from "./myPage_modules.js";
import {reviewIdx_noPostman, reviewInfoArr_noPostman, userInfo_noPostman} from "./myPage_data.js"; // FIXME: postman 대신
import {ioCallback_like, addNewLikeContent, loadFirstItems} from "./myPage_load10Review.js";
// // 1. 좋아요한 리뷰 목록 가져와서 review_item박스 만들어서 보여주기
pageUpEventHandler();
beforePageBtnHandler();

// 하트 toggle
const $main = document.querySelector('main');
$main.addEventListener('click', like_toggle);

const $review_container = document.querySelector('.review_container');
const io = new IntersectionObserver(ioCallback_like, {threshold : 0.7});
window.addEventListener('load', () => {
    $review_container.innerHTML = ""; // 처음에 모두 삭제
    loadFirstItems(io, addNewLikeContent);
})

