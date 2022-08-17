// import {getUserInfo, getReviewDetail, getMyReviewIdx, getLikeReviewIdx, sports_img, sports_level} from "./myPage_modules.js";

// // 1. 사용자 사진, 이름 - get, {{url}}/user/info/{useridx}

// async function showUserInfo(){
//     const userInfo = await getUserInfo(userIdx);
//     const $user_name = document.querySelector('.user_name');
//     $user_name.innerText = `${userInfo.name}님`;
//     const $profile_img = document.querySelector('.profile_img');
//     let pre_img = userInfo.profileImg;
//     if(pre_img == ""){
//         pre_img = '../../static/img/logo_white.png';
//     }
//     $profile_img.src = pre_img;
//     console.log('프로필 완성');
// }
// showUserInfo();

// // 2. 좋아요한 리뷰 가져와서 보여주기 - 최대 4개
// // [GET] {{url}}/like/{userIdx}
// async function showLikeReview(){
//     const reviewIdx = await getLikeReviewIdx();
//     const lastIdx = reviewIdx.length > 4 ? 4 : reviewIdx.length;

//     const $like_review_preview_container = document.querySelector('.like_review_preview_container');
//     $like_review_preview_container.innerHTML = ""; // 처음에 모두 삭제

//     for(let i = 0; i < lastIdx; i++){
//         const reviewInfo = await getReviewDetail(reviewIdx[i]);

//         let pre_like_img = reviewInfo.img_path;
//         if(pre_like_img == ''){
//             pre_like_img = sports_img[reviewInfo.sport]; // 각 종목 이미지로
//         }

//         const new_like_review_preview_item = document.createElement('div');
//         new_like_review_preview_item.classList.add('like_review_preview_item');
//         new_like_review_preview_item.innerHTML = `
//                             <div class="like_review_img_container">
//                                 <img src=${pre_like_img} alt="좋아요한 리뷰 사진" class="like_review_img">
//                             </div>
//                             <div class="like_review_preview_title">${reviewInfo.brand} ${reviewInfo.title}</div>
//         `;

//         $like_review_preview_container.appendChild(new_like_review_preview_item);
//     }
//     for(let i = lastIdx; i < 4; i++){
//         const new_like_review_preview_item = document.createElement('div');
//         const pre_like_img = sports_img["tennis"];
//         new_like_review_preview_item.classList.add('like_review_preview_item');
//         new_like_review_preview_item.classList.add('hide'); // 숨기기
//         new_like_review_preview_item.innerHTML = `
//                             <div class="like_review_img_container">
//                                 <img src=${pre_like_img} alt="좋아요한 리뷰 사진" class="like_review_img">
//                             </div>
//                             <div class="like_review_preview_title"></div>
//         `;

//         $like_review_preview_container.appendChild(new_like_review_preview_item);
//     }
//     console.log('내가 좋아요한 리뷰 완성');
// }
// showLikeReview();

// // 3. 내가 쓴 리뷰 데이터 가져와서 보여주기 - 최대 4개
// // [GET] {{url}}/review/user/{userIdx}

// async function showMyReview(){
//     const reviewIdx = await getMyReviewIdx();
//     const lastIdx = reviewIdx.length > 4 ? 4 : reviewIdx.length;

//     const $review_container = document.querySelector('.review_container');
//     $review_container.innerHTML = ""; // 처음에 모두 삭제

//     for(let i = 0; i < lastIdx; i++){
//         const reviewInfo = await getReviewDetail(reviewIdx[i]);

//         // 이미지 처리
//         let pre_my_img =  reviewInfo.img_path;
//         if(pre_my_img == ''){
//             pre_my_img = sports_img[reviewInfo.sport]; // 각 종목 이미지로
//         }

//         const new_review_item = document.createElement('div');
//         new_review_item.classList.add('review_item');
//         // TODO: 작성 시간 변경, img full_heart 내가 임의로 파일명 넣어서 가져온거라서 변경 필요함
//         new_review_item.innerHTML = `
//             <div class="review_leftContainer">
//                 <div class="review_img_container">
//                     <img src=${pre_my_img} alt="내가 쓴 리뷰 사진" class="review_img">
//                 </div>
//                 <div class="heart_container">
//                     <img class="full_heart" src="../../static/img/full_heart.png" alt="채워진 하트"> 
//                     <span class="iconify heart-icon hidden" data-icon="akar-icons:heart"></span>
//                     <span class="heart_cnt">${reviewInfo.likes}개</span>
//                 </div>
//             </div>
//             <div class="review_rightContainer">
//                 <div class="my_review_titleAndWriter">
//                     <div class="review_title">${reviewInfo.brand} ${reviewInfo.title}</div>
//                     <div class="review_writerAndTime">${reviewInfo.userName} / 12:00</div> 
//                 </div>
//                 <div class="my_review_star">${'★'.repeat(reviewInfo.rate) + '☆'.repeat(5-reviewInfo.rate)}</div>
//                 <div class="my_review_likeAndComment">댓글 ${reviewInfo.comments}개</div>
//                 <div class="my_review_writerDetail">${reviewInfo.gender == "female" ? "여" : "남"} / ${reviewInfo.height}cm ${reviewInfo.weight}kg / ${sports_level[reviewInfo.level]}</div>
//                 <div class="my_review_buyInfo">${reviewInfo.source == null ? 모름 : reviewInfo.source} / ${reviewInfo.price}</div>
//                 <div class="my_review_content">${reviewInfo.content}</div>
//             </div>
//         `;
//         $review_container.appendChild(new_review_item);
//     }
//     console.log('내가 쓴 리뷰 완성');
// }
// showMyReview();

// window.addEventListener("load", console.log('hi'));

// // 4. 모두 다 생성되면 페이지 열리게
// // 7. 하트 아이콘 누르면 좋아요한 리뷰에 저장
// // TODO: 내가 쓴 리뷰를 내가 하트를 누르면 저장되게해? 아님 에러를 보여줘?


// // *** 질문 ***
// // 1. 설정 버튼, 상세보기 버튼 클릭시 페이지 이동 -> 서버에서? 아님 그냥 href에 html 파일 연결?
// // 2. 해당 사진 누르면 해당 리뷰 자세히 보기로 이동하는지?

import {createMiniReviewItem, createFullReviewItem} from "./myPage_modules.js";
createMiniReviewItem(4);

createFullReviewItem(4);