// --------------------------------------postman 사용 X시--------------------------
export function createMiniReviewItem_noPostman(num){
    const $like_review_preview_container = document.querySelector('.like_review_preview_container');
    $like_review_preview_container.innerHTML = ""; // 처음에 모두 삭제

    
    let pre_like_img = sports_img["tennis"]; // 각 종목 이미지로
    for(let i = 0; i < num; i++){
        const new_like_review_preview_item = document.createElement('div');
        new_like_review_preview_item.classList.add('like_review_preview_item');
        new_like_review_preview_item.innerHTML = `
                            <div class="like_review_img_container">
                                <img src=${pre_like_img} alt="좋아요한 리뷰 사진" class="like_review_img">
                            </div>
                            <div class="like_review_preview_title">나이키 바지</div>
        `;
    
        $like_review_preview_container.appendChild(new_like_review_preview_item);
    }
}

export function createFullReviewItem_noPostman(num){
    const $review_container = document.querySelector('.review_container');
    $review_container.innerHTML = ""; // 처음에 모두 삭제

    for(let i=0; i<num ;i++){
// 이미지 처리
let pre_like_img = sports_img["tennis"]; // 각 종목 이미지로

const new_review_item = document.createElement('div');

    new_review_item.classList.add('review_item'); 
    // TODO: 작성 시간 변경, img full_heart 내가 임의로 파일명 넣어서 가져온거라서 변경 필요함
    new_review_item.innerHTML = `
        <div class="review_leftContainer">
            <div class="review_img_container">
                <img src=${pre_like_img} alt="내가 쓴 리뷰 사진" class="review_img">
            </div>
            <div class="heart_container">
                <img class="full_heart" src="../../static/img/full_heart.png" alt="채워진 하트"> 
                <span class="iconify heart-icon" data-icon="akar-icons:heart"></span>
                <span class="heart_cnt">3개</span>
            </div>
        </div>
        <div class="review_rightContainer">
            <div class="my_review_titleAndWriter">
                <div class="review_title">젝시믹스 5부레깅스</div>
                <div class="review_writerAndTime">아무개 / 12:00</div> 
            </div>
            <div class="my_review_star">${'★'.repeat(reviewInfo.rate) + '☆'.repeat(5-reviewInfo.rate)}</div>
            <div class="my_review_likeAndComment">댓글 10개</div>
            <div class="my_review_writerDetail">여 / 160cm 50kg / 중</div>
            <div class="my_review_buyInfo">공식홈페이지 / 15000</div>
            <div class="my_review_content">운동할 때 편해요!</div>
        </div>
    `;
    $review_container.appendChild(new_review_item);
    }
    
}

export const reviewIdx_noPostman = [1, 2, 3, 4, 5];
export const reviewInfoArr_noPostman = [
    {},
    {
        "reviewIdx": 1,
        "userIdx": 1,
        "userName": "김현경",
        "img_path": "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg",
        "brand": "나이키",
        "title": "나이키 츄리닝",
        "category": "bottom",
        "rate": 3,
        "likes": 3,
        "comments": 2,
        "gender": "female",
        "height": 168,
        "weight": 70,
        "level": 1,
        "source": "쿠팡",
        "price": 15000,
        "sport" : "tennis",
        "content": "pass testcase1"
    },
    {
        "reviewIdx": 2,
        "userIdx": 1,
        "userName": "아무개",
        "img_path": "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875__340.jpg",
        "brand": "아디다스",
        "title": "아디다스 스포츠브라",
        "category": "bottom",
        "rate": 1,
        "likes": 5,
        "comments": 10,
        "gender": "male",
        "height": 180,
        "weight": 80,
        "level": 2,
        "source": "공식홈페이지",
        "price": 35000,
        "sport" : "hike",
        "content": "pass testcase 아무개"
    },
    {
        "reviewIdx": 3,
        "userIdx": 1,
        "userName": "아무개",
        "img_path": "https://cdn.pixabay.com/photo/2020/09/04/20/09/cartoon-5544856__340.jpg",
        "brand": "아디다스",
        "title": "아디다스 스포츠브라",
        "category": "bottom",
        "rate": 1,
        "likes": 0,
        "comments": 10,
        "gender": "male",
        "height": 180,
        "weight": 80,
        "level": 2,
        "source": "공식홈페이지",
        "price": 35000,
        "sport" : "golf",
        "content": "pass testcase 아무개"
    },
    {
        "reviewIdx": 4,
        "userIdx": 1,
        "userName": "아무개",
        "img_path": "https://cdn.pixabay.com/photo/2017/11/26/15/16/smiley-2979107__340.jpg",
        "brand": "아디다스",
        "title": "아디다스 스포츠브라",
        "category": "bottom",
        "rate": 4,
        "likes": 5,
        "comments": 10,
        "gender": "male",
        "height": 180,
        "weight": 80,
        "level": 2,
        "source": "공식홈페이지",
        "price": 35000,
        "sport" : "balls",
        "content": "pass testcase 아무개"
    },
    {
        "reviewIdx": 5,
        "userIdx": 1,
        "userName": "가나다",
        "img_path": "",
        "brand": "아디다스",
        "title": "아디다스 스포츠브라",
        "category": "bottom",
        "rate": 2,
        "likes": 5,
        "comments": 10,
        "gender": "female",
        "height": 160,
        "weight": 40,
        "level": 3,
        "source": "공식홈페이지",
        "price": 35000,
        "sport" : "swim",
        "content": "pass testcase1"
    }
];

export const userInfo_noPostman = {
    "name" : "무지개",
    "profileImg" : "https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445__340.jpg",
    "height" : "170",
    "weight" : "50",
}