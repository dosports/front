// import {reviewIdx_noPostman, reviewInfoArr_noPostman} from "./myPage_data.js";
import {createFullReviewItem, getLikeReviewIdx, getMyReviewIdx, getReviewDetail, getOtherUserIdx, getUserIdx, getOtherUserReviewIdx} from "./myPage_modules.js";
import {check_clickedLike, getElementIndex} from "./myPage_likeBtn_modules.js";

const $review_container = document.querySelector('.review_container');
let pageNum = 1;
const skeletonItems = Array.from({length : 10}, () => makeFullReviewSkeleton());
export let reviewIdxs = [];

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

// 내가 좋아요한 리뷰 데이터 가져와서 보여주기
export async function addNewLikeContent(){
    const reviewData = await getLikeReviewIdx(pageNum)
                            .catch(err => console.log(err));// FIXME:
    const reviewIdx = reviewData.reviewIdx;
    const endPage = reviewData.endPage;
    // const reviewIdx = reviewIdx_noPostman;
    // const endPage = 4;
    if(pageNum == endPage){
        return null;
    }else{
        // const reviewIdx = reviewIdx_noPostman;
        reviewIdxs = reviewIdxs.concat(reviewIdx);

        for(let i = 0; i < reviewIdx.length; i++){
            const reviewInfo = await getReviewDetail(reviewIdx[i]);
            // const reviewInfo = reviewInfoArr_noPostman[reviewIdx[i]];

            const like_clicked = true; // 내가 좋아요한 리뷰라서 무조건 true
            const new_like_review_preview_item = createFullReviewItem(reviewInfo, like_clicked, true); // 생성, 무조건 로그인 했음
            $review_container.appendChild(new_like_review_preview_item);
        }
        return true;
    }
    
}

// 내가 쓴 리뷰 데이터 가져와서 보여주기 
export async function addNewMyContent(){
    const reviewIdx = await getMyReviewIdx(pageNum)
                            .catch(err => null);
    // const reviewIdx = reviewIdx_noPostman;
    if(reviewIdx == null){
        return null;
    }else{
        reviewIdxs = reviewIdxs.concat(reviewIdx);

        for(let i = 0; i < reviewIdx.length; i++){
            const reviewInfo = await getReviewDetail(reviewIdx[i]);
            // const reviewInfo = reviewInfoArr_noPostman[reviewIdx[i]];
            
            const like_clicked =  await check_clickedLike(reviewIdx[i]);
            // const like_clicked = false;
            const new_like_review_preview_item = createFullReviewItem(reviewInfo, like_clicked, true); // 생성, 무조건 로그인 했음
            $review_container.appendChild(new_like_review_preview_item);
        }
        return true;
    }
    
}

// 다른 사람이 쓴 리뷰 데이터 가져와서 보여주기

export async function addNewOtherReviewContent(){
    const otherUserIdx = getOtherUserIdx();
    const reviewIdx = await getOtherUserReviewIdx(otherUserIdx, pageNum)
                                .catch(err => console.log(err));// FIXME: 다른 사람 유저 userIdx를 가져와서, 그사람이 쓴 reviewIdx를 가져오기
    // const reviewIdx = reviewIdx_noPostman;
    if(reviewIdx == []){
        return null;
    }else{
        reviewIdxs.concat(reviewIdx);

        for(let i = 0; i < reviewIdx.length; i++){
            const reviewInfo = await getReviewDetail(reviewIdx[i]);// FIXME:
            // const reviewInfo = reviewInfoArr_noPostman[reviewIdx[i]];
    
            const like_clicked =  await check_clickedLike(reviewIdx[i]);
            // const like_clicked = true;
            const login = localStorage.getItem('token') == null ? false : true;
            const new_like_review_preview_item = createFullReviewItem(reviewInfo, like_clicked, login); // 생성
            $review_container.appendChild(new_like_review_preview_item);
        }
    return true;
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
            addSkeleton();
            setTimeout(async() => {
                const moreReviewExist = await addNewLikeContent();
                if(moreReviewExist != null){
                    pageNum+=1;
                    observeLastItem(io, document.querySelectorAll('.review_item'));
                }
                removeSkeleton();
            }, 2000);
        }
    })
}

export function ioCallback_my(entries, io){
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            io.unobserve(entry.target);
            addSkeleton();
            setTimeout(async() => {
                const moreReviewExist = await addNewMyContent();
                if(moreReviewExist != null){
                    pageNum+=1;
                    observeLastItem(io, document.querySelectorAll('.review_item'));
                }
                removeSkeleton();
            }, 2000);
        }
    })
}

export function ioCallback_otherUser(entries, io){
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            io.unobserve(entry.target);
            addSkeleton();
            setTimeout(async() => {
                const moreReviewExist = await addNewOtherReviewContent();
                if(moreReviewExist != null){
                    pageNum+=1;
                    observeLastItem(io, document.querySelectorAll('.review_item'));
                }
                removeSkeleton();
            }, 2000);
        }
    })
}

export function loadFirstItems(io, addNewContent){
    addSkeleton();
    setTimeout(async() => {
        const moreReviewExist = await addNewContent();
        if(moreReviewExist != null){
            pageNum+=1;
            observeLastItem(io, document.querySelectorAll('.review_item'));
        }
        removeSkeleton();
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



export function reviewClickedEventHandler(event){
    const eventTarget = event.target;
    if(eventTarget.classList.contains('review_title') || eventTarget.classList.contains('review_img')){
        const reviewItem = eventTarget.parentNode.parentNode.parentNode;
        const select_review_Idx = getElementIndex(reviewItem)// reviewItem
        const reviewIdx = reviewIdxs[select_review_Idx];
        console.log(reviewIdx);
        location.href = `/src/main/resources/static/?${reviewIdx}`;// TODO: 리뷰 페이지로 이동
    }
}