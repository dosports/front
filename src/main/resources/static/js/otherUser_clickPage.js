import {getUserInfo, getReviewDetail, createFullReviewItem, beforePageBtnHandler, getOtherUserInfo, getOtherUserIdx} from "./myPage_modules.js";
import {reviewIdx_noPostman, reviewInfoArr_noPostman, userInfo_noPostman} from "./myPage_data.js"; // FIXME: postman 대신
import {ioCallback_otherUser, addNewOtherReviewContent, loadFirstItems, reviewClickedEventHandler} from "./myPage_load10Review.js";
import {like_toggle} from "./myPage_likeBtn_modules.js";
import {header_onload, header_onscroll, alarm_reset} from "./header.js";
const logo_white_imgName = 'logo_white';

fetch("../../templates/main/main_header.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector(".default_header").innerHTML = text;
        header_onload();
        window.onscroll = header_onscroll;
        window.addEventListener("resize", alarm_reset);
});
// 이전 페이지로
beforePageBtnHandler();

// 프로필 이미지, 이름
const $otherUserPage_main_header = document.querySelector('.otherUserPage_main_header');
const $section_header = document.querySelector('.section_header');
async function showOtherUserInfo(){
    // const userInfo = await getOtherUserInfo();
    getOtherUserIdx();// FIXME: 나중에 지우기
    const userInfo = userInfo_noPostman;
    let pre_img_src = userInfo.profileImg;
        pre_img_src = userInfo.profileImg == "" ? `../../static/img/${logo_white_imgName}.png` : userInfo.profileImg;
        // pre_img_src = userInfo.profileImg == "" ? `../../static/img/${logo_white_imgName}.png` : userInfo.profileImg;// FIXME: 정확하지 않음
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

// 다른 사람이 작성한 리뷰를 가져와서 보여주기
const $review_container = document.querySelector('.review_container');
const io = new IntersectionObserver(ioCallback_otherUser, {threshold : 0.7});
window.addEventListener('load', () => {
    $review_container.innerHTML = ""; // 처음에 모두 삭제
    loadFirstItems(io, addNewOtherReviewContent);
})

// 하트 toggle
const $main = document.querySelector('main');
$main.addEventListener('click', like_toggle);

// 리뷰 제목, 사진 클릭시 리뷰 상세보기 페이지로 이동
$main.addEventListener('click', (event) => {
    reviewClickedEventHandler(event);
});