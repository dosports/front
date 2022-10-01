'use strict';
// import { header_onload, header_onscroll, alarm_reset } from "./header.js"; // 이거 주석처리하고 밑에 주석 해제하기 !!
// import { reviewDetail_template , fetchComments, 
//     viewLimit , writingComLimit } from "./reviewDetail_module.js";

axios.defaults.baseURL = "" ; // url base url 쓰기 !!    reviewDetail_module 에도 써야함 !!!

/** 현재 위치하고 있는 리뷰 Idx 받아오기 */
const urlArr = window.location.pathname.split('?') ;
const curReveiwIdx = Number(urlArr[urlArr.length-1].split("=")[1]) ;

/** 화면 접속하자마자 리뷰 와 댓글 보여주기 */
fetchReview(`/review/${curReveiwIdx}`) ;
fetchComments(`/comment/${curReveiwIdx}`) ;

import { header_onload, header_onscroll, alarm_reset } from "/js/header.js";
import { reviewDetail_template , fetchComments, 
    viewLimit , writingComLimit } from "/js/reviewDetail_module.js";

// api 
const API = "" ; // api url 적기 !!
const CUR_URL = API + window.location.pathname   ;  

await fetch("../../templates/main/main_header.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector("header").innerHTML = text;
	});

header_onload();
window.onscroll = header_onscroll;
window.addEventListener("resize", () => {
	// scrollX_reset();
	alarm_reset();
});


// 페이지 끌올 버튼 
const header_height = document.querySelector("header").getBoundingClientRect().height;
const review_item_height = document.querySelector(".review_item").getBoundingClientRect().height;
const upper_part_height = header_height + review_item_height ;
const pageUp_btn = document.querySelector(".pageUp-btn") ;

pageUp_btn.addEventListener("click" , ()=> {
    window.scrollTo({top : 0 , behavior : 'smooth'});
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

/** 비로그인 시에는 아예 댓글 못 달도록 */ 
writingComLimit()

/** 리뷰 상세 Fetch */
async function fetchReview (url) {
    try {
        const response = await axios.get(url)
        .then(result => reviewDetail_template(result.data)) // reverse 없애면 .data        
        // .then(result => result.data.map(data => reviewDetail_template(data))) // reverse 없애면 .data
        .catch(error => console.log(error)) ;
        setTimeout(() => {
            viewLimit() ;
        });        
    } catch (error) {
        console.log(error)
    }
}
// fetchReview("https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/review/%7BreviewIdx%7D");

// fetchComments("https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/comment/%7BreviewIdx%7D");


/** (부모) 댓글 작성 */  //  
document.querySelector(".write-parent .comment-write_writingArea").addEventListener("submit", (e) => {
    e.preventDefault() ;
    // fetchComments("https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/comment/%7BreviewIdx%7D");
    const content = e.target[0].value ;
    if (!content) {
        alert("댓글 내용을 작성해주세요");
        return ;
    }

    const reviewIdx = curReveiwIdx ;
    // const reviewIdx = document.querySelector(".review_title").dataset.index ;

    console.log('reviewIdx : ' , reviewIdx) ;

    e.target[0].value = '' ; // 등록 후 작성했던 댓글 내용 사라지게

    axios.post("/comment", {
    // axios.post("https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/comment", {
        reviewIdx : reviewIdx,
        content : `${content}` 
    })
    .then(fetchComments(`/comment/${reviewIdx}`))
    // .then(fetchComments(`https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/comment/%7BreviewIdx%7D`))
    .catch((error) => {
        console.log(error)
    })
} );

// https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/comment