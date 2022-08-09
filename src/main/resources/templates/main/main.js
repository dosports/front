window.onload = function () {
	document.querySelector("#article-arrow-left").onclick = scroll_left;
	document.querySelector("#article-arrow-right").onclick = scroll_right;
	document.querySelector("#alarm-button").onclick = alarm_button_click;
};
window.onresize = scrollX_reset;

function scroll_right() {
	let offset = document.querySelector("#recommend-container > a").offsetWidth * 4;
	document.querySelector("#recommend-container").scrollLeft += offset;
}
function scroll_left() {
	let offset = document.querySelector("#recommend-container > a").offsetWidth * 4;
	document.querySelector("#recommend-container").scrollLeft -= offset;
}
function scrollX_reset() {
	if (screen.availWidth >= 1424) {
		let container = document.querySelector("#recommend-container");
		container.style.scrollBehavior = "unset";
		container.scrollLeft = 0;
		container.style.scrollBehavior = "smooth";
	}
}
let alarm_modal_display = 0;
function alarm_button_click() {
	let alarm_modal1 = document.querySelector("#alarm-modal1");
	let alarm_modal2 = document.querySelector("#alarm-modal2");
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
