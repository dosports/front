export {getUserInfo, getReviewDetail, getMyReviewIdx, getLikeReviewIdx, createMiniReviewItem, createFullReviewItem, pageUpEventHandler, beforePageBtnHandler, sports_img, sports_level};

const url = 'https://a29eef45-92f7-443d-bde4-be612c4502bf.mock.pstmn.io';
const userIdx = 1;

// 마이페이지 - 메인
// 사용자 사진, 이름 정보 가져오기
function getUserInfo(userIdx){
    return axios.get(`${url}/user/info/${userIdx}`)
    .then(response => response.data.data)
}


// 자세한 리뷰 정보 가져오기
function getReviewDetail(reviewIdx){
    return axios.get(`${url}/review/${reviewIdx}`)
    .then(response => response.data);
}

// 내가 쓴 리뷰 reviewIdx 배열 가져오기 FIXME: ?page_num부분....
function getMyReviewIdx(userIdx){
    return axios.get(`${url}/review/user/${userIdx}?page_num=${pageNum}`)
    .then(response => response.data.reviewIdx);
}

// 내가 좋아요한 리뷰 reviewIdx 배열 가져오기
function getLikeReviewIdx(pageNum){
    return axios.get(`${url}/like/${userIdx}?page_num=${pageNum}`)
    .then(response => response.data.reviewIdx);
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


const sports_img = {
    "tennis" : "../../static/img/tennis_icon.png",
    "hike" : "../../static/img/hiking_icon.png",
    "swim": "../../static/img/swim_icon.png",
    "gym": "../../static/img/swim_icon.png", // TODO: src 변경 필요
    "golf": "../../static/img/golf_icon.png",
    "balls": "../../static/img/balls_icon.png",
};
const sports_level = {
    1 : "저",
    2 : "중",
    3 : "고"
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

    return new_like_review_preview_item;
}

function createFullReviewItem(reviewInfo){
    let pre_my_img =  reviewInfo.img_path;
    if(pre_my_img == ''){
        pre_my_img = sports_img[reviewInfo.sport]; // 각 종목 이미지로
    }

    const new_review_item = document.createElement('div');
    new_review_item.classList.add('review_item');
    // TODO: 작성 시간 변경, img full_heart 내가 임의로 파일명 넣어서 가져온거라서 변경 필요함
    new_review_item.innerHTML = `
        <div class="review_leftContainer">
            <div class="review_img_container">
                <img src=${pre_my_img} alt="내가 쓴 리뷰 사진" class="review_img">
            </div>
            <div class="heart_container">
                <img class="full_heart ${reviewInfo.likes > 0 ? '' : 'hidden'}" src="../../static/img/full_heart.png" alt="채워진 하트">
                <span class="iconify heart-icon ${reviewInfo.likes > 0 ? 'hidden' : ''}" data-icon="akar-icons:heart"></span>
                <span class="heart_cnt">${reviewInfo.likes}개</span>
            </div>
        </div>
        <div class="review_rightContainer">
            <div class="my_review_titleAndWriter">
                <div class="review_title">${reviewInfo.brand} ${reviewInfo.title}</div>
                <div class="review_writerAndTime">${reviewInfo.userName} / 12:00</div>
            </div>
            <div class="my_review_star">${'★'.repeat(reviewInfo.rate) + '☆'.repeat(5-reviewInfo.rate)}</div>
            <div class="my_review_likeAndComment">댓글 ${reviewInfo.comments}개</div>
            <div class="my_review_writerDetail">${reviewInfo.gender == "female" ? "여" : "남"} / ${reviewInfo.height}cm ${reviewInfo.weight}kg / ${sports_level[reviewInfo.level]}</div>
            <div class="my_review_buyInfo">${reviewInfo.source == null ? "모름" : reviewInfo.source} / ${reviewInfo.price}</div>
            <div class="my_review_content">${reviewInfo.content}</div>
        </div>
    `;
    return new_review_item;
}


// TODO:
// 1. 좋아요 클릭, 취소

export function like_toggle(event){
    const likeBtn = event.target;
    const likeBtn_className = ['full_heart', 'heart-icon'];
    const likeBtn_check = likeBtn_className.some(className => likeBtn.classList.contains(className));
    if(likeBtn_check){
        const $full_heart = likeBtn.parentNode.querySelector('.full_heart');
        const $empty_heart = likeBtn.parentNode.querySelector('.heart-icon');

        if(likeBtn.classList.contains('full_heart')){// 꽉찬 하트 -> 빈 하트
            if(!$full_heart.classList.contains('hidden')){
                $full_heart.classList.add('hidden');
            }
            if($empty_heart.classList.contains('hidden')){
                $empty_heart.classList.remove('hidden');
            }
        }else{// 빈 하트 -> 꽉찬 하트
            if($full_heart.classList.contains('hidden')){
                $full_heart.classList.remove('hidden');
            }
            if(!$empty_heart.classList.contains('hidden')){
                $empty_heart.classList.add('hidden');
            }
        }
    }
}

