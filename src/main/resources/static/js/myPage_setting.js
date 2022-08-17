import {getReviewDetail, getMyReviewIdx, pageUpEventHandler, beforePageBtnHandler, sports_img, sports_level}  from "./myPage_modules.js";
beforePageBtnHandler();

// 페이지 로드되면, 프로필 사진, 사용자명, TODO: 키, 몸무게는 나오도록
// axios.get(`${url}/user/info/${userIdx}`)
// .then(response => {
//     let userInfo = response.data.data;
//     $user_name_input = document.querySelector('#user_name');
//     $user_name_input.placeholder = userInfo.name;
//     $profile_img = document.querySelector('.profile_img');
//     $profile_img.src = userInfo.profileImg;
// });

// 비밀번호 변경
function passwd_check(pw){
    let pattern1 = /[0-9]/;
    let pattern2 = /[a-zA-Z]/;
    let pattern3 = /[~!@\#$%<>^&*]/; 

    if(!pattern1.test(pw) || !pattern2.test(pw) || !pattern3.test(pw) || pw.length < 8){
        return "영문 + 숫자 + 특수기호 8자리 이상으로 구성해야합니다.";
    }

    let err_str = "";
    let SamePass_0 = 0;
    let SamePass_1 = 0;
    let SamePass_2 = 0;

    for(let i = 0; i < pw.length; i++){
        let err_str = "";
        let chr_pass_0;
        let chr_pass_1;
        let chr_pass_2;

        if(i >= 2){
            chr_pass_0 = pw.charCodeAt(i-2);
            chr_pass_1 = pw.charCodeAt(i-1);
            chr_pass_2 = pw.charCodeAt(i);

            if((chr_pass_0 == chr_pass_1) && (chr_pass_1 == chr_pass_2)){
                SamePass_0 ++;
            }

            if((chr_pass_0 - chr_pass_1 == 1) && (chr_pass_1 - chr_pass_2 == 1)){
                SamePass_1 ++;
            }

            if((chr_pass_0 - chr_pass_1 == -1) && (chr_pass_1 - chr_pass_2 == -1)){
                SamePass_2 ++;
            } 
        }
    }

    if(SamePass_0 != 0){
        err_str += '동일문자를 3자 이상 연속 입력할 수 없습니다.' + '\n';
    }
    if(SamePass_1 !=0 || SamePass_2 !=0){
        err_str += '영문, 숫자는 3자 이상 연속되게 입력할 수 없습니다.';
    }

    return err_str;
}

function change_password(event){
    const passwd = event.target.current_password.value;
    const newPasswd = event.target.new_password.value;
    const checkNewPasswd = event.target.new_check_password.value;

    const $password_err = document.querySelector('.password_err');
    if (passwd === "" || newPasswd === "" || checkNewPasswd === ""){
        $password_err.innerText = "입력되지 않은 칸이 있습니다.";
        return
    }
    // TODO:현재 비밀번호가 맞는지
    // 새 비밀번호가 형식에 맞는지
    let err_str = passwd_check(newPasswd);
    if(err_str){
        $password_err.innerText = err_str;
        return
    }

    // 새 비밀번호와 새 비밀번호 확인이 맞는지
    if(newPasswd !== checkNewPasswd){
        $password_err.innerText = '비밀번호가 일치하지 않습니다.';
        return
    }
    

    axios.patch(`${url}/user/password/${userIdx}`, {
        "passwd": passwd,
		"newPasswd": newPasswd,
		"checkNewPasswd": checkNewPasswd
    })
    .then(response => console.log(response.data));
}

function change_user_setting(event){
    event.preventDefault(); // submit 이벤트 중지
    change_password(event);
}

document.querySelector('.user_setting_form').addEventListener('submit', change_user_setting);

// user filter setting 변경
function change_filter_setting(event){
    event.preventDefault(); // submit 이벤트 중지
    const user_height = event.target.user_height.value;
    const user_weight = event.target.user_weight.value;
    const $filter_err = document.querySelector('.filter_err');

    let check = /^[0-9]+$/; 
    if (user_height === "" || user_weight === "" ){
        $filter_err.innerText = "키와 몸무게를 입력해주세요.";
        return
    }else if (!check.test(user_height) || !check.test(user_weight)) {    
        $filter_err.innerText = "숫자만 입력 가능합니다.";
        return
    }
    $filter_err.innerText = "";
    axios.patch(`${url}/user/info/${userIdx}`, {
        "userIdx": userIdx,
		"height": user_height,
		"weight": user_weight,
    })
    .then(response => console.log(response));
}

document.querySelector('.filter_setting_form').addEventListener('submit', change_filter_setting);

// 프로필 이미지 
let pre_img = "";
const $profile_img = document.querySelector('.profile_img');
if(pre_img == ""){
    pre_img = '../../static/img/logo_white.png';
}
$profile_img.src = pre_img;
// 이전 페이지로
const $before_btn = document.querySelector('.before_btn');
const $myPage_setting_header_title = document.querySelector('#myPage_setting_header_title');

$before_btn.addEventListener("click", () => {
    history.back();
})
$myPage_setting_header_title.addEventListener("click", () => {
    history.back();
})


// 화면 작은 사이즈 일때 title 나오고 커지면 안나오게 설정 필요함
function header_windowSize(){
    const $before_btn_container = document.querySelector('.before_btn_container');
    const $myPage_setting_header_title = document.querySelector('.myPage_setting_header_title');
    
    if(window.innerWidth > 800){ /* TODO: 여기 px은 모바일 버전 크기로 변경 필요 */ 
        if($before_btn_container.classList.contains('hidden')){
            $before_btn_container.classList.remove('hidden');
        }
        if(!$myPage_setting_header_title.classList.contains('hidden')){
            $myPage_setting_header_title.classList.add('hidden');
        }
    }else{
        if($myPage_setting_header_title.classList.contains('hidden')){
            $myPage_setting_header_title.classList.remove('hidden');
        }
        if(!$before_btn_container.classList.contains('hidden')){
            $before_btn_container.classList.add('hidden');
        }
    }
}

window.addEventListener('resize', header_windowSize);
window.addEventListener('load', header_windowSize);