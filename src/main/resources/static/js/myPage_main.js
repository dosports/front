import {getUserInfo, getReviewDetail, getMyReviewIdx, getLikeReviewIdx, createMiniReviewItem, createFullReviewItem, sports_img, sports_level, like_toggle} from "./myPage_modules.js";
import {reviewIdx_noPostman, reviewInfoArr_noPostman, userInfo_noPostman} from "./myPage_data.js"; // FIXME: postman 대신
import {makeMiniReviewSkeleton, makeFullReviewSkeleton} from "./myPage_load10Review.js";

// 1. 사용자 사진, 이름 - get, {{url}}/user/info/{useridx}
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
        // const pre_img_src = userInfo.profileImg == "" ? "../img/logo_white.png" : `${url}/user/profileImg/${userInfo.profileImg}`;// FIXME: 정확하지 않음
        const pre_img_src = userInfo.profileImg;
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
    
    console.log('프로필 완성');
}
showUserInfo();

// 2. 좋아요한 리뷰 가져와서 보여주기 - 최대 4개
async function addLikeReview(){
    // const reviewIdx = await getLikeReviewIdx();// FIXME:
    const reviewIdx = reviewIdx_noPostman;
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
    console.log('내가 좋아요한 리뷰 완성'); // FIXME:
}

// 3. 내가 쓴 리뷰 데이터 가져와서 보여주기 - 최대 4개
async function addMyReview(){
    // const reviewIdx = await getMyReviewIdx(); // FIXME:
    const reviewIdx = reviewIdx_noPostman;
    const lastIdx = reviewIdx.length > 4 ? 4 : reviewIdx.length;

    for(let i = 0; i < lastIdx; i++){
        // const reviewInfo = await getReviewDetail(reviewIdx[i]); // FIXME:
        const reviewInfo = reviewInfoArr_noPostman[reviewIdx[i]];
        const new_review_item = createFullReviewItem(reviewInfo);
        $review_container.appendChild(new_review_item);
    }
    console.log('내가 쓴 리뷰 완성'); // FIXME:
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


// TODO:
// 1. 모두 다 생성되면 페이지 열리게
// 2. 하트 아이콘 누르면 좋아요한 리뷰에 저장
// FIXME: 
// 1. 내가 쓴 리뷰를 내가 하트를 누르면 저장되게해? 아님 에러를 보여줘?


// *** 질문 ***
// 1. 설정 버튼, 상세보기 버튼 클릭시 페이지 이동 -> 서버에서? 아님 그냥 href에 html 파일 연결?
// 2. 해당 사진 누르면 해당 리뷰 자세히 보기로 이동하는지 - YES


// TODO: 아래는 postman 사용불가시 작성한 코드
// import {createMiniReviewItem_noPostman, createFullReviewItem_noPostman} from "./myPage_modules.js";
// createMiniReviewItem_noPostman(4);

// createFullReviewItem_noPostman(4);

const $main = document.querySelector('main');
$main.addEventListener('click', like_toggle);