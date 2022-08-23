import {beforePageBtnHandler}  from "./myPage_modules.js";
import {check_newPW, change_user_setting, header_windowSize, change_filter_setting, check_weight_height, show_all_userData, check_profileImg } from "./myPage_setting_modules.js";
// import {userInfo_noPostman} from "./myPage_data.js";
import {header_onload, header_onscroll, alarm_reset} from "./header.js";


window.addEventListener('load', () => {
    header_windowSize();
})
// 화면 크기별 헤더 불러오기
window.addEventListener('resize', header_windowSize);

// 이전 버튼 클릭시
beforePageBtnHandler();

// -------------------  user setting 변경
// DOM
const $change_profileImg = document.querySelector('#change_profileImg');
const $current_password = document.querySelector('#current_password');
const $new_password = document.querySelector('#new_password');
const $new_check_password = document.querySelector('#new_check_password');

// 로드 되면 모든 데이터 불러오기
window.addEventListener('load', () => {
    show_all_userData();
});

// 비번 ERR MSG
$new_password.addEventListener('keyup', check_newPW);
$new_check_password.addEventListener('keyup', check_newPW);

// 사용자 버튼 클릭 submit
document.querySelector('.user_setting_form').addEventListener('submit', change_user_setting);

// 사용자 프로필 변경 서버로 데이터 보내기 전에 확인 
$change_profileImg.addEventListener('change', check_profileImg);

// -------------------  user filter setting 변경
// DOM
const $user_height = document.querySelector('#user_height');
const $user_weight = document.querySelector('#user_weight');

// 키, 몸무게 ERR MSG
$user_height.addEventListener('keyup', check_weight_height);
$user_weight.addEventListener('keyup', check_weight_height);

// 필터 버튼 클릭 submit
document.querySelector('.filter_setting_form').addEventListener('submit', change_filter_setting);

await fetch("../../templates/main/main_header.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector(".default_header").innerHTML = text;
});
header_onload();
window.onscroll = header_onscroll;
window.addEventListener("resize", alarm_reset);