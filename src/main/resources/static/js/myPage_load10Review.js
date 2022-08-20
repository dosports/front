import {reviewIdx_noPostman, reviewInfoArr_noPostman} from "./myPage_data.js";
import {createFullReviewItem, getLikeReviewIdx, getMyReviewIdx, getReviewDetail} from "./myPage_modules.js";
const $review_container = document.querySelector('.review_container');
let pageNum = 1; // 이게 각 js마다 pageNum이라는 변수가 생기는거나 다름 없나?
const skeletonItems = Array.from({length : 10}, () => makeFullReviewSkeleton());

export function makeFullReviewSkeleton(){
    const newSkeletonItem = document.createElement('div');
    newSkeletonItem.classList.add('review_item');
    newSkeletonItem.innerHTML = `
                    <div class="review_leftContainer">
                        <div class="review_img_container skeleton">
                            <img src="../../static/img/balls_icon.png" alt="내가 쓴 리뷰 사진" class="review_img hidden">
                        </div>
                        <div class="heart_container">
                            <span class="iconify heart-icon skeleton" data-icon="akar-icons:heart"></span>
                            <span class="heart_cnt skeleton">0개</span>
                        </div>
                    </div>
                    <div class="review_rightContainer">
                        <div class="my_review_titleAndWriter">
                            <div class="review_title skeleton">브랜드명 상품명</div>
                            <div class="review_writerAndTime skeleton">작성자 / 작성 시간</div>
                        </div>
                        <div class="my_review_star"><span class="skeleton">★★★★★</span></div>
                        <div class="my_review_likeAndComment"><span class="skeleton">댓글 1개</span></div>
                        <div class="my_review_writerDetail"><span class="skeleton">성별 / 체형 / 운동수준</span></div>
                        <div class="my_review_buyInfo"><span class="skeleton">구매출처 / 구매가격</span></div>
                        <div class="my_review_content skeleton skeleton_review_content">
                        </div>
                    </div>
    `;
    return newSkeletonItem;
}

function addSkeleton(){
    skeletonItems.forEach((item) => $review_container.appendChild(item));
}

function removeSkeleton(){
    skeletonItems.forEach((item) => $review_container.removeChild(item));
}

function loadingStart(){
    addSkeleton();
}

function loadingFinish(){
    removeSkeleton();
}

// 내가 좋아요한 리뷰 데이터 가져와서 보여주기
// [GET] {{url}}/review/user/{userIdx}
export async function addNewLikeContent(){
    // const reviewIdx = await getLikeReviewIdx(pageNum);// FIXME:
    const reviewIdx = reviewIdx_noPostman;

    for(let i = 0; i < reviewIdx.length; i++){
        // const reviewInfo = await getReviewDetail(reviewIdx[i]);// FIXME:
        const reviewInfo = reviewInfoArr_noPostman[reviewIdx[i]];

        const new_like_review_preview_item = createFullReviewItem(reviewInfo); // 생성
        $review_container.appendChild(new_like_review_preview_item);
    }
}
// 
export async function addNewMyContent(){
    // const reviewIdx = await getMyReviewIdx(pageNum);// FIXME:
    const reviewIdx = reviewIdx_noPostman;

    for(let i = 0; i < reviewIdx.length; i++){
        // const reviewInfo = await getReviewDetail(reviewIdx[i]);// FIXME:
        const reviewInfo = reviewInfoArr_noPostman[reviewIdx[i]];

        const new_like_review_preview_item = createFullReviewItem(reviewInfo); // 생성
        $review_container.appendChild(new_like_review_preview_item);
    }
}
// TODO: 작성
export async function addNewOtherReviewContent(){
    // const reviewIdx = await getMyReviewIdx(pageNum);// FIXME: 다른 사람 유저 userIdx를 가져와서, 그사람이 쓴 reviewIdx를 가져오기
    const reviewIdx = reviewIdx_noPostman;

    for(let i = 0; i < reviewIdx.length; i++){
        // const reviewInfo = await getReviewDetail(reviewIdx[i]);// FIXME:
        const reviewInfo = reviewInfoArr_noPostman[reviewIdx[i]];

        const new_like_review_preview_item = createFullReviewItem(reviewInfo); // 생성
        $review_container.appendChild(new_like_review_preview_item);
    }
}

export function observeLastItem(io, items){
    const lastItem = items[items.length -1];
    io.observe(lastItem);
}

export function ioCallback_like(entries, io){
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            io.unobserve(entry.target);
            loadingStart();
            setTimeout(() => {
                addNewLikeContent();
                pageNum+=1;
                console.log(pageNum);
                loadingFinish();
                observeLastItem(io, document.querySelectorAll('.review_item'));
            }, 2000);
        }
    })
}

export function ioCallback_my(entries, io){
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            io.unobserve(entry.target);
            loadingStart();
            setTimeout(() => {
                addNewMyContent();
                pageNum+=1;
                console.log(pageNum);
                loadingFinish();
                observeLastItem(io, document.querySelectorAll('.review_item'));
            }, 2000);
        }
    })
}

// TODO:
export function ioCallback_otherUser(entries, io){
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            io.unobserve(entry.target);
            loadingStart();
            setTimeout(() => {
                addNewOtherReviewContent();
                pageNum+=1;
                console.log(pageNum);
                loadingFinish();
                observeLastItem(io, document.querySelectorAll('.review_item'));
            }, 2000);
        }
    })
}

export function loadFirstItems(io, addNewContent){
    loadingStart();
    setTimeout(() => {
        addNewContent();
        pageNum+=1;
        loadingFinish();
        observeLastItem(io, document.querySelectorAll('.review_item'));
    }, 2000);
}

// myPage - main

export function makeMiniReviewSkeleton(){
    const newSkeletonItem = document.createElement('div');
    newSkeletonItem.classList.add('like_review_preview_item');
    newSkeletonItem.innerHTML = `
    <div class="like_review_img_container skeleton">
        <img src="../../static/img/golf_icon.png" alt="좋아요한 리뷰 사진" class="like_review_img hidden">
    </div>
    <div class="like_review_preview_title skeleton"><span class="skeleton">나이키 테니스치마</span></div>
    `;
    return newSkeletonItem;
}
