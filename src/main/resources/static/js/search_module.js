// 검색 기능 추가

// mobile/desktop - 돋보기 버튼 클릭시
export function desktop_click_search_btn(){
    console.log(document);
    search_func(document.querySelector('#search-input'));
}

export function mobile_click_search_btn(){
    search_func(document.querySelector('#mobile-search-input'));
}

// desktop - input 엔터 눌렀을 때
export function searchEnterEventHandler(event){
    if(window.event.keyCode == 13){
		if (event.target.value == ""){
			alert.focus();
			alert('검색어를 입력해주세요');
			event.target.focus();
			return;
		}
        search_func(event.target)
    }
}

function search_func(DOM){
    const search_word = DOM.value;
    if(search_word == ""){
        alert('검색어를 입력해주세요');
        return;
    }
    console.log(search_word);
    window.location.href = `../search/search.html?search=${search_word}`;
    // event.preventDefault();
}






