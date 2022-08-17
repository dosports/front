// // 이전 페이지로
// const $before_btn = document.querySelector('.before_btn');
// const $myPage_setting_header_title = document.querySelector('#myPage_setting_header_title');

// $before_btn.addEventListener("click", () => {
//     history.back();
// })
// $myPage_setting_header_title.addEventListener("click", () => {
//     history.back();
// })

// // 1. 프로필 이미지, 이름
// async function showUserInfo(){
//     const userInfo = await getUserInfo(userIdx);
//     const $user_name = document.querySelector('.user_name');
//     const $section_header_title = document.querySelector('.section_header_title');
//     $user_name.innerText = `${userInfo.name}님`;
//     $section_header_title.innerText = `${userInfo.name}님이 작성한 리뷰`;
//     const $profile_img = document.querySelector('.profile_img');
//     let pre_img = userInfo.profileImg;
//     if(pre_img == ""){
//         pre_img = '../../static/img/logo_white.png';
//     }
//     $profile_img.src = pre_img;
//     console.log('프로필 완성');
// }
// showUserInfo();

// // 3. 설정 버튼 누르면 TODO: 어디로 이동? 아마 내 설정 이겠지?

// // 4. 아무개님이 작성한 리뷰를 가져와서 촤르륵 보여주기
// const $review_container = document.querySelector('.review_container');

// let pre__img = 'https://i.pinimg.com/originals/fc/3c/b2/fc3cb21c6e1db9758f7b4afd14ebf37d.jpg';
// if(pre_my_img == ''){
//     pre_my_img = '../../static/img/balls_icon.png'; // 각 종목 이미지로 할 건지, 랜덤으로 할건지
// }

// const new_review_item = document.createElement('div');
// new_review_item.classList.add('review_item');
// new_review_item.innerHTML = `
//     <div class="review_leftContainer">
//         <img src=${pre_my_img} alt="${user_name}님이 쓴 리뷰 사진" class="review_img">
//         <div class="heart_container">
//             <span class="iconify heart-icon" data-icon="akar-icons:heart"></span>
//             <span class="heart_cnt">0개</span>
//         </div>
//     </div>
//     <div class="review_rightContainer">
//         <div class="my_review_titleAndWriter">
//             <div class="review_title">브랜드명 상품명</div>
//             <div class="review_writerAndTime">작성자 / 작성 시간</div>
//         </div>
//         <div class="my_review_star">별점</div>
//         <div class="my_review_likeAndComment">댓글 수 </div>
//         <div class="my_review_writerDetail">성별 / 체형 / 운동수준</div>
//         <div class="my_review_buyInfo">구매출처 / 구매가격</div>
//         <div class="my_review_content_container">
//             <div class="my_review_content_title">리뷰 내용</div>
//             <div class="my_review_content">
//                 안녕하세요. 리뷰 내용 테스트 입니다. 안녕하세요. 리뷰 내용 테스트 입니다. 안녕하세요. 리뷰 내용 테스트 입니다. 안녕하세요. 리뷰 내용 테스트 입니다. 안녕하세요. 리뷰 내용 테스트 입니다.안녕하세요. 리뷰 내용 테스트 입니다.안녕하세요. 리뷰 내용 테스트 입니다.안녕하세요. 리뷰 내용 테스트 입니다.안녕하세요. 리뷰 내용 테스트 입니다.안녕하세요. 리뷰 내용 테스트 입니다.안녕하세요. 리뷰 내용 테스트 입니다.안녕하세요. 리뷰 내용 테스트 입니다.안녕하세요. 리뷰 내용 테스트 입니다.
//             </div>
//         </div>
//     </div>
// `;
// $review_container.appendChild(new_review_item);

// // 4. 상세보기 누르면 어디로 이동....?

import {createMiniReviewItem, createFullReviewItem} from "./myPage_modules.js";

createFullReviewItem(4);