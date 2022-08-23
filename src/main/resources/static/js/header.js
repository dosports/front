export function header_onload() {
	document.querySelector("#alarm-button").addEventListener("click", alarm_button_click);
	document.querySelector("#mobile-alarm-button").addEventListener("click", mobile_alarm_button_click);
	document.querySelector("#trigger").addEventListener("change", hamberger_bar_change);
	document.querySelectorAll(".nav-mobile-item > button")[0].addEventListener("click", mobile_inner_nav);
	document.querySelectorAll(".nav-mobile-item > button")[1].addEventListener("click", mobile_inner_nav);
	document.querySelector("#search-button").addEventListener("click", desktop_click_search_btn);
	document.querySelector("#mobile-search-button").addEventListener("click", mobile_click_search_btn);
}
/** 스크롤할때 알람창 제거*/
export function header_onscroll() {
	if (document.querySelector("#alarm-modal1").style.display == "block") {
		document.querySelector("#alarm-modal1").style.display = "none";
		document.querySelector("#alarm-modal2").style.display = "none";
	} else if (document.querySelector("#mobile-alarm-modal1").style.display == "block") {
		document.querySelector("#mobile-alarm-modal1").style.display = "none";
		document.querySelector("#mobile-alarm-modal2").style.display = "none";
	}
}
/**화면 사이즈 변경에 따른 제어*/
export function alarm_reset() {
	if (document.querySelector("#alarm-modal1").style.display == "block") {
		if (window.innerWidth <= 1080) {
			open_alarm_modal(document.querySelector("#mobile-alarm-modal1"), document.querySelector("#mobile-alarm-modal2"));
			close_alarm_modal(document.querySelector("#alarm-modal1"), document.querySelector("#alarm-modal2"));
		}
	} else if (document.querySelector("#mobile-alarm-modal1").style.display == "block") {
		if (window.innerWidth > 1080) {
			open_alarm_modal(document.querySelector("#alarm-modal1"), document.querySelector("#alarm-modal2"));
			close_alarm_modal(document.querySelector("#mobile-alarm-modal1"), document.querySelector("#mobile-alarm-modal2"));
		}
	}
}
/*
 **알람창 제어*/
function open_alarm_modal(alarm_modal1, alarm_modal2) {
	alarm_modal1.style.display = "block";
	alarm_modal2.style.display = "block";
}
function close_alarm_modal(alarm_modal1, alarm_modal2) {
	remove_alarm();
	alarm_modal1.style.display = "none";
	alarm_modal2.style.display = "none";
}
function alarm_button_click() {
	const alarm_modal1 = document.querySelector("#alarm-modal1");
	const alarm_modal2 = document.querySelector("#alarm-modal2");
	if (alarm_modal1.style.display == "block") close_alarm_modal(alarm_modal1, alarm_modal2);
	else open_alarm_modal(alarm_modal1, alarm_modal2);
	if (checkToken() == null) {
		document.querySelector("#alarm-container").display = "none";
		document.querySelector("#logOut_alarm").display = "block";
	} else {
		getAlarm();
		document.querySelector("#logOut_alarm").display = "none";
		document.querySelector("#alarm-container").display = "block";
	}
}
function mobile_alarm_button_click() {
	getAlarm();
	const alarm_modal1 = document.querySelector("#mobile-alarm-modal1");
	const alarm_modal2 = document.querySelector("#mobile-alarm-modal2");
	if (alarm_modal1.style.display == "block") close_alarm_modal(alarm_modal1, alarm_modal2);
	else open_alarm_modal(alarm_modal1, alarm_modal2);
}
function remove_alarm() {
	const alarm_container = document.querySelectorAll("#alarm-container");
	alarm_container[0].innerHTML = "";
	alarm_container[1].innerHTML = "";
}
/*
 **모바일버전 햄버거바 제어*/
let hamberger_bar_visible = false;
function hamberger_bar_change() {
	const dimd = document.querySelector(".dimd");
	const nav_mobile = document.querySelector("#nav-mobile");
	if (hamberger_bar_visible) {
		document.querySelector("body").setAttribute("class", "");
		dimd.setAttribute("id", "dimd-off");
		hamberger_bar_visible = false;
	} else {
		document.querySelector("body").setAttribute("class", "not_scroll");
		dimd.setAttribute("id", "dimd-on");
		hamberger_bar_visible = true;
		document.querySelector("#dimd-on").addEventListener("click", remove_hamberger);
	}
}
function mobile_inner_nav(e) {
	let inner_nav = document.querySelectorAll(".nav-mobile-inner_nav");
	inner_nav[0].style.display = "none";
	inner_nav[1].style.display = "none";
	if (e.target.innerText == "남성") {
		inner_nav[0].style.display = "block";
	} else {
		inner_nav[1].style.display = "block";
	}
}
function remove_hamberger(e) {
	const hambergerbar_width = document.querySelector("#nav-mobile").offsetWidth;
	if (e.offsetX > hambergerbar_width) {
		hamberger_bar_change();
		document.querySelector("#trigger").checked = false;
	}
}
/**
 * 검색버튼
 */
function desktop_click_search_btn() {
	const input = document.querySelector("#search-input");
	search(input.value);
	input.value = "";
}
function mobile_click_search_btn() {
	const input = document.querySelector("#mobile-search-input");
	search(input.value);
	input.value = "";
}
/**
 * API
 */
/* 알람 fetch */
function checkToken() {
	const token = localStorage.getItem("token");
	return token;
}
var myHeaders = new Headers();
async function getAlarm() {
	myHeaders.append("Authorization", checkToken());
	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};
	const alarm_items_info = await fetch("/notify", requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log("error", error));
	const alarm_container = document.querySelectorAll("#alarm-container");
	for (let i = 0; i < alarm_items_info.length; i++) {
		const addElement = document.createElement("div");
		addElement.setAttribute("class", "alarm-item");
		addElement.innerHTML = alarm_items_info[i].notifyType == 0 ? alarm_container_comment(alarm_items_info[i]) : alarm_container_like(alarm_items_info[i]);
		addElement.innerHTML = alarm_container(alarm_items_info[i]);
		alarm_container[0].addElement(addElement);
		alarm_container[1].addElement(addElement);
	}
}
function alarm_container_like(alarm_info) {
	return `
				<a href="#review/${alarm_info.reviewIdx}">
					<div class="alarm-item-title">새로운 좋아요가 달렸습니다.</div>
					<div class="alarm-item-date">${alarm_info.regDate}</div>
				</a>
			`;
}
function alarm_container_comment(alarm_info) {
	return `
				<a href="#review/${alarm_info.reviewIdx}">
					<div class="alarm-item-title">새로운 댓글이 달렸습니다.</div>
					<div class="alarm-item-content">${alarm_info.content}</div>
					<div class="alarm-item-date">${alarm_info.regDate}</div>
				</a>
			`;
}
/*검색*/
function search(keyword) {
	var requestOptions = {
		method: "POST",
		redirect: "follow",
	};

	fetch(`/search?keyword=${keyword}`, requestOptions)
		.then((response) => console.log(response))
		.catch((error) => console.log("error", error));
}
