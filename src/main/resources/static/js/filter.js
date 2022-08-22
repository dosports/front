'use strict';
 
// const u = "https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/reviews/female/tennis?category&height&weight&level&minPrice&maxPrice;"

// api 테스트 할때는 밑에 줄 반드시 주석 해제 !!! ************************ 밑에 window~~ 주석 지우기 !!!!
// const BASE_API_URL = "https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io" // + window.location.pathname    
const BASE_API_URL = ""+ window.location.pathname   ;


function filteredApiUrl(cate, height, weight, level, minPrice , maxPrice, sortParam, pageNum) {
    return `${BASE_API_URL}?category=${cate}&height=${height}&weight=${weight}&level=${level}&min_price=${minPrice}&max_price=${maxPrice}&sort_param=${sortParam}&page_num=${pageNum}`;
}

function frontUrl(cate, height, weight, level, minPrice, maxPrice) { // 필터링 값 반영 
    return `${BASE_API_URL}?category=${cate}&height=${height}&weight=${weight}&level=${level}&min_price=${minPrice}&max_price=${maxPrice}`;
}
function backUrl(photo, sort, page) {
    return `&isPhoto=${photo}&sort_param=${sort}&page_num=${page}` ;
}
let current_frontUrl ; // 필터링 했던 url
let is_photo = false ; // true false
let sort_num = 1 ; // 1 , 2 , 3
let page_num = 1 ; // 

// 테스트를 위함 !!  나중에는 remove 하고 지우기 !!! ************************
// localStorage.setItem("token", "has token") ;
// localStorage.removeItem("token");
//                                          ************************

// 토큰 저장 여부
const hasToken = localStorage.getItem("token") ? true :  false ;

// 위에 운동 종목 이름 
const location_pth = window.location.pathname ;
const cur_sport = location_pth.split("/")[3];
const filter_page_title = document.querySelector(".filter-container_title h2") ;
filter_page_title.innerHTML = currSport(cur_sport);

// 페이지 끌올 버튼 
const pageUp_btn = document.querySelector(".pageUp-btn") ;

pageUp_btn.addEventListener("click" , ()=> {
    window.scrollTo({top : 0 , behavior : 'smooth'});
    console.log("click") ;
})

document.addEventListener("scroll", () => {
    if(window.scrollY > upper_part_height) {
        pageUp_btn.classList.add('pageUp-action') ;
        control_scroll()  ;
    } else {
        pageUp_btn.classList.remove('pageUp-action') ;
    }
})
// 스크롤하면 끌올 버튼 따라가게끔
function control_scroll(){
    let timer = null;
    timer = setTimeout(() =>{
        const pageY = window.pageYOffset;
        pageUp_btn.style.top = `${pageY + window.innerHeight/2}px`;
    }, 200)
}

// 리뷰 작성하기 버튼 : 상품 목록 쪽으로 스크롤 할 때 생기기
const write_review_btn = document.querySelector(".writeReview-btn") ;
const previous_page = document.querySelector("#previous-page") ;
const filter_container = document.querySelector("#filter") ;

const previous_page_height = previous_page.getBoundingClientRect().height;
const filter_container_height = filter_container.getBoundingClientRect().height;
const upper_part_height = previous_page_height + filter_container_height ;

if (hasToken) { // 로그인할 때만 리뷰 작성하기 버튼 보여주기
    if(write_review_btn.classList.contains("writeBtn-hidden")) {
        write_review_btn.classList.remove("writeBtn-hidden") ;
    }

    document.addEventListener("scroll", () => {
        if (window.scrollY > upper_part_height) {
            write_review_btn.classList.add("writeBtn-action") ;
        } else {
            write_review_btn.classList.remove("writeBtn-action");
        }
    })

} else {
    write_review_btn.classList.add("writeBtn-hidden");
}

// 이전 페이지 버튼 
previous_page.addEventListener("click" , () => {
    window.history.back() ;
})

// 모바일 화면일 시 filter 아이콘 
const filter_icon = document.querySelector('.filter-icon') ;

filter_icon.addEventListener('click', () => {
    filter_container.classList.add('open') ;
})

const filter_cancel_icon = document.querySelector(".filter-icon_cancel") ;
filter_cancel_icon.addEventListener('click', () => {
    filter_container.classList.remove('open') ;
})

// 모바일 : 필터 값들 나열 
function filterValue(cate, height, weight, level, min, max) {
    const filtered_result = document.querySelector(".filtered-result") ;
    while(filtered_result.hasChildNodes()) {
        filtered_result.removeChild(filtered_result.firstChild);
    }
    const cate_result = () => {
        switch (cate) {
            case "":
                return "전체";
                break;
            case "top":
                return "상의";
                break;
            case "bottom":
                return "하의";
                break;
            case "outer":
                return "아우터";
                break;
            case "inner":
                return "이너웨어";
                break;
            case "shoes":
                return "신발";
                break;
            case "item":
                return "악세사리";
                break;        
            default:
                return "" ;
                break;
        }
    }
    const height_result = height ? height+"cm" : "" ;
    const weight_result = weight ? weight+"kg" : "" ;
    const level_result = level ? showLevel(level) : "" ;
    const min_result = min ? min+"원 이상" : "" ;
    const max_result = max ? max+"원 이하" : "" ;

    let arr = [cate_result(), height_result, weight_result, level_result, min_result, max_result];
    arr.reverse() ;
    arr.forEach(x =>  {
        if(x!="") {
            filtered_result.insertAdjacentHTML("afterbegin",`<div class="filter-result_box">${x}</div>`) ;
        }
    });
}

// 상품 목록 - 정렬 : 클릭
const ordering_list = document.querySelector(".products-ordering_sort") ;

ordering_list.addEventListener("click" , async (e) => {
    // 정렬 색 변하기
    const selected_ordering = ordering_list.querySelector(".order-action") ;
    selected_ordering.classList.remove("order-action") ;
    e.target.classList.add("order-action") ;

    // 일단 현재 보여준 게시물들 초기화 
    reset() ;
    // 클릭한 정렬에 맞추어 리뷰 정렬
    const order_name = e.target.id ;
    switch (order_name) {
        case "latest_order":
            sort_num = 1 ;
            break;

        case "likes_order":
            sort_num = 2 ;
            break;

        case "lowestPrice_order":
            sort_num = 3 ;
            break;
    
        default:
            break;
    }
    fetchAllReview(current_frontUrl+backUrl(is_photo,sort_num, page_num)) ; 
    console.log(sort_num) ;
    console.log(is_photo);
})

// 상품 목록 - 사진 리뷰만 보기 클릭 
const onlyImg_btn = document.querySelector(".products-ordering_onlyImg") ;
const onlyImg_btn_box = onlyImg_btn.querySelector(".onlyImg_box") ;
const onlyImg_input = document.querySelector("#onlyImg_box")

onlyImg_btn.addEventListener("change" , (e) => {

    is_photo = e.target.checked ? true : false ;

    reset() ;
    fetchAllReview(current_frontUrl+backUrl(is_photo,sort_num, page_num)) ; 
});

function likeBtn (reviewItem) {
    const like_container = reviewItem.querySelector(".heart_container") ;
    const like_icon = reviewItem.querySelector(".heart_container .iconify");
    const colored_like_icon = reviewItem.querySelector(".heart_container .colored") ;
    const liked_reviewIdx = like_container.dataset.reviewidx ;

    if(hasToken) { // 로그인할 때

        // 좋아요 눌렀는지 안눌렀는지 
        
        if (like_container.classList.contains("heart_limit")) {
            like_container.classList.remove("heart_limit");
        }
        like_container.addEventListener("click", (e) => {
            e.stopImmediatePropagation() ;
            e.preventDefault();
    
            if (like_icon.classList.contains("like-hidden")) { // 좋아요 취소
                like_icon.classList.remove("like-hidden");
                colored_like_icon.classList.add("like-hidden");
    
                axios.delete("/like", {                
                    reviewIdx : liked_reviewIdx
                })
            }
            else { // 좋아요 표시
                like_icon.classList.add("like-hidden");
                colored_like_icon.classList.remove("like-hidden");
    
                axios.post("/like", {
                    reviewIdx : liked_reviewIdx
                })
            }
        })
    } else { // 로그인 안했을 경우에는 아예 하트 클릭 안되게 
        like_container.classList.add("heart_limit");
    }
}

function viewLimit(reviewItem) {
    const review_buyInfo = reviewItem.querySelector(".my_review_buyInfo");
    const review_limit = reviewItem.querySelector(".review-view_limit") ; 
    if (hasToken) { // 로그인되어있을 때 
        review_buyInfo.classList.remove("review-hidden");
        review_limit.classList.add("review-hidden");
    } else {
        review_buyInfo.classList.add("review-hidden");
        review_limit.classList.remove("review-hidden");
    }
}


// 필터 - '검색' 클릭 시 입력한 값들 저장하고 값 넘기기
const filter_submit_btn = document.querySelector(".filter-submit") ;
const filter_form = document.querySelector("#filter-form");

filter_form.addEventListener("submit" , (e) => {
    e.preventDefault() ;

    // console.dir(onlyImg_input);
    let category_submit = filter_form.querySelector("input[name='category']:checked").id=="all" ? '' : filter_form.querySelector("input[name='category']:checked").id ;
    let height_submit = filter_form.querySelector("input[name='height']") ? filter_form.querySelector("input[name='height']").value : '' ;
    let weight_submit = filter_form.querySelector("input[name='weight']") ? filter_form.querySelector("input[name='weight']").value : '' ;
    let level_submit = filter_form.querySelector("input[name='level']:checked")? filter_form.querySelector("input[name='level']:checked").id : '' ;
    let minPrice_submit = filter_form.querySelector("input[name='min-price']") ? filter_form.querySelector("input[name='min-price']").value : '' ;
    let maxPrice_submit = filter_form.querySelector("input[name='max-price']") ? filter_form.querySelector("input[name='max-price']").value : '' ;
    
    // 모바일 화면 시 필터 값들 보여주도록
    filterValue(category_submit, height_submit, weight_submit, level_submit, minPrice_submit, maxPrice_submit);
    
    // 모바일 화면 시 제출하고 필터 화면 사라지게 
    filter_container.classList.remove('open') ;
    
    // 이 변수들로 필터 적용하는 함수 
    current_frontUrl = frontUrl(category_submit,height_submit, weight_submit, level_submit, minPrice_submit, maxPrice_submit) ;
    // console.log(current_frontUrl+backUrl(1,null));
    reset() ; 
    fetchAllReview(current_frontUrl+backUrl(is_photo,sort_num, page_num)) ;
    

})

// *** 상품 목록들 데이터 통신 작업 ***

function reset() {   // 필터링, 정렬, 사진 조회 시 초기화
    while(products_lists.hasChildNodes()) {
        products_lists.removeChild(products_lists.firstChild);
    }
}

let has_data ; // 다음  10개 게시물 있는지 확인 

// >> 10개 게시물 보여줌 
const products_lists = document.querySelector(".products-lists") ;

const fetchAllReview = async(url) => {
    try {
        const response = await axios.get(url)
        // .then(result => result.data.reverse())
        // .then(r => saveDataSet(r))
        .then(result => result.data.map(data => review_Template(data))) // reverse 없애면 .data
        // .then(r => saveDataSet(r)) // product 배열에 담기 for 정렬, 사진
        .catch(error => console.log(error)) ;
        setTimeout(() => {
            let targets = document.querySelectorAll(".review_item");


            targets.forEach((t) => {
                likeBtn(t) ;
                viewLimit(t) ;
            })

            let last = targets[targets.length-1] ;
            io.observe(last);
        });
        has_data = response ;
        return response ;
    } catch (error) {
        console.log(error) ;
        // alert("데이터를 불러오는데 실패하였습니다. 다시 시도해주세요.")
    }
    
}

let checking ;

const checkLiked  = async(url) => {
    try {
        const response = await axios.get(url) 
        .then(result => isLiked(result.data.checking)) ;
        return response ;
    } catch (error) {
        console.log(error) ;
    }
}

function isLiked(data) {
    checking = data ? true : false  ;
    return data ;
}

// <a href = "/review/${data.reviewIdx}">
function review_Template(data) {
    
    // 링크 수정해야함!                 ************************************
    const reviewItem = `
        <a href = "#">
            <div class="review_item">
                <div class="review_leftContainer">
                    <div class="review_img_container">
                        <img src="${data.img_path ? data.img_path : reviewDefualtImg(data.sports) }" alt="내가 쓴 리뷰 사진" class="review_img">
                    </div>
                    <div class="heart_container" data-reviewIdx="${data.reviewIdx}">
                        
                            <span class="iconify heart-icon" data-icon="akar-icons:heart"></span>
                            <span class="colored like-hidden"><img src="../static/img/colored_heart_icon.png" alt=""></span>
                        
                        <span class="heart_cnt">${data.likes}</span>
                    </div>
                </div>
                <div class="review_rightContainer">
                    <div class="my_review_titleAndWriter">
                        <div class="review_title">${data.brand}  ${data.title}</div>
                        <div class="review_writerAndTime">${data.userName} / ${regDateForm(data.regDate)}</div>
                    </div>
                    <div class="my_review_star">${'★'.repeat(data.rate) + '☆'.repeat(5-data.rate)}</div>
                    <div class="my_review_likeAndComment"> 댓글 ${data.comments}개 </div>
                    <div class="my_review_writerDetail">${showGender(data.gender)} / ${data.height}cm ${data.weight}kg / ${showLevel(data.level)}</div>
                    <div class="my_review_buyInfo">${data.source} / ${data.price}원</div>
                    <div class="review-view_limit review-hidden">리뷰 작성하면 구매출처와 구매가격을 볼 수 있어요!</div>
                    
                    <div class="my_review_content">
                        ${data.content}
                    </div>                
                </div>
            </div>
        </a>
    `
    products_lists.insertAdjacentHTML("beforeend", reviewItem) ;
    let review_item = document.querySelector(".review_item");
    // listData.push(reviewItem);
    return review_item ;
}

const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
        if(e.isIntersecting) {
            if(has_data!=null){
                fetchAllReview(current_frontUrl+backUrl(is_photo,sort_num, page_num)) ;
                page_num++ ;
                observer.unobserve(e.target);
            }
        } 
    })
}, {threhold : 1}) ;

function showGender(gender) { // 성별 표시 
    if (gender=="f") {
        return '여성';
    } else if (gender == 'm') {
        return '남성';
    }
}

function showLevel(level) {
    if(level==1) {
        return '초';
    } else if(level==2) {
        return '중';
    } else if(level==3) {
        return '고';
    }
}
function reviewDefualtImg (cate) {
    switch (cate) {
        case 'tennis':
            return '../static/img/tennis_icon.png' ;
            break;
        case 'hike':
            return '../static/img/hiking_icon.png' ;
            break;
        case 'swim':
            return '../static/img/swim_icon.png' ;
            break;
        case 'gym':
            return '../static/img/gym_icon.png' ;
            break;
        case 'golf':
            return '../static/img/golf_icon.png' ;
            break;
        case 'balls':
            return '../static/img/balls_icon.png' ;
            break;
        default:
            break;
    }
}
function currSport (sport) {
    switch (sport) {
        case "tennis":
            return "테니스" ;
            break;
        case "hike":
            return "등산" ;
            break;
        case "swim":
            return "수영" ;
            break;
        case "gym":
            return "헬스/요가/필라테스" ;
            break;
        case "golf":
            return "골프" ;
            break;
        case "balls":
            return "농구/축구/야구" ;
            break;
        default:
            return "운동종목";
    }
}
function regDateForm(date) {
    if(!date) {
        return;
    }
    const ymd = date.split(" ")[0] ;
    return ymd ;
}