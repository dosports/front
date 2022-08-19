'use strict';
 
// https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/reviews/female/tennis?category&height&weight&level&minPrice&maxPrice

// api 테스트 할때는 밑에 줄 반드시 주석 해제 !!!
const BASE_API_URL = "https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io" ;

function filteredApiUrl(cate, height, weight, level, minPrice , maxPrice, sortParam, pageNum) {
    return `${BASE_API_URL}/reviews/female/tennis?category=${cate}&height=${height}&weight=${weight}&level=${level}&min_price=${minPrice}&max_price=${maxPrice}&sort_param=${sortParam}&page_num=${pageNum}`;
}

function frontUrl(cate, height, weight, level, minPrice, maxPrice) { // 필터링 값 반영 
    return `${BASE_API_URL}/reviews/female/tennis?category=${cate}&height=${height}&weight=${weight}&level=${level}&min_price=${minPrice}&max_price=${maxPrice}`;
}
let current_frontUrl ; // 필터링 값 
function sortUrl(sortParam) { // 정렬 반영
    return `&sort_param=${sortParam}`;
}
function pageUrl(pageNum) {
    return `&page_num=${pageNum}`;
}

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


document.addEventListener("scroll", () => {
    if (window.scrollY > upper_part_height) {
        write_review_btn.classList.add("writeBtn-action") ;
    } else {
        write_review_btn.classList.remove("writeBtn-action");
    }
})

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

    // 클릭한 정렬에 맞추어 리뷰 정렬
    const order_name = e.target.id ;
    switch (order_name) {
        case "latest_order":
            fetchAllReview()
            break;

        case "likes_order":
            orderedByLikes(reviewData) ;
            break;

        case "lowestPrice_order":
            orderedByPrice(reviewData) ;
            break;
    
        default:
            break;
    }
})

// 상품 목록 - 사진 리뷰만 보기 클릭 
const onlyImg_btn = document.querySelector(".products-ordering_onlyImg") ;
const onlyImg_btn_box = onlyImg_btn.querySelector(".onlyImg_box") ;
const onlyImg_input = document.querySelector("#onlyImg_box")

// const checkbox = document.querySelector("#onlyImg_box") ;
// checkbox.addEventListener("change", () => {
//     console.log("check");
// })

onlyImg_btn.addEventListener("change" , async (e) => {
    let reviewData = await fetchAllReview() ;
    if(e.target.checked) {
        // 사진만 보기
        isOnlyImg(true , reviewData);
    } 
    else {
        // 전체 리뷰 보기
        isOnlyImg(false , reviewData);
    }
});
// fetchAllReview() 는 Promise 형태이며 .products-lists 의 배열들이다.

// >> 사진 리뷰 혹은 전체 리뷰 필터 함수 
function isOnlyImg(isOnlyImgChecked, data) { // isOnlyImgChecked(true,false) / data(listData) 
    // const reviewData = await data ; 
    if (isOnlyImgChecked) { // 사진 리뷰만 보기
        data.forEach(d=> {
            if (d.dataset.img == 'default') { // 이미지 없는 리뷰(기본 이미지) 안보이게끔
                d.classList.add('hidden') ;
            }
        })
    } else { // 전체 리뷰 보기 (전체라는 게 필터된 값들 중에 전체 !!)
        data.forEach(d => {
            d.classList.remove('hidden') ;
        })
    }
}


// 필터 - '검색' 클릭 시 입력한 값들 저장하고 값 넘기기
const filter_submit_btn = document.querySelector(".filter-submit") ;
const filter_form = document.querySelector("#filter-form");

filter_form.addEventListener("submit" , (e) => {
    e.preventDefault() ;

    // 필터 입력하고 제출하면 일단 사진 리뷰 선택은 없어지는 걸로
    onlyImg_input.checked=false;

    // console.dir(onlyImg_input);
    let category_submit = filter_form.querySelector("input[name='category']:checked").id=="all" ? '' : filter_form.querySelector("input[name='category']:checked").id ;
    let height_submit = filter_form.querySelector("input[name='height']") ? filter_form.querySelector("input[name='height']").value : '' ;
    let weight_submit = filter_form.querySelector("input[name='weight']") ? filter_form.querySelector("input[name='weight']").value : '' ;
    let level_submit = filter_form.querySelector("input[name='level']:checked")? filter_form.querySelector("input[name='level']:checked").id : '' ;
    let minPrice_submit = filter_form.querySelector("input[name='min-price']") ? filter_form.querySelector("input[name='min-price']").value : '' ;
    let maxPrice_submit = filter_form.querySelector("input[name='max-price']") ? filter_form.querySelector("input[name='max-price']").value : '' ;
    
    // 모바일 화면 시 필터 값들 보여주도록
    filterValue(category_submit, height_submit, weight_submit, level_submit, minPrice_submit, maxPrice_submit);
    
    
    // 이 변수들로 필터 적용하는 함수 
    current_frontUrl = frontUrl(category_submit,height_submit, weight_submit, level_submit, minPrice_submit, maxPrice_submit) ;
    // console.log(current_frontUrl+backUrl(1,null));
    fetchAllReview(current_frontUrl+sortUrl(null)+pageUrl(null)) ;
    
})



// *** 상품 목록들 데이터 통신 작업 ***
const products_lists = document.querySelector(".products-lists") ;

const fetchAllReview = async(url) => {
    try {
        while(products_lists.hasChildNodes()) {
            products_lists.removeChild(products_lists.firstChild);
        }

        const response = await axios.get(url)
        .then(result => result.data.map(data => review_Template(data,'afterbegin')))
        .then(r => saveDataSet(r)) // product 배열에 담기 for 정렬, 사진
        .catch(error => console.log(error)) ;
        return response ;
    } catch (error) {
        console.log(error) ;
        // alert("데이터를 불러오는데 실패하였습니다. 다시 시도해주세요.")
    }
}

function review_Template(data) {
    
    // 링크 수정해야함!
    const reviewItem = `
        <a href = "/review/${data.reviewIdx}">
            <div class="review_item" data-likes="${data.likes}" data-price="${data.price}" data-category="${data.category}" data-level="${data.level}" data-img="${data.img_path ? 'has' : 'default'}">
                <div class="review_leftContainer">
                    <div class="review_img_container">
                        <img src="${data.img_path ? data.img_path : reviewDefualtImg(data.sports) }" alt="내가 쓴 리뷰 사진" class="review_img">
                    </div>
                    <div class="heart_container">
                        <span class="iconify heart-icon" data-icon="akar-icons:heart"></span>
                        <span class="heart_cnt">${data.likes}</span>
                    </div>
                </div>
                <div class="review_rightContainer">
                    <div class="my_review_titleAndWriter">
                        <div class="review_title">${data.brand}  ${data.title}</div>
                        <div class="review_writerAndTime">${data.userName} / 작성 시간</div>
                    </div>
                    <div class="my_review_star">${'★'.repeat(data.rate) + '☆'.repeat(5-data.rate)}</div>
                    <div class="my_review_likeAndComment"> 댓글 ${data.comments}개 </div>
                    <div class="my_review_writerDetail">${showGender(data.gender)} / ${data.height}cm ${data.weight}kg / ${showLevel(data.level)}</div>
                    <div class="my_review_buyInfo">${data.source} / ${data.price}원</div>
                    
                    <div class="my_review_content">
                        ${data.content}
                    </div>                
                </div>
            </div>
        </a>
    `
    // const where = 'afterbegin' ;
    products_lists.insertAdjacentHTML("afterbegin", reviewItem) ;
    const review_item = document.querySelector(".review_item");
    return review_item ;
}

const min_price = document.querySelector("#min-price") ;
const max_price = document.querySelector("#max-price") ;

function showGender(gender) { // 성별 표시 
    if (gender=="female") {
        return '여성';
    } else if (gender == 'male') {
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
// const dataResult = fetchReview() ;  

let listData = [] ; // 현재의 리뷰 템플릿 데이터를 'review_item' 배열로 저장
let filteredData = listData ; // 필터된 리뷰들 배열로 저장 (for 사진리뷰만 보기 , 정렬) / 초기화 - 필터 전 리뷰들

// >> 조회된 리뷰(전체) 따로 배열에 넣기
function saveDataSet(r) {
   r.forEach(element => {
    listData.push(element);
   });

   return listData ; // 배열 형태로 리턴
//    fetchPriceRange(r); // 초기 - 조회된 리뷰의 가격들 불러와서 최저최고 입력
}

// >> 필터 - 입력한 값들 토대로 리뷰 목록 보여주기 
function viewFilteredReview(cate, height, weight, level) { // category_submit, height_submit, weight_submit, level_submit
    
    filteredData = [] ; // 필터가 되는 순간 일단 모든 리뷰들 비우기 

    listData.forEach(d => {
        if(cate=='all') { // 사용자가 품목 '전체' 를 선택했을 경우
            if (level == d.dataset.level) {
                d.classList.remove("hidden");
                filteredData.push(d); // 빈 배열에 해당 리뷰들 집어넣기
            } else {
                d.classList.add("hidden"); 
            }
        } else {    // 사용자가 품목에서 '전체' 가 아닌 특정 품목을 선택했을 경우
            if (cate == d.dataset.category && level == d.dataset.level) {
                d.classList.remove("hidden") ;
                filteredData.push(d);
            } else {
                d.classList.add("hidden");
            }
        }
    })
}

