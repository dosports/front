axios.defaults.baseURL = "" ; // url base url 쓰기 !!

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
    
    /** 이미지 보여주기 */ 
    const imgArr = [data.img_path , data.img_path1 , data.img_path2 , data.img_path3, data.img_path4]
    reviewDetail_img(imgArr , document.querySelector(".review-img_files") , document.querySelector(".review-img_cnt"))

    clickImgDot();
    reviewImg(0) ;

    // console.dir(document.querySelector(".review-btn_container")) ;
    click_reviewBtn(data.reviewIdx);    

    const $review_btn_container = document.querySelector(".review-btn_container") ;

    /** 리뷰 좋아요 버튼 */
    likeBtn() ;

    /** 로그인 유저와 게시물 작성자 같으면 게시물 수정&삭제 버튼 생기기 / 없으면 없애기 */     
    if((isUserWriter_same(data.reviewIdx) ) == 200) {
        $review_btn_container.classList.remove("hidden") ;
    } else {
        $review_btn_container.classList.add("hidden");
    }
}

/** 리뷰 수정 페이지 이동 시 리뷰인덱스 값 넘어가기  */
export function clickModifyForm() {
    document.querySelector(".review-modify").addEventListener("click" , () => {
        window.location.href = "/review/update/" + getUserIdx() ;
    })
}

function reviewDetail_img(arr, imgDom, cntDom) {

    arr.map((x) => { // [img_path , img_path1 , ..]
        if(!x) {return ;}
        imgDom.insertAdjacentHTML("beforeend", `
            <img src=${x} alt="내가 쓴 리뷰 사진" class="review_img">
        `) ;

        cntDom.insertAdjacentHTML("beforeend", `
            <div data-num=${arr.indexOf(x)} class="dot ${arr.indexOf(x)==0 ? " img_focus" : ""}"></div>
        ` ) ;
    })
}

/** 댓글 Fetch */
export async function fetchComments (url) {
	try {
        const response = await axios.get(url)  
        .then(resetComments())    
        .then(result => rearrange_comments(result.data))
        .then(result => result.map(data => parentComment_template(data)))
        .then(result => result.map(data => childComment_template(data)))
        // .then(clickCommentMoreBtn())
        .then(result => {
            document.querySelector(".comments-cnt_num").innerText = `${result.length}` ;
            return result
        })
        .catch(error => console.log(error)) ;

        setTimeout(() => {
            clickCommentMoreBtn();
        })
        
        console.dir(response)
    } catch (error) {
        console.log(error)
    }
}



/** 댓글 초기화 */
export function resetComments () {
    const $comments_list = document.querySelector(".comments-list") ;
    while($comments_list.hasChildNodes()) {
        $comments_list.removeChild($comments_list.firstChild) ;
    }
}

export function parentComment_template (data) {     // FIX LINK
    const parentComment =  `
    <div class="comment-item commentIdx${data.commentIdx}">
            <div class="comment-parent flex ">
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
                                        <span class="more_icon" >:</span>
                                        <div class="comment-more_container hidden">
                                            <div class="more-container_writeChildCom" data-num="${data.commentIdx}">대댓글 달기</div>
                                            <div class="more-container_deleteComment click-limit" data-num="${data.commentIdx}">댓글삭제</div> 
                                        </div>
                                    </div>
                                </div>
                                <div class="comment-content">
                                    ${data.content}
                                </div>
                            </div>
                        </div>

                        <div class="comment-write write-child hidden flex" data-parentIdx="${data.parentIdx}" data-reviewIdx="${data.reviewIdx}">
                            <div class="comment-child_division">
                                <img src="../../static/img/child_comment_arrow.png" alt="">
                            </div>
                            <div class="comment-item_profile comment-write_profile">
                                <img src="../../static/img/logo.png" alt="profileImg">
                            </div>
                            <div class="comment-item_container comment-write_container">
                                <div class="comment-item_upper comment-write_myName"><h4>사용자 이름</h4></div>
                                <form class="comment-write_writingArea">
                                    <input autocomplete="off" type="text" name="writeComment" id="writeComment" placeholder="댓글 추가">
                                    <button type="submit">등록</button>
                                </form>
                            </div>                    
                        </div>
                    </div>
        `
    if (data.parentIdx == 0) {
        document.querySelector(".comments-list").insertAdjacentHTML("afterbegin", parentComment) ;
    }    
    
    return data ;
}


export function childComment_template (data) {    // FIX LINK
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
                                        <div class="comment-more_container hidden">
                                            
                                            <div class="more-container_deleteComment click-limit" data-num="${data.commentIdx}">댓글삭제</div> 
                                        </div>
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


/** 로그인 유저와 게시물 작성자 같은지 여부 체크 */
async function isUserWriter_same (reviewIdx) { // ######## 밑에 reviewIdx userIdx 수정하기 !!! #######
    // const response = axios.get(`/review/${reviewIdx}/user/${userIdx}`)
    const response = axios.get(`/review/${reviewIdx}/user`)    
    .then(res => res.status)  // ********* status 수정할수도 !!
    .catch((error) => {
        console.log(error)
    })
    return response ;    
}
// https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/review/%7BreviewIdx%7D/user/%7BuserIdx%7D

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


function click_reviewBtn(i) { // reviewIdx 넘기기
    document.querySelector(".review-btn_container").addEventListener("click",(e)=> {
        e.preventDefault() ;

        if(e.target.className=="review-delete") { // 삭제 클릭            
            deleteReview(i);            
        } else {
            window.location.href = `../reviewForm/modify_form.html?reviewIdx=${i}` ;
        }// 수정 클릭시 ... 
    })
}

/** 리뷰 삭제 */
async function deleteReview(i) {
    if (!confirm("정말 삭제하시겠습니까??")){  // 취소
        return ;
    }  //  확인
    else {
        await axios.delete(`/review/delete/${i}`)
        .then(alert("정상적으로 삭제 되었습니다."))
        .catch((error)=> {
            alert("게시물 삭제에 실패하였습니다.");
            console.log(error);
        })
    }
}

/**   */

/** 비로그인 시에는 구매출처 구매가격 안보이게 */
export function viewLimit() {
    const $review_buyInfo = document.querySelector(".my_review_buyInfo");
    const $review_limit = document.querySelector(".review-view_limit") ; 
    if (hasToken) { // 로그인되어있을 때 
        $review_buyInfo.classList.remove("hidden");
        $review_limit.classList.add("hidden");
    } else {
        $review_buyInfo.classList.add("hidden");
        $review_limit.classList.remove("hidden");
    }
}

/** 비로그인 시에는 아예 댓글 못 달도록 */ 
export function writingComLimit() {
    const $write_parent = document.querySelector(".write-parent") ;
    if(hasToken) {
        $write_parent.classList.remove("hidden") ;
    }  else {
        $write_parent.classList.add("hidden") ; 
    }
}

/** 댓글 : (more) 버튼  */
export function clickCommentMoreBtn() {
    
    const $more_icon = document.querySelectorAll(".more_icon");
    $more_icon.forEach(icon  => clickEvent(icon))
    
    function clickEvent(icon) {
        icon.addEventListener("click", (e) => {
            // console.dir(e.target);
            // console.dir(e.target.nextElementSibling)
            const moreContainer = e.target.nextElementSibling

            if(!hasToken) { // 비로그인시에는 클릭안되게
                return ;
            }
            moreContainer.classList.toggle("hidden"); // : 버튼 누르면 박스 나오게끔
            writeChildComment() ;
            deleteComment() ;
            // console.dir(e.target) // span.more_icon
            }) 
    }
}
/** 댓글 more - 대댓글 작성 클릭시  */
function writeChildComment() {
    const $writeChildCom  = document.querySelectorAll(".more-container_writeChildCom") ;
    $writeChildCom.forEach(x =>  {
        clickWritingChild(x)
    })
    
    function clickWritingChild(x) {
        x.addEventListener("click" , (e) => {

            const temp = e.target.dataset.num ; //commentIdx${data.commentIdx}
            const $comment_item = document.querySelector(`.commentIdx${temp}`) ;
            
            $comment_item.querySelector(".write-child").classList.toggle("hidden") ;
            childCommentFetch($comment_item.querySelector(".write-child")) ;
            e.target.parentNode.classList.add("hidden");
        })
    }
}

/** 댓글 more - 댓글 삭제 클릭 시   : 작성자와 유저가 같을 때만 삭제 가능하게 */
function deleteComment() {
    const deleteMyComment = (x) => {
        x.addEventListener("click" , (e) => {
            e.target.parentNode.classList.add("hidden");
            if (!confirm("정말 삭제하시겠습니까??")){  // 취소
                return ;
            }  //  확인
            const temp = e.target.dataset.num ; //commentIdx${data.commentIdx}
            console.log(temp);
            delComment(temp) ;
        })
    }

    const $writeChildCom  = document.querySelectorAll(".more-container_deleteComment") ;
    $writeChildCom.forEach(x =>  {        
        const num = x.dataset.num ;

        // x.classList.remove("click-limit") ; // 지우기
        if (isMyComment(num)) { // 본인 댓글일 경우에는 커서 작동
            x.classList.remove("click-limit") ;
        }

        deleteMyComment(x) ;
    })
}

async function isMyComment(commentIdx) {
    try {
        const res = await axios.get(`/comment/check/${commentIdx}`)
        return res ;
    } catch (error) {
        console.log(error)
    }
}

async function delComment(commentIdx) { // 댓글 삭제 api 
    try {
        const res = await axios.delete(`/comment/delete/${commentIdx}`) ;
        location.reload();
        return res ;
    } catch (error) {
        console.log(error) ;
    }
}

/** (대댓글) 댓글 작성 */
function childCommentFetch(container) { //$comment_item.querySelector(".write-child")

    container.querySelector(".comment-write_writingArea").addEventListener("submit", (e) => {
        e.preventDefault() ;
        
        // fetchComments("https://8ca18059-b3ee-458c-b8c5-501cd3ff4c15.mock.pstmn.io/comment/%7BreviewIdx%7D");
        const content = e.target[0].value ;
        if (!content) {
            alert("댓글 내용을 작성해주세요");
            return ;
        }

        // const reviewIdx = document.querySelector(".review_title").dataset.index ;
        const reviewIdx = container.dataset.reviewidx ;
        const parentIdx = container.dataset.parentidx ;
        console.log(reviewIdx , parentIdx);        
    
        axios.post("/comment", {
            reviewIdx : reviewIdx,
            content : content ,
            parentIdx : parentIdx
        })
        .then(fetchComments(`/comment/${reviewIdx}`))
        .catch((error) => {
            console.log(error)
        })

        container.querySelector("input").value = '' ;
    } );

}


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


/** 리뷰 좋아요 기능 */
function likeBtn () {
    const like_container = document.querySelector(".heart_container") ;
    const like_icon = document.querySelector(".heart_container .iconify");
    const colored_like_icon = document.querySelector(".heart_container .colored") ;
    const $likes_cnt_num = document.querySelector(".likes-cnt_num") ;
    const liked_reviewIdx = like_container.dataset.reviewidx ;

    if(hasToken) { // 로그인할 때

        // 좋아요 눌렀는지 안눌렀는지 
        if (checkLiked(`/like/check/${liked_reviewIdx}`)) { // 좋아요 눌렀었다면 
            like_icon.classList.add("like-hidden");
            colored_like_icon.classList.remove("like-hidden");
        }
        
        if (like_container.classList.contains("heart_limit")) {
            like_container.classList.remove("heart_limit");
        }
        like_container.addEventListener("click", (e) => {
            e.stopImmediatePropagation() ;
            e.preventDefault();

            console.dir($likes_cnt_num) ;
    
            if (like_icon.classList.contains("like-hidden")) { // 좋아요 취소
                like_icon.classList.remove("like-hidden");
                colored_like_icon.classList.add("like-hidden");
                
                $likes_cnt_num.innerText = String(Number($likes_cnt_num.innerText)-1) ;
    
                axios.delete(`/like`, {                
                    reviewIdx : liked_reviewIdx
                })
            }
            else { // 좋아요 표시
                like_icon.classList.add("like-hidden");
                colored_like_icon.classList.remove("like-hidden");
    
                $likes_cnt_num.innerText = String(Number($likes_cnt_num.innerText)+1) ;

                axios.post(`/like`, {
                    reviewIdx : liked_reviewIdx
                })
            }
        })
    } else { // 로그인 안했을 경우에는 아예 하트 클릭 안되게 
        like_container.classList.add("heart_limit");
    }
}

const checkLiked  = async(url) => {
    try {
        const response = await axios.get(url) 
        .then(result => isLiked(result.data.isliked)) ;
        return response ;
    } catch (error) {
        console.log(error) ;
    }
}

function isLiked(data) {
    let checking = data ? true : false  ;
    return checking ;
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