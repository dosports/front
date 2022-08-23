export {getUserInfo, getReviewDetail, getMyReviewIdx, getLikeReviewIdx, createMiniReviewItem, createFullReviewItem, pageUpEventHandler, beforePageBtnHandler, sports_img, sports_level};
import {check_clickedLike} from "./myPage_likeBtn_modules.js";
const full_heart_imgName = 'full_heart';
axios.defaults.baseURL = 'https://008b09e7-31c8-41cb-adab-3683ec84e87e.mock.pstmn.io';// TODO:
const userIdx = getUserIdx(); // TODO: 로컬에서 getItem으로 토큰 가져오기

function setToken(){
    axios.defaults.headers.common['Authorization'] = `Bearer localStorage.getItem('accessToken')`;

    let expiredTime = localStorage.getItem('expiredTime');
    let diffTime = '' ;
    if(diffTime < 10000){
        axios.defaults.headers.common['x-refresh-token'] = localStorage.getItem('refreshToken');
        axios.get('${url}/user/updateAccessToken')
        .then(response => {
            localStorage.setItem('accessToken', res.data.data.accessToken);
            localStorage.setItem('expiredTime', res.data.data.cur_time);
            axios.defaults.headers.common['x-access-token'] = localStorage.getItem('accessToken');
        })
    }
}
// 마이페이지 - 메인
// 사용자 사진, 이름 정보 가져오기
//TODO:
export function getUserIdx(){
    const userIdx = localStorage.getItem('token');
    return userIdx;
}
function getUserInfo(){
    return axios.get(`/user/info/${userIdx}`)
    .then(response => response.data.data)
}

// TODO: location.href...?
export function getOtherUserIdx(){
    const OtherUserIdx = JSON.parse(localStorage.getItem('otherUser')).userIdx;
    return OtherUserIdx;
}

export function getOtherUserInfo(){
    const otherUserInfo = JSON.parse(localStorage.getItem('otherUser'));
    return otherUserInfo;
}

// 자세한 리뷰 정보 가져오기
function getReviewDetail(reviewIdx){
    return axios.get(`/review/${reviewIdx}`)
    .then(response => response.data);
}

// 내가 쓴 리뷰 reviewIdx 배열 가져오기
function getMyReviewIdx(pageNum){
    return axios.get(`/review/user/${userIdx}?page_num=${pageNum}`)
    .then(response => response.data.reviewIdx);
}

// 내가 좋아요한 리뷰 reviewIdx 배열 가져오기
function getLikeReviewIdx(pageNum){
    return axios.get(`/like?page_num=${pageNum}`)
    .then(response => response.data.reviewIdx);
}

// 다른 사람 리뷰 reviewIdx 가져오기
export function getOtherUserReviewIdx(userIdx, pageNum){
    return axios.get(`/review/user/${userIdx}?page_num=${pageNum}`)
    .then(response => response.data.reviewIdx);
}

function createMiniReviewItem(reviewInfo){
    let pre_like_img = reviewInfo.img_path;
    if(pre_like_img == ''){
        pre_like_img = sports_img[reviewInfo.sport]; // 각 종목 이미지로
    }
    const new_like_review_preview_item = document.createElement('div');
    new_like_review_preview_item.classList.add('like_review_preview_item');
    new_like_review_preview_item.innerHTML = `
                            <div class="like_review_img_container">
                                <img src=${pre_like_img} alt="좋아요한 리뷰 사진" class="like_review_img">
                            </div>
                            <div class="like_review_preview_title">${reviewInfo.brand} ${reviewInfo.title}</div>
                        `;
    if(window.innerWidth <= 800){
        new_like_review_preview_item.querySelector('.like_review_preview_title').innerText = reviewInfo.brand + '\n' + reviewInfo.title;
    }
    return new_like_review_preview_item;
}

function createFullReviewItem(reviewInfo, like_clicked, login){
    let pre_my_img =  reviewInfo.img_path;
    if(pre_my_img == ''){
        pre_my_img = sports_img[reviewInfo.sport]; // 각 종목 이미지로
    }

    const new_review_item = document.createElement('div');
    new_review_item.classList.add('review_item');
    
    const time = reviewInfo.regDate.split(' ')[1].split(':');

    new_review_item.innerHTML = `
            <div class="review_leftContainer">
                <div class="review_img_container">
                    <img src=${pre_my_img} alt="내가 쓴 리뷰 사진" class="review_img">
                </div>
                <div class="heart_container">
                    <img class="full_heart ${like_clicked ? '' : 'hidden'} ${login ? '' : 'heart_limit'}" src="../../static/img/${full_heart_imgName}.png" alt="채워진 하트">
                    <span class="iconify heart-icon ${like_clicked ? 'hidden' : ''}" data-icon="akar-icons:heart"></span>
                    <span class="heart_cnt">${reviewInfo.likes}개</span>
                </div>
            </div>
            <div class="review_rightContainer">
                <div class="my_review_titleAndWriter">
                    <div class="review_title">${reviewInfo.brand} ${reviewInfo.title}</div>
                    <div class="review_writerAndTime">${reviewInfo.userName} / ${time[0]}:${time[1]}</div>
                </div>
                <div class="my_review_star">${'★'.repeat(reviewInfo.rate) + '☆'.repeat(5-reviewInfo.rate)}</div>
                <div class="my_review_likeAndComment">댓글 ${reviewInfo.comments}개</div>
                <div class="my_review_writerDetail">${reviewInfo.gender == "f" ? "여" : "남"} / ${reviewInfo.height}cm ${reviewInfo.weight}kg / ${sports_level[reviewInfo.level]}</div>
                <div class="my_review_buyInfo ${login ? '' : 'hidden'}">${reviewInfo.source == null ? "모름" : reviewInfo.source} / ${reviewInfo.price}</div>
                <div class="review-view_limit ${login ? 'hidden' : ''}">리뷰 작성하면 구매출처와 구매가격을 볼 수 있어요!</div>
                <div class="my_review_content">${reviewInfo.content}</div>
            </div>
    `;
    return new_review_item;
}


const sports_img = {
    "tennis" : "../../static/img/tennis_icon.png",
    "hike" : "../../static/img/hiking_icon.png",
    "swim": "../../static/img/swim_icon.png",
    "gym": "../../static/img/gym.png",
    "golf": "../../static/img/golf_icon.png",
    "balls": "../../static/img/balls_icon.png",
};
const sports_level = {
    1 : "저",
    2 : "중",
    3 : "고"
}

// 페이지 내리면 버튼 따라오도록
const $page_up_icon = document.querySelector(".page_up_icon");
function control_scroll(){
    let timer = null;
    // if(timer !== null){
    //     clearTimeout(timer);
    // }
    timer = setTimeout(() =>{
        const pageY = window.pageYOffset;
        $page_up_icon.style.top = `${pageY + window.innerHeight/2}px`;
    }, 200)
}

// 페이지 맨 위로
function pageUpEventHandler(){
    $page_up_icon.addEventListener("click", () => {
        window.scroll({
            top : 0,
            left : 0,
            behavior : 'smooth'
        });
    });
    

    window.addEventListener('scroll', control_scroll);
}

// 이전 페이지로
function beforePageBtnHandler(){
    const $before_btn_container = document.querySelector('.before_btn_container');

    $before_btn_container.addEventListener("click", () => {
        history.back();
    })
}
