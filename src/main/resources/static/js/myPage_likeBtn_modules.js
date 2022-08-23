import {getUserIdx} from "./myPage_modules.js";
import {reviewIdxs} from "./myPage_load10Review.js";
axios.defaults.baseURL = '';// TODO: axios 기본 url
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
const userIdx = ""; // FIXME: userIdx 얻는법...

function addLike(reviewIdx){
    axios.post(`/like`,{
        reviewIdx : reviewIdx,
    })
}

function deleteLike(reviewIdx){
    axios.delete(`/like`, {
        reviewIdx : reviewIdx,
    })
}

export function getElementIndex(element){ // element로는 review_item을 건네줌
    return [].indexOf.call(element.parentNode.children, element);
}

export function addLikeToServer(event, reviewIdxs){
    const eventTarget = event.target;
    const reviewItem = eventTarget.parentNode.parentNode.parentNode;
    const select_review_Idx = getElementIndex(reviewItem); // idx 0부터 시작함
    const reviewIdx = reviewIdxs[select_review_Idx];
    addLike(reviewIdx);
}

export function deleteLikeToServer(event, reviewIdxs){
    const eventTarget = event.target;
    const reviewItem = eventTarget.parentNode.parentNode.parentNode;
    const select_review_Idx = getElementIndex(reviewItem); // idx 0부터 시작함
    const reviewIdx = reviewIdxs[select_review_Idx];
    deleteLike(reviewIdx);
}

export function check_clickedLike(reviewIdx){
    return axios.get(`/like/check/${reviewIdx}`)
    .then(response => response.data.success);
}



// 좋아요 toggle
export function like_toggle(event){
    const likeBtn = event.target;
    const likeBtn_className = ['full_heart', 'heart-icon'];
    const likeBtn_check = likeBtn_className.some(className => likeBtn.classList.contains(className));
    if(likeBtn_check){
        const $full_heart = likeBtn.parentNode.querySelector('.full_heart');
        const $empty_heart = likeBtn.parentNode.querySelector('.heart-icon');
        if(likeBtn.classList.contains('full_heart')){// 꽉찬 하트 -> 빈 하트 - delete
            deleteLikeToServer(event, reviewIdxs);
            if(!$full_heart.classList.contains('hidden')){
                $full_heart.classList.add('hidden');
            }
            if($empty_heart.classList.contains('hidden')){
                $empty_heart.classList.remove('hidden');
            }
        }else{// 빈 하트 -> 꽉찬 하트 - add
            addLikeToServer(event, reviewIdxs);
            if($full_heart.classList.contains('hidden')){
                $full_heart.classList.remove('hidden');
            }
            if(!$empty_heart.classList.contains('hidden')){
                $empty_heart.classList.add('hidden');
            }
        }
    }
}