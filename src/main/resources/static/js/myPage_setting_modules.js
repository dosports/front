export {check_newPW, change_user_setting, header_windowSize, change_filter_setting, show_all_userData };
import {getUserInfo} from "./myPage_modules.js";
// import {userInfo_noPostman} from "./myPage_data.js";

const logo_white_imgName = "logo_white";
const userIdx = getUserInfo();
axios.defaults.baseURL = ""; // TODO: axios 기본 url
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
// DOM
const $change_profileImg = document.querySelector("#change_profileImg");
const $user_name = document.querySelector("#user_name");
const $user_height = document.querySelector("#user_height");
const $user_weight = document.querySelector("#user_weight");
const $profile_img_container = document.querySelector(".profile_img_container");
const $profile_img = document.querySelector(".profile_img");

// 모든 사용자 데이터 받아와서 보여주기
function show_all_userData() {
	const userInfo = getUserInfo();
	// const userInfo = userInfo_noPostman;
	$profile_img_container.classList.add("skeleton");
	$profile_img.classList.add("hidden");
	setTimeout(() => {
		$profile_img_container.classList.remove("skeleton");
		$profile_img.classList.remove("hidden");
	}, 2000);
	$profile_img.src = userInfo.profileImg;
	$profile_img.src = userInfo.profileImg == "" ? `../../static/img/${logo_white_imgName}.png` : userInfo.profileImg;
	$user_name.placeholder = userInfo.name;
	$user_height.placeholder = parseInt(userInfo.height);
	$user_weight.placeholder = userInfo.weight;
}

// ******** 사용자 이미지
// 사용자 이미지 파일 선택 err msg, 제대로 선택된 경우 true 반환
export function check_profileImg() {
	// 파일 확장자 .jpg, .jpeg, .png인 경우에만 axios 실행
	const fileVal = $change_profileImg.files[0].name;
	const fileType = fileVal.slice(fileVal.indexOf(".") + 1).toLowerCase();
	if (["jpg", "jpeg", "png"].includes(fileType)) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL($change_profileImg.files[0]);

		fileReader.onload = function () {
			document.querySelector(".profile_img").src = fileReader.result;
		};
		return true;
	} else {
		document.querySelector(".profileImg_err").innerText = "이미지 파일은 jpg, jpeg, png 형식만" + "\n" + "등록 가능합니다.";
		return false;
	}
}

// 사용자 이미지 변경
async function change_ProfileImg_data() {
	let formData = new FormData();
	formData.append("file", $change_profileImg.files[0]);
	return axios
		.post(`/user/profileImg`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data.success);
}

// ******** 비밀번호 관련
const $current_password = document.querySelector("#current_password");
const $new_password = document.querySelector("#new_password");
const $new_check_password = document.querySelector("#new_check_password");

// 비밀번호 변경
function passwd_format_check(pw) {
	let pattern1 = /[0-9]/;
	let pattern2 = /[a-zA-Z]/;
	let pattern3 = /[~!@\#$%<>^&*]/;

	if (!pattern1.test(pw) || !pattern2.test(pw) || !pattern3.test(pw) || pw.length < 8) {
		return "영문 + 숫자 + 특수기호(~!@\\#$%<>^&*)" + "\n" + "8자리 이상으로 구성해야합니다.";
	}

	let err_str = "";
	let SamePass_0 = 0;
	let SamePass_1 = 0;
	let SamePass_2 = 0;

	for (let i = 0; i < pw.length; i++) {
		let err_str = "";
		let chr_pass_0;
		let chr_pass_1;
		let chr_pass_2;

		if (i >= 2) {
			chr_pass_0 = pw.charCodeAt(i - 2);
			chr_pass_1 = pw.charCodeAt(i - 1);
			chr_pass_2 = pw.charCodeAt(i);

			if (chr_pass_0 == chr_pass_1 && chr_pass_1 == chr_pass_2) {
				SamePass_0++;
			}

			if (chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1) {
				SamePass_1++;
			}

			if (chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1) {
				SamePass_2++;
			}
		}
	}

	if (SamePass_0 != 0) {
		err_str += "동일문자를 3자 이상 연속 입력할 수 없습니다." + "\n";
	}
	if (SamePass_1 != 0 || SamePass_2 != 0) {
		err_str += "영문, 숫자는 3자 이상 연속되게 입력할 수 없습니다." + "\n" + "(EX. 123, abc 불가)";
	}

	return err_str;
}

// 새 비밀번호 체크
function check_newPW() {
	const newPasswd = $new_password.value;
	const checkNewPasswd = $new_check_password.value;
	if ($current_password.value == "" && newPasswd == "" && checkNewPasswd == "") {
		return false;
	}

	const $newPassword_err = document.querySelector(".newPassword_err");
	$newPassword_err.innerText = " ";

	if (newPasswd == "" && checkNewPasswd == "") {
		$newPassword_err.innerText = "입력되지 않은 칸이 있습니다.";
		return false;
	}

	// 새 비밀번호가 형식에 맞는지
	let err_str = passwd_format_check(newPasswd);
	if (err_str) {
		$newPassword_err.innerText = err_str;
		return false;
	}

	if (checkNewPasswd === "") {
		$newPassword_err.innerText = "입력되지 않은 칸이 있습니다.";
		return false;
	}

	// 새 비밀번호와 새 비밀번호 확인이 맞는지
	if (newPasswd !== checkNewPasswd) {
		$newPassword_err.innerText = "비밀번호가 일치하지 않습니다.";
		return false;
	}
	return true;
}

// 비밀 번호 변경
function change_password_name_data() {
	// 비밀번호 모두 올바른 경우에만 axios 실행될 수 있도록
	const username = $user_name.value == "" ? $user_name.placeholder : $user_name.value;
	return axios
		.patch(`/user/mypage`, {
			name: username,
			passwd: $current_password.value,
			checkNewPasswd: $new_password.value,
		})
		.then((response) => response.data.data.isPWChanged);
}

// ******** 사용자 설정 버튼 클릭시 eventHandler 함수
async function change_user_setting(event) {
	event.preventDefault(); // submit 이벤트 중지
	console.log(check_newPW());
	// 사용자명, 비번 변경
	if (check_newPW()) {
		const result = await change_password_name_data();
		if (result) {
			await swal("Success!", "사용자 정보가 성공적으로 수정되었습니다.", "success");
		} else {
			await swal({
				icon: "error",
				title: "Oops...",
				text: "잘못된 비밀번호 입력으로 비밀번호가 변경되지 않았습니다.",
			});
		}

		// 프로필 사진 변경
		if ($change_profileImg.files.length != 0) {
			const result = await change_ProfileImg_data();
			if (result) {
				await swal("Success!", "사용자 정보가 성공적으로 수정되었습니다.", "success");
			} else {
				await swal({
					icon: "error",
					title: "Oops...",
					text: "사용자 정보 수정에 실패하였습니다.",
				});
			}
		}
	} else if ($change_profileImg.files.length != 0) {
		const result = await change_ProfileImg_data();
		if (result) {
			await swal("Success!", "사용자 정보가 성공적으로 수정되었습니다.", "success");
		} else {
			await swal({
				icon: "error",
				title: "Oops...",
				text: "사용자 정보 수정에 실패하였습니다.",
			});
		}
	} else if ($user_name.value != "") {
		const result = await change_password_name_data();
		if (result) {
			await swal("Success!", "사용자 정보가 성공적으로 수정되었습니다.", "success");
		} else {
			await swal({
				icon: "error",
				title: "Oops...",
				text: "사용자 정보 수정에 실패하였습니다.",
			});
		}
	} else {
		await swal({
			icon: "error",
			title: "Oops...",
			text: "수정하려는 정보를 입력해주세요.",
		});
	}

	location.reload();
}

// -------------------  user filter setting 변경 -----------------------------
export function check_weight_height() {
	const user_height = $user_height.value;
	const user_weight = $user_weight.value;
	const $filter_err = document.querySelector(".filter_err");
	$filter_err.innerText = "";

	let check = /^[0-9]+$/;
	if (user_height === "" || user_weight === "") {
		$filter_err.innerText = "키와 몸무게를 입력해주세요.";
		return false;
	} else if (!check.test(user_height) || !check.test(user_weight)) {
		$filter_err.innerText = "0이상의 정수형 숫자만 입력 가능합니다.";
		return false;
	}

	return true;
}

// FIXME: 아직 작성 안함
async function change_filter_setting(event) {
	event.preventDefault(); // submit 이벤트 중지
	if (check_weight_height()) {
		// 제대로된 데이터 입력시에만 작동
		const user_height = event.target.user_height.value;
		const user_weight = event.target.user_weight.value;

		const result = await axios
			.patch(`/user/info`, {
				height: user_height,
				weight: user_weight,
			})
			.then((response) => response.data.data.isChanged);

		if (result) {
			await swal("Success!", "사용자 정보가 성공적으로 수정되었습니다.", "success");
		} else {
			await swal({
				icon: "error",
				title: "Oops...",
				text: "사용자 정보 수정에 실패하였습니다.",
			});
		}
	} else {
		await swal({
			icon: "error",
			title: "Oops...",
			text: "사용자 정보 수정에 실패하였습니다.",
		});
	}

	location.reload();
}

// -------------------  화면 크기별, main 내부 header 변경

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

