/**
 * 페이지 로드
 */
import { header_onload, header_onscroll, alarm_reset } from "./header.js";

/**
 * 헤더 푸터 fetch
 */
fetch("../../templates/main/footer.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector("footer").innerHTML = text;
	});
await fetch("../../templates/main/main_header.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector("header").innerHTML = text;
		console.log(2);
	});
if (screen1080 < 1080) {
	const best_reviews = document.querySelectorAll("#best-container > a");
	best_reviews[6].style.display = "none";
	best_reviews[7].style.display = "none";
}
main_onload();
header_onload();
window.addEventListener("scroll", header_onscroll);
window.addEventListener("resize", scrollX_reset);
window.addEventListener("resize", alarm_reset);
window.addEventListener("resize", set_review_count);
