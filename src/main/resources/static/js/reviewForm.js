

/*프리뷰
function setThumbnail(event) {
	for (var image of event.target.files) {
	  var reader = new FileReader();

	  reader.onload = function(event) {
		var img = document.createElement("img");
		img.setAttribute("src", event.target.result);
		document.querySelector("div#image_container").appendChild(img);
	  };

	  console.log(image);
	  reader.readAsDataURL(image);
	}
  }

*/
/*이미지 삭제 관련 */
const handler = {
	init() {
		const fileInput = document.querySelector('#file');
		const preview = document.querySelector('#preview');
		fileInput.addEventListener('change', () => {
			console.dir(fileInput)
			const files = Array.from(fileInput.files)
			files.forEach(file => {
				preview.innerHTML += `
											<p style="margin-left: 5px" id="${file.lastModified}">
												${file.name}
												<button data-index='${file.lastModified}' class='file-remove'>X</button>
											</p>`;
			});
		});
	},

	removeFile: () => {
		document.addEventListener('click', (e) => {
			if (e.target.className !== 'file-remove') return;
			const removeTargetId = e.target.dataset.index;
			const removeTarget = document.getElementById(removeTargetId);
			const files = document.querySelector('#file').files;
			const dataTranster = new DataTransfer();

			// document.querySelector('#file-input').files =
			//             Array.from(files).filter(file => file.lastModified !== removeTarget);


			Array.from(files)
				.filter(file => file.lastModified != removeTargetId)
				.forEach(file => {
					dataTranster.items.add(file);
				});

			document.querySelector('#file').files = dataTranster.files;

			removeTarget.remove();
		})
	}
}

handler.init()
handler.removeFile()


/*category */


function categoryChange(e) {
	var tennis = ["나이키", "라코스테", "스포티앤리치", "아디다스", "휠라"];
	var gym = ["나이키", "뉴발란스", "데상트", "아디다스", "언더아머", "프로스펙스"];
	var yoga = ["나이키", "룰루레몬", "뮬라웨어", "아디다스", "안다르", "젝시믹스"];
	var golf = ["PXG", "나이키", "아디다스", "제이 린드버그", "캘러웨이", "타이틀리스트", "파리게이츠"];
	var hiking = ["K2", "노스페이스", "몽벨", "블랙야크", "아이더", "코오롱스포츠", "파타고니아"];
	var swimming = ["랠리", "아레나", "에어워크", "엘르", "토네이도", "후그"];
	var balls = ["나이키", "아디다스", "푸마", "프로스펙스"];


	var target = document.getElementById("brand");

	if (e.value == "tennis") var d = tennis;
	else if (e.value == "gym") var d = gym;
	else if (e.value == "yoga") var d = yoga;
	else if (e.value == "golf") var d = golf;
	else if (e.value == "hike") var d = hiking;
	else if (e.value == "swim") var d = swimming;
	else if (e.value == "balls") var d = balls;


	target.options.length = 0;

	for (x in d) {
		var opt = document.createElement("option");
		opt.value = d[x];
		opt.innerHTML = d[x];
		target.appendChild(opt);
	}
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

	fetch('https://example.com/posts', {
		method: 'POST',
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


/*placeholder설정 */
var textarea = document.querySelector('.textarea');
var placeholder = document.querySelector('.placeholder');

textarea.addEventListener('focus', () => {
	placeholder.classList.add('hidden');
});

textarea.addEventListener('blur', () => {
	if (textarea.value === '') {
		placeholder.classList.remove('hidden');
	}
});

