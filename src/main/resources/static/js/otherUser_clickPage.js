import {getUserInfo, getReviewDetail, createFullReviewItem, like_toggle, beforePageBtnHandler} from "./myPage_modules.js";
import {reviewIdx_noPostman, reviewInfoArr_noPostman, userInfo_noPostman} from "./myPage_data.js"; // FIXME: postman 대신
import {ioCallback_otherUser, addNewOtherReviewContent, loadFirstItems} from "./myPage_load10Review.js";

// 이전 페이지로
beforePageBtnHandler();

// 1. 프로필 이미지, 이름
const $otherUserPage_main_header = document.querySelector('.otherUserPage_main_header');
const $section_header = document.querySelector('.section_header');
async function showOtherUserInfo(){
    // const userInfo = await getUserInfo(userIdx);
    const userInfo = userInfo_noPostman;
    // const pre_img_src = userInfo.profileImg == "" ? "../img/logo_white.png" : `${url}/user/profileImg/${userInfo.profileImg}`;// FIXME: 정확하지 않음
    const pre_img_src = userInfo.profileImg;
    $otherUserPage_main_header.innerHTML = `
        <div class="profile_img_container skeleton">
            <img src="" alt="사용자 프로필 사진" class="profile_img hidden">
        </div>
        <div class="user_name"><span class="skeleton">아무개님</span></div>
        `;
    $section_header.innerHTML = `<div class="section_header_title"><span class="skeleton">아무개</span>님이 작성한 리뷰</div>`;
    
    setTimeout(()=>{
        $otherUserPage_main_header.innerHTML = `
        <div class="profile_img_container">
            <img src="${pre_img_src}" alt="사용자 프로필 사진" class="profile_img">
        </div>
        <div class="user_name">${userInfo.name}님</div>
        `;
        $section_header.innerHTML = `<div class="section_header_title">${userInfo.name}님이 작성한 리뷰</div>`;
    }, 2000);
}
showOtherUserInfo();

// 2. 아무개님이 작성한 리뷰를 가져와서 촤르륵 보여주기
const $review_container = document.querySelector('.review_container');
const io = new IntersectionObserver(ioCallback_otherUser, {threshold : 0.7});
window.addEventListener('load', () => {
    $review_container.innerHTML = ""; // 처음에 모두 삭제
    loadFirstItems(io, addNewOtherReviewContent);
})


// 하트 toggle
const $main = document.querySelector('main');
$main.addEventListener('click', like_toggle);