// import {getReviewDetail, getMyReviewIdx, pageUpEventHandler, beforePageBtnHandler, sports_img, sports_level}  from "./myPage_modules.js";

// pageUpEventHandler(); // 페이지 맨 위로
// beforePageBtnHandler(); // 이전 페이지로

// // 내가 쓴 리뷰 데이터 가져와서 보여주기
// // [GET] {{url}}/review/user/{userIdx}
// async function showMyReview(){
//     const reviewIdx = await getMyReviewIdx();

//     const $review_container = document.querySelector('.review_container');
//     $review_container.innerHTML = ""; // 처음에 모두 삭제

//     for(let i = 0; i < reviewIdx.length; i++){
//         const reviewInfo = await getReviewDetail(reviewIdx[i]);

//         // 이미지 처리
//         let pre_my_img =  reviewInfo.img_path;
//         if(pre_my_img == ''){
//             pre_my_img = sports_img[reviewInfo.sport]; // 각 종목 이미지로
//         }

//         const new_review_item = document.createElement('div');
//         new_review_item.classList.add('review_item');
//         // TODO: 작성 시간 변경
//         new_review_item.innerHTML = `
//             <div class="review_leftContainer">
//                 <div class="review_img_container">
//                     <img src=${pre_my_img} alt="내가 쓴 리뷰 사진" class="review_img">
//                 </div>
//                 <div class="heart_container">
//                     <span class="iconify heart-icon" data-icon="akar-icons:heart"></span>
//                     <span class="heart_cnt">${reviewInfo.likes}개</span>
//                 </div>
//             </div>
//             <div class="review_rightContainer">
//                 <div class="my_review_titleAndWriter">
//                     <div class="review_title">${reviewInfo.brand} ${reviewInfo.title}</div>
//                     <div class="review_writerAndTime">${reviewInfo.userName} / 12:00</div> 
//                 </div>
//                 <div class="my_review_star">${reviewInfo.rate}점</div>
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

// // 1. 내가 쓴 리뷰 목록 가져와서 review_item 박스 만들어서 보여주기

// // 2. 리뷰 작성하기 누르면 리뷰 작성하기 페이지로 이동

import {createMiniReviewItem, createFullReviewItem, pageUpEventHandler, beforePageBtnHandler} from "./myPage_modules.js";

createFullReviewItem(4);
pageUpEventHandler();
beforePageBtnHandler();