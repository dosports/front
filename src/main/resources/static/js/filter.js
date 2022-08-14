'use strict';

// 페이지 끌올 버튼 
const pageUp_btn = document.querySelector(".pageUp-btn") ;

pageUp_btn.addEventListener("click" , ()=> {
    window.scrollTo({top : 0 , behavior : 'smooth'});
})

document.addEventListener("scroll", () => {
    if(window.scrollY > 10) {
        pageUp_btn.classList.add('pageUp-action') ;
    } else {
        pageUp_btn.classList.remove('pageUp-action') ;
    }
})

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

// 상품 목록 - 정렬 : 클릭
const ordering_list = document.querySelector(".products-ordering_sort") ;

ordering_list.addEventListener("click" , (e) => {
    
    const selected_ordering = ordering_list.querySelector(".order-action") ;
    selected_ordering.classList.remove("order-action") ;
    e.target.classList.add("order-action") ;
})


// 상품 목록 - 사진 리뷰만 보기 클릭 
const onlyImg_btn = document.querySelector(".products-ordering_onlyImg") ;
const onlyImg_btn_box = onlyImg_btn.querySelector(".onlyImg_box") ;
const onlyImg_input = document.querySelector("#onlyImg_box")

// const checkbox = document.querySelector("#onlyImg_box") ;
// checkbox.addEventListener("change", () => {
//     console.log("check");
// })

onlyImg_btn.addEventListener("change" , (e) => {
    if(e.target.checked) {
        // 사진만 보기
        isOnlyImg(true , filteredData);
    } 
    else {
        // 전체 리뷰 보기
        isOnlyImg(false , filteredData);
    }
});


// >> 사진 리뷰 혹은 전체 리뷰 필터 함수 
function isOnlyImg(isOnlyImgChecked, data) { // isOnlyImgChecked(true,false) / data(listData)
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

    console.dir(onlyImg_input);
    let category_submit = filter_form.querySelector("input[name='category']:checked").id ;
    let height_submit = filter_form.querySelector("input[name='height']").value ;
    let weight_submit = filter_form.querySelector("input[name='weight']").value ;
    let level_submit = filter_form.querySelector("input[name='level']:checked").id ;


        // 이 변수들로 필터 적용하는 함수 
    viewFilteredReview(category_submit, height_submit, weight_submit, level_submit) ;
})



// *** 상품 목록들 데이터 통신 작업 ***

// 기본 (default) 상품 목록

// axios.get("https://3f3f9929-efbf-491a-b481-e59c3996a804.mock.pstmn.io/list/%7Bgender%7D/%7Bsport%7D")
// .then(data => console.log(data.data.items));
const products_lists = document.querySelector(".products-lists") ;


const fetchReview = async() => { // api url 받으면 url 부분만 수정 !
    const response = await axios.get("https://3f3f9929-efbf-491a-b481-e59c3996a804.mock.pstmn.io/list/%7Bgender%7D/%7Bsport%7D")
    .then(result => result.data.items.map(data => review_Template(data)))
    .then(r => saveDataSet(r))
    .catch(error => console.log(error)) ;
    return response;
}

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

//viewReveiwWithFilter(data.category, data.height, data.weight, data.level)
// 처음 접속할때는 다 보여주고 필터 검색 할때 걸러지게
function review_Template(data) {
    const reviewItem = `
        <div class="review_item" data-category="${data.category}" data-level="${data.level}" data-img="${data.img_path ? 'has' : 'default'}">
            <div class="review_leftContainer">
                <img src="${data.img_path ? data.img_path : reviewDefualtImg(data.sports) }" alt="내가 쓴 리뷰 사진" class="review_img">
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
    `
    products_lists.insertAdjacentHTML('afterbegin', reviewItem) ;
    const review_item = document.querySelector(".review_item");
    return review_item ;
}

// const dataResult = fetchReview() ;  
fetchReview() ;  // <-- 기본 리뷰 목록 보여주기

let listData = [] ; // 현재의 리뷰들 'review_item' 배열로 저장
let filteredData = listData ; // 필터된 리뷰들 배열로 저장 (for 사진리뷰만 보기 , 정렬) / 초기화 - 필터 전 리뷰들

// >> 조회된 리뷰의 데이터셋 모음 + 비교
function saveDataSet(r) {
   r.forEach(element => {
    listData.push(element);
   });
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