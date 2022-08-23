import {getUserInfo, getReviewDetail, getMyReviewIdx, getLikeReviewIdx, createMiniReviewItem, createFullReviewItem, sports_img} from "./myPage_modules.js";
import {reviewIdx_noPostman, reviewInfoArr_noPostman, userInfo_noPostman} from "./myPage_data.js"; // FIXME: postman 대신
import {makeMiniReviewSkeleton, makeFullReviewSkeleton, reviewClickedEventHandler} from "./myPage_load10Review.js";
import {like_toggle, getElementIndex, check_clickedLike} from "./myPage_likeBtn_modules.js";
import {header_onload, header_onscroll, alarm_reset} from "./header.js";

fetch("../../templates/main/main_header.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector(".default_header").innerHTML = text;
        header_onload();
        window.onscroll = header_onscroll;
        window.addEventListener("resize", alarm_reset);
});

const logo_white_imgName = 'logo_white';
let myReviewIdxs, likeReviewIdxs;
// 1. 사용자 사진, 이름
const $myPage_main_header = document.querySelector('.myPage_main_header');
async function showUserInfo(){
    $myPage_main_header.innerHTML = `
            <div class="profile_img_container skeleton">
                <img src="" alt="사용자 프로필 사진" class="profile_img hidden">
            </div>
            <div class="user_name"><span class="skeleton">아무개님</span></div>
            <a href="./myPage_setting.html">
                <span class="iconify setting_icon" data-icon="uiw:setting-o"></span>
            </a>
    `;
    setTimeout(() => {
        // const userInfo = await getUserInfo(userIdx);
        const userInfo = userInfo_noPostman;
        let pre_img_src = userInfo.profileImg;
        pre_img_src = userInfo.profileImg == "" ? `../../static/img/${logo_white_imgName}.png` : userInfo.profileImg;
        // pre_img_src = userInfo.profileImg == "" ? `../../static/img/${logo_white_imgName}.png` : userInfo.profileImg;//
        $myPage_main_header.innerHTML = `
        <div class="profile_img_container">
            <img src="${pre_img_src}" alt="사용자 프로필 사진" class="profile_img">
        </div>
        <div class="user_name">${userInfo.name}님</div>
        <a href="./myPage_setting.html">
            <span class="iconify setting_icon" data-icon="uiw:setting-o"></span>
        </a>
        `;
    }, 2000);
    
}
showUserInfo();

// 2. 좋아요한 리뷰 가져와서 보여주기 - 최대 4개
async function addLikeReview(){
    // const reviewData = await getLikeReviewIdx(1)
    //                         .catch(err => console.log(err));// FIXME:
    // const reviewIdx = reviewData['reviewIdx'];
    const reviewIdx = reviewIdx_noPostman;
    likeReviewIdxs = reviewIdx;
    const lastIdx = reviewIdx.length > 4 ? 4 : reviewIdx.length;

    // 데이터 가져와서 보여주기
    for(let i = 0; i < lastIdx; i++){
        // const reviewInfo = await getReviewDetail(reviewIdx[i]);// FIXME:
        const reviewInfo = reviewInfoArr_noPostman[reviewIdx[i]];
        const new_like_review_preview_item = createMiniReviewItem(reviewInfo);
        $like_review_preview_container.appendChild(new_like_review_preview_item);
    }
    // 칸 형식 유지 위해서 데이터 없어도 4개는 채워지게 만듦
    for(let i = lastIdx; i < 4; i++){
        const new_like_review_preview_item = document.createElement('div');
        const pre_like_img = sports_img["tennis"];
        new_like_review_preview_item.classList.add('like_review_preview_item');
        new_like_review_preview_item.classList.add('hide'); // 숨기기
        new_like_review_preview_item.innerHTML = `
                            <div class="like_review_img_container">
                                <img src=${pre_like_img} alt="좋아요한 리뷰 사진" class="like_review_img">
                            </div>
                            <div class="like_review_preview_title"></div>
        `;

        $like_review_preview_container.appendChild(new_like_review_preview_item);
    }
}

// 3. 내가 쓴 리뷰 데이터 가져와서 보여주기 - 최대 4개
async function addMyReview(){
    // const reviewIdx = await getMyReviewIdx(1); // FIXME:
    const reviewIdx = reviewIdx_noPostman;
    myReviewIdxs = reviewIdx;
    const lastIdx = reviewIdx.length > 4 ? 4 : reviewIdx.length;

    for(let i = 0; i < lastIdx; i++){
        // const reviewInfo = await getReviewDetail(reviewIdx[i]); // FIXME:

        // const like_clicked =  await check_clickedLike(reviewIdx[i]);
        const like_clicked = true;

        const reviewInfo = reviewInfoArr_noPostman[reviewIdx[i]];
        const new_review_item = createFullReviewItem(reviewInfo, like_clicked, true);
        $review_container.appendChild(new_review_item);
    }
}


// 처음 로드했을 때 실행
const $like_review_preview_container = document.querySelector('.like_review_preview_container');
const $review_container = document.querySelector('.review_container');
const miniSkeletonItems = Array.from({length : 4}, () => makeMiniReviewSkeleton());
const skeletonMyPageMainItems = Array.from({length : 4}, () => makeFullReviewSkeleton());

function loadFirstItems_myPage_main(){
    $like_review_preview_container.innerHTML = "";// 처음에 모두 삭제
    miniSkeletonItems.forEach((item) => $like_review_preview_container.appendChild(item));
    setTimeout(() => {
        addLikeReview();
        miniSkeletonItems.forEach((item) => $like_review_preview_container.removeChild(item));
    }, 2000);

    $review_container.innerHTML = ""; // 처음에 모두 삭제
    skeletonMyPageMainItems.forEach((item) => $review_container.appendChild(item));
    setTimeout(() => {
        addMyReview();
        skeletonMyPageMainItems.forEach((item) => $review_container.removeChild(item));
    }, 2000);
}
loadFirstItems_myPage_main();

// 하트 토글
const $main = document.querySelector('main');
$main.addEventListener('click', like_toggle);

//화면 사이즈 작아지면 좋아요한 리뷰 제목 2줄로 나타나게
function resize_likeReview(){
    const reviewItem = document.querySelectorAll('.like_review_preview_title');

    for(let i = 0; i<reviewItem.length; i++){
        const reviewInfo_str = reviewItem[i].innerText;
        if(reviewInfo_str.indexOf('\n') == -1 && window.innerWidth<=800){
            const reviewInfo = reviewInfo_str.split(" ");
            const brand = reviewInfo[0];
            const title = reviewInfo[1];
            reviewItem[i].innerText = brand + '\n' + title;
        }else if(reviewInfo_str.indexOf('\n') != -1 && window.innerWidth>800){
            const reviewInfo = reviewInfo_str.split("\n");
            const brand = reviewInfo[0];
            const title = reviewInfo[1];
            reviewItem[i].innerText = brand + ' ' + title;
        }
        
    }
}
window.addEventListener('resize', resize_likeReview);

// 리뷰 제목, 사진 클릭시 리뷰 상세보기 페이지로 이동
function likeReviewClickedEventHandler(event){
    const eventTarget = event.target;
    if(eventTarget.classList.contains('like_review_img') || eventTarget.classList.contains('like_review_preview_title')){
        let reviewItem;
        if(eventTarget.classList.contains('like_review_img')){
            reviewItem = eventTarget.parentNode.parentNode;
        }else{
            reviewItem = eventTarget.parentNode;
        }
        const select_review_Idx = getElementIndex(reviewItem)// reviewItem
        const reviewIdx = likeReviewIdxs[select_review_Idx];
        // location.href = ``;
    }
}

// 리뷰 이미지, 제목 클릭시 리뷰 상세보기 페이지로 이동
function myReviewClickedEventHandler(event){
    const eventTarget = event.target;
    if(eventTarget.classList.contains('review_title') || eventTarget.classList.contains('review_img')){
        const reviewItem = eventTarget.parentNode.parentNode.parentNode;
        const select_review_Idx = getElementIndex(reviewItem)// reviewItem
        const reviewIdx = myReviewIdxs[select_review_Idx];
        // location.href = ``;
    }
}

document.querySelector('.my_review_container').addEventListener('click', (event) => {
    myReviewClickedEventHandler(event);
});

document.querySelector('.like_review_preview_container').addEventListener('click', (event) => {
    likeReviewClickedEventHandler(event);
})

const $default_header = document.querySelector('.default_header');
