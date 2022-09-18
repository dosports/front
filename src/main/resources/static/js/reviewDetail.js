'use strict';
import { header_onload, header_onscroll, alarm_reset } from "./header.js"; // 이거 주석처리하고 밑에 주석 해제하기 !!
import { reviewDetail_template , rearrange_comments , parentComment_template, 
    childComment_template, getUserIdx } from "./reviewDetail_module.js";
// import { header_onload, header_onscroll, alarm_reset } from "/js/header.js";

localStorage.setItem("token" , "ex") ;
// localStorage.clear()

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


/** 리뷰 상세 이미지 (점 클릭시 해당 이미지로 이동) */
// let slideIndex = 0 ;

function reviewImg(n) {
	const $review_images = document.querySelectorAll(".review-img_files img") ;
	const $dots = document.querySelectorAll(".dot") ;

	for (let index = 0; index < $review_images.length; index++) {
		$review_images[index].classList.remove("review-img_action")	;
		$dots[index].classList.remove("img_focus") ;
	}

	// if (slideIndex>$review_images.length-1) {slideIndex=0}

	$review_images[n].classList.add("review-img_action");
	$dots[n].classList.add("img_focus") ;
}

function clickImgDot() {
	const $review_img_cnt = document.querySelector(".review-img_cnt") ;
	$review_img_cnt.addEventListener("click" , (e) => {
		if(e.target.classList.contains("dot")) {
			let clickNum = Number(e.target.dataset.num);
			reviewImg(clickNum);
		}
	})
}
clickImgDot();
reviewImg(0) ;


/** 리뷰 상세 Fetch */
async function fetchReview (url) {
    try {
        const response = await axios.get(url)
        .then(result => reviewDetail_template(result.data)) // reverse 없애면 .data
        // .then(result => result.data.map(data => reviewDetail_template(data))) // reverse 없애면 .data
        .catch(error => console.log(error)) ;
    } catch (error) {
        console.log(error)
    }
}

// fetchReview("https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/review/%7BreviewIdx%7D");

/** 댓글 Fetch */
async function fetchComments (url) {
	try {
        const response = await axios.get(url)      
        .then(result => rearrange_comments(result.data))
        .then(result => result.map(data => parentComment_template(data)))
        .then(result => result.map(data => childComment_template(data)))
        .then(result => {
            document.querySelector(".comments-cnt_num").innerText = `${result.length}` ;
            return result
        })
        .catch(error => console.log(error)) ;
        
        console.dir(response)
    } catch (error) {
        console.log(error)
    }
}

// fetchComments("https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/comment/%7BreviewIdx%7D");


/** (부모) 댓글 작성 */
document.querySelector(".comment-write_writingArea").addEventListener("submit", (e) => {
    e.preventDefault() ;
    check()
    const content = e.target[0].value ;
    if (!content) {
        alert("댓글 내용을 작성해주세요");
        return ;
    }
    const reviewIdx = document.querySelector(".review_title").dataset.index ;

    axios.post("/comment", {
        reviewIdx : reviewIdx,
        content : `${content}` 
    })
    .then(fetchComments(`/comment/${reviewIdx}`))
    .catch((error) => {
        console.log(error)
    })
} );

// async function checkLogin() {
//     const isLoggedin = await getUserIdx() ;
//     if (!isLoggedin) {
//         console.log("no!!")
//     } else {
//         console.log("login")
//     }
// }
// checkLogin()



