window.onload = function () {
	document.querySelector("#article-arrow-left").addEventListener("click", scroll_left);
	document.querySelector("#article-arrow-right").addEventListener("click", scroll_right);
	document.querySelector("#alarm-button").addEventListener("click", alarm_button_click);
	document.querySelector(".mobile-alarm-button").addEventListener("click", mobile_alarm_button_click);
	document.querySelector("#trigger").addEventListener("change", hamberger_bar_change);
	document.querySelectorAll(".nav-mobile-item > button")[0].addEventListener("click", mobile_inner_nav);
	document.querySelectorAll(".nav-mobile-item > button")[1].addEventListener("click", mobile_inner_nav);
};
let alarm_modal_display = 0;
window.onscroll = function () {
	if (alarm_modal_display == 1) {
		document.querySelector("#alarm-modal1").style.display = "none";
		document.querySelector("#alarm-modal2").style.display = "none";
		alarm_modal_display = 0;
	}
};
window.onresize = scrollX_reset;

function scroll_right() {
	const offset = document.querySelector("#recommend-container > a").offsetWidth * 4;
	document.querySelector("#recommend-container").scrollLeft += offset;
}
function scroll_left() {
	const offset = document.querySelector("#recommend-container > a").offsetWidth * 4;
	document.querySelector("#recommend-container").scrollLeft -= offset;
}
function scrollX_reset() {
	if (screen.availWidth >= 1424) {
		const container = document.querySelector("#recommend-container");
		container.style.scrollBehavior = "unset";
		container.scrollLeft = 0;
		container.style.scrollBehavior = "smooth";
	}
}
function alarm_button_click() {
	const alarm_modal1 = document.querySelector("#alarm-modal1");
	const alarm_modal2 = document.querySelector("#alarm-modal2");
	if (alarm_modal_display) {
		alarm_modal1.style.display = "none";
		alarm_modal2.style.display = "none";
		alarm_modal_display = 0;
	} else {
		alarm_modal1.style.display = "block";
		alarm_modal2.style.display = "block";
		alarm_modal_display = 1;
	}
}
function mobile_alarm_button_click() {
	const alarm_modal1 = document.querySelectorAll("#alarm-modal1")[1];
	const alarm_modal2 = document.querySelectorAll("#alarm-modal2")[1];
	if (alarm_modal_display) {
		alarm_modal1.style.display = "none";
		alarm_modal2.style.display = "none";
		alarm_modal_display = 0;
	} else {
		alarm_modal1.style.display = "block";
		alarm_modal2.style.display = "block";
		alarm_modal_display = 1;
	}
}
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
