/*
let getToken = window.localStorage.getItem('token');
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
*/
const $contentBox = document.querySelector('#contentBox');

const reviewIdx = location.href.split('?')[1];
/*console.log(receivedData); // data test */

fetchReview(reviewIdx);

function fetchReview(reviewIdx) {
    fetch(`/review/${reviewIdx}`)
        .then((response) => response.json())
        .then((result) => content(result))
}

function content(data) {
    const resultItem = `<form id="writeForm" method="post" enctype="multipart/form-data">
    <div class="center-box" style="margin-top: 39px;">
        <span class="name">상품명</span>
        <input value="${data.title}" name="title" class="input-container" type="text" required>

        <span class="name">품목명</span>
        <select name="category" class="select-box" required>
            <option>===선택해주세요===</option>
            <option value="top">상의</option>
            <option value="bottom">하의</option>
            <option value="outer">아우터</option>
            <option value="inner">이너웨어</option>
            <option value="shoes">신발</option>
            <option value="item">스포츠용품</option>
        </select>
    </div>



    <div style="width: 645px; margin: auto;">
        <div style="margin-top: 49px; margin-bottom: 39px; display: flex;">
            <span class="name">운동 종목</span>
            <select name="sports" id="sports" class="select-box" onchange="categoryChange(this)" required>
                <option>===선택해주세요===</option>
                <option value="tennis">테니스</option>
                <option value="gym">헬스/요가/필라테스</option>
                <option value="golf">골프</option>
                <option value="hike">등산</option>
                <option value="swim">수영</option>
                <option value="balls">축구/야구/농구</option>
            </select>

            <span class="name" style="margin-left: 107px;">브랜드명</span>
            <select id="brand" name="brand" class="select-box" required>
                <option></option>
            </select>
        </div>
    </div>




    <hr class="second-hr" style="margin-bottom: 24px;">

    <p id="question">상품은 어떠셨나요?</p>
    <div class="rating">
        <input type="radio" name="rate" value="5" id="5">
        <label for="5">☆</label>

        <input type="radio" name="rate" value="4" id="4">
        <label for="4">☆</label>

        <input type="radio" name="rate" value="3" id="3">
        <label for="3">☆</label>

        <input type="radio" name="rate" value="2" id="2">
        <label for="2">☆</label>

        <input type="radio" name="rate" value="1" id="1">
        <label for="1">☆</label>
    </div>

    <hr class="second-hr" style="margin-top: 38.36px; margin-bottom: 33px;">

    <div class="center-box">
        <div id="container1" style="margin-right: 24px;">
            <p class="center-box title-text">성별</p>
            <div class="center-box" style="margin-top: 29px;">
                <input type="radio" name="gender" id="male" value="m" required>
                <label for="male" class="label-text" style="margin-right: 99px;">남</label>



                <input type="radio" name="gender" id="female" value="f">
                <label for="female" class="label-text">여</label>

            </div>

        </div>


        <div id="container2">
            <p class="center-box title-text">체형</p>
            <div class="center-box" style="margin-top: 26px;">
                <span class="box-text" style="margin-right: 22px;">키</span>
                <input class="input-box" name="height" value="${data.height}"
                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    onkeydown="return onlyNum(event)" required>
                <span class="box-text" style="margin-right: 53px;">cm</span>

                <span class="box-text" style="margin-right: 22px;">몸무게</span>
                <input class="input-box" name="weight" value="${data.weight}"
                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    onkeydown="return onlyNum(event)" required>
                <span class="box-text">kg</span>
            </div>
        </div>
    </div>

    <div class="center-box" style="margin-top: 23px;">
        <div id="container3">
            <p class="center-box title-text">운동수준</p>
            <div class="center-box" style="margin-top: 27px;">

                <input type="radio" name="level" id="beginner" value="1" required>
                <label for="beginner" class="level-text">초</label>
                <label for="beginner" style="width: 120px;" class="level-text2">이제 막 시작했어요</label>

                <input type="radio" name="level" id="intermediate" value="2">
                <label for="intermediate" class="level-text">중</label>
                <label for="intermediate" style="width: 170px;" class="level-text2">이제 조금 익숙해지고 있어요</label>

                <input type="radio" name="level" id="advanced" value="3">
                <label for="advanced" class="level-text">고</label>
                <label for="advanced" style="width: 130px;" id="level-text3">이제는 거의 고수에요</label>
            </div>
        </div>
    </div>


    <div class="center-box" style="margin-top: 62px;">
        <span class="buy-text">구매 출처</span>
        <input value="${data.source}" class="buy-box" name="source" placeholder="이 상품을 어디서 구매하셨나요? /EX: 옥션, 지마켓" required>
    </div>

    <div class="center-box" style="margin-top: 26px; margin-bottom: 33px;">
        <span class="buy-text">구매 가격</span>
        <input class="buy-box2" name="price" value="${data.price}"
            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
            onkeydown="return onlyNum(event)" placeholder="이 상품을 얼마에 구입하셨나요?" required>
        <span class="buy-text2">원</span>
    </div>

    <hr class="second-hr">

    <div style="width:930px; margin: auto;">
        <p id="review-text">솔직한 리뷰를 남겨주세요</p>
    </div>

    <div class="wrapper" style="width: 930px; margin:auto">

        <div class="center-box">
            <textarea class='textarea' name="contents" rows="5">${data.content}</textarea>
        </div>
    </div>`;

    $contentBox.insertAdjacentHTML('beforeend', resultItem);
}

/*form */
const Form = document.getElementById('writeForm');
const photos = document.querySelector('input[type="file"][multiple]');

Form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(Form);

    for (let i = 0; i < photos.files.length; i++) {
        formData.append(`img_path${i}`, photos.files[i]);
    }

    const payload = new URLSearchParams(formData);

    fetch('review/post', {
        method: 'PUT',
        body: payload,
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error('fetch에 문제가 있습니다: ', error))
});


function confirm_reset() {
    return confirm("취소 하시겠습니까?");
}

function confirm_submit() {
    let answer = confirm("등록 하시겠습니까?");
    if (answer == true) {
        alert("등록 되었습니다.");
        location.replace("#");
    }
}


function onlyNum(event) {
    event = event || window.event;
    var key = (event.which) ? event.which : event.keyCode;
    if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 8) {
        return true;
    } else {
        alert("숫자만 입력해주세요.");
        return false;
    }
}
