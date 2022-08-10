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

onlyImg_btn.addEventListener("click" , (e) => {

    if(onlyImg_btn_box.classList.contains("onlyImg-checked")) {
        onlyImg_btn_box.classList.remove("onlyImg-checked") ;
        // 전체..
    } 
    else {
        onlyImg_btn_box.classList.add("onlyImg-checked") ;
        // 사진만 보기 ..
    }
})