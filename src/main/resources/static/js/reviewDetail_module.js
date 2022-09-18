/** 로그인 토큰 저장 여부 */
const hasToken = localStorage.getItem("token") ? localStorage.getItem("token") :  false ;

/** userIdx 가져오기 */
export async function getUserIdx () {
    if (!hasToken) {return false;    }

    const response = await axios.get("/user/userIdx", {
        headers : {
            Authorization : hasToken
        }
    } )
    .then(res => res.data.userIdx)
    .catch(error => console.log(error))
    return response ;
}

/**  리뷰 상세 보기   */
export function reviewDetail_template(data) {
	const $review_title = document.querySelector(".review_title") ;
	const $review_writerAndTime = document.querySelector(".review_writerAndTime") ;
	const $my_review_star = document.querySelector(".my_review_star");
	const $my_review_likeAndComment = document.querySelector(".my_review_likeAndComment");
	const $my_review_writerDetail = document.querySelector(".my_review_writerDetail") ;
	const $my_review_buyInfo  = document.querySelector(".my_review_buyInfo") ;
	const $my_review_content = document.querySelector(".my_review_content");

	$review_title.innerText = `${data.brand}  ${data.title}` ;
	$review_writerAndTime.innerText = `${data.userName} / ${regDateForm(data.regDate)}`
	$my_review_star.innerText = `${'★'.repeat(data.rate) + '☆'.repeat(5-data.rate)}` ;
	$my_review_likeAndComment.innerText = `댓글 ${data.comments}개`;
	$my_review_writerDetail.innerText = `${showGender(data.gender)} / ${data.height}cm ${data.weight}kg / ${showLevel(data.level)}` ;
	$my_review_buyInfo.innerText = `${data.source} / ${data.price}원` ;
	$my_review_content.innerText = `${data.content}`

    document.querySelector(".likes-cnt_num").innerText = `${data.likes}` ;
    document.querySelector(".comments-cnt_num").innerText = `${data.comments}` ;
    $review_title.dataset.index = `${data.reviewIdx}`  ;
    isUserWriterSame_template();   
}

export function parentComment_template (data) {
    const parentComment =  `
            <div class="comment-parent flex commentIdx${data.commentIdx}">
                            <div class="comment-item_profile">
                                <img src="${data.profileImg}" alt="profileImg">
                            </div>
                            <div class="comment-item_container">
                                <div class="comment-item_upper flex">
                                    <div class="comment-item_nameAndTime flex">
                                        <h4 class="comment-item_name">${data.name}</h4>
                                        <div class="comment-item_time">${regDateForm(data.regDate)}</div>
                                    </div>                                    
                                    <div class="comment-item_more">
                                        <span class="more_icon">:</span>
                                    </div>
                                </div>
                                <div class="comment-content">
                                    ${data.content}
                                </div>
                            </div>
                        </div>
        `
    if (data.parentIdx == 0) {
        document.querySelector(".comments-list").insertAdjacentHTML("afterbegin", parentComment) ;
    }    
    return data ;
}


export function childComment_template (data) {    
    const childComment = `
        <div class="comment-child flex">
                            <div class="comment-child_division">
                                <img src="../../static/img/child_comment_arrow.png" alt="">
                            </div>
                            <div class="comment-item_profile">
                                <img src="${data.profileImg}" alt="profileImg">
                            </div>
                            <div class="comment-item_container">
                                <div class="comment-item_upper flex">
                                    <div class="comment-item_nameAndTime flex">
                                        <h4 class="comment-item_name">${data.name}</h4>
                                        <div class="comment-item_time">${regDateForm(data.regDate)}</div>
                                    </div>  
                                    <div class="comment-item_more">
                                        <span class="more_icon">:</span>
                                    </div>
                                </div>
                                <div class="comment-content">
                                    ${data.content}
                                </div>
                            </div>
                        </div>
    `
    if (data.parentIdx != 0) {
        document.querySelector(`.commentIdx${data.parentIdx}`).insertAdjacentHTML("afterend", childComment) ;
    }    
    return data ;
}

export function rearrange_comments(data) {  //  [ {댓글}, {댓글}, ... ]
    const result = data.filter(x => x.parentIdx==0) 
    result.sort((a,b) => a.commentIdx - b.commentIdx )

    const child_result = data.filter(x => x.parentIdx!=0)
    child_result.sort((a,b) => a.commentIdx - b.commentIdx)

    result.push(...child_result);
    return result ;
}

/** 로그인 유저와 작성자 같은지 여부 체크 */
export async function isUserWriter_same () {
    const response = axios.get(`/review/${reviewIdx}/user/${userIdx}`)
}

// /** (부모) 댓글 달기  */
// export function submit_parComment(e) {
//     e.preventDefault() ;
//     const content = e.target[0].value ;
//     if (!content) {
//         alert("댓글 내용을 작성해주세요");
//         return ;
//     }
//     const reviewIdx = document.querySelector(".review_title").dataset.index ;

//     axios.post("/comment", {
//         reviewIdx : reviewIdx,
//         content : `${content}` 
//     })
//     .then((res) => )
//     .catch((error) => {
//         console.error("댓글 작성 오류..")
//     })

// }

/** 리뷰 - 로그인유저와 작성자 같을 시 */
function isUserWriterSame_template() {
    if(hasToken) {
        console.log("has token")
        document.querySelector(".review-btn_container").classList.remove(".hidden") ;
    }else {
        console.log("no token")
        document.querySelector(".review-btn_container").classList.add("hidden") ;
    }
}
/** 리뷰 삭제 */
async function deleteReview() {
    if (!confirm("정말 삭제하시겠습니까??")){  // 취소
        return ;
    }  //  확인
    // 리뷰 삭제 api 구현하기 ~!!!!!
    
}

function regDateForm(date) {
    if(!date) {
        return;
    }
    const ymd = date.split(" ")[0] ;
    return ymd ;
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