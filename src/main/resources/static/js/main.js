window.onload = function () {
	document.querySelector("#article-arrow-left").addEventListener("click", scroll_left);
	document.querySelector("#article-arrow-right").addEventListener("click", scroll_right);
	document.querySelector("#alarm-button").addEventListener("click", alarm_button_click);
	document.querySelector("#mobile-alarm-button").addEventListener("click", mobile_alarm_button_click);
	document.querySelector("#trigger").addEventListener("change", hamberger_bar_change);
	document.querySelectorAll(".nav-mobile-item > button")[0].addEventListener("click", mobile_inner_nav);
	document.querySelectorAll(".nav-mobile-item > button")[1].addEventListener("click", mobile_inner_nav);
};
/*
 ** 스크롤할때 알람창 제거*/
window.onscroll = function () {
	if (document.querySelector("#alarm-modal1").style.display == "block") {
		document.querySelector("#alarm-modal1").style.display = "none";
		document.querySelector("#alarm-modal2").style.display = "none";
	} else if (document.querySelector("#mobile-alarm-modal1").style.display == "block") {
		document.querySelector("#mobile-alarm-modal1").style.display = "none";
		document.querySelector("#mobile-alarm-modal2").style.display = "none";
	}
};
/*
 **화면 사이즈 변경에 따른 제어*/
window.addEventListener("resize", () => {
	scrollX_reset();
	alarm_reset();
});
function scrollX_reset() {
	if (window.innerWidth >= 1424) {
		const container = document.querySelector("#recommend-container");
		container.style.scrollBehavior = "unset";
		container.scrollLeft = 0;
		container.style.scrollBehavior = "smooth";
	}
}
function alarm_reset() {
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
 **추천리뷰 스크롤 버튼에 따른 작동 제어 (데스크탑)*/
function scroll_right() {
	const offset = document.querySelector("#recommend-container > a").offsetWidth * 4;
	document.querySelector("#recommend-container").scrollLeft += offset;
}
function scroll_left() {
	const offset = document.querySelector("#recommend-container > a").offsetWidth * 4;
	document.querySelector("#recommend-container").scrollLeft -= offset;
}
/*
 **알람창 제어*/
function open_alarm_modal(alarm_modal1, alarm_modal2) {
	alarm_modal1.style.display = "block";
	alarm_modal2.style.display = "block";
}
function close_alarm_modal(alarm_modal1, alarm_modal2) {
	alarm_modal1.style.display = "none";
	alarm_modal2.style.display = "none";
}
function alarm_button_click() {
	const alarm_modal1 = document.querySelector("#alarm-modal1");
	const alarm_modal2 = document.querySelector("#alarm-modal2");
	if (alarm_modal1.style.display == "block") close_alarm_modal(alarm_modal1, alarm_modal2);
	else open_alarm_modal(alarm_modal1, alarm_modal2);
}
function mobile_alarm_button_click() {
	const alarm_modal1 = document.querySelector("#mobile-alarm-modal1");
	const alarm_modal2 = document.querySelector("#mobile-alarm-modal2");
	if (alarm_modal1.style.display == "block") close_alarm_modal(alarm_modal1, alarm_modal2);
	else open_alarm_modal(alarm_modal1, alarm_modal2);
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

/*
 ** API */
