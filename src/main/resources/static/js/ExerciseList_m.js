const $balls = document.getElementById("baseball-count");
const $golf = document.getElementById("golf-count");
const $hike = document.getElementById("hiking-count");
const $swim = document.getElementById("swim-count");
const $tennis = document.getElementById("tennis-count");
const $gym = document.getElementById("gym-count");


/*공 */
function ballsFetch() {
	fetch('/review/m/balls', {
		method: 'GET',
	})
		.then((response) => response.json())
		.then((ball) => {
			const result = Object.keys(ball).length;
			ballsTemplate(result);
		})
		.catch(error => console.log('balls fetch에 문제가 있습니다: ', error))
}

ballsFetch();

function ballsTemplate(data) {
	const dataResult = `
	<p class="circleText2">(${data})</p>
`;
	$balls.insertAdjacentHTML('beforeend', dataResult);
}

/*골프 */
function golfFetch() {
	fetch('/review/m/golf', {
		method: 'GET',
	})
		.then((response) => response.json())
		.then((golf) => {
			const result = Object.keys(golf).length;
			golfTemplate(result);
		})
		.catch(error => console.log('golf fetch에 문제가 있습니다: ', error))
}

golfFetch();

function golfTemplate(data) {
	const dataResult = `
	<p class="circleText2">(${data})</p>
`;
	$golf.insertAdjacentHTML('beforeend', dataResult);
}

/*등산 */
function hikeFetch() {
	fetch('/review/m/hike', {
		method: 'GET',
	})
		.then((response) => response.json())
		.then((hike) => {
			const result = Object.keys(hike).length;
			hikeTemplate(result);
		})
		.catch(error => console.log('hike fetch에 문제가 있습니다: ', error))
}

hikeFetch();

function hikeTemplate(data) {
	const dataResult = `
	<p class="circleText2">(${data})</p>
`;
	$hike.insertAdjacentHTML('beforeend', dataResult);
}


/*수영 */
function swimFetch() {
	fetch('/review/m/swim', {
		method: 'GET',
	})
		.then((response) => response.json())
		.then((swim) => {
			const result = Object.keys(swim).length;
			swimTemplate(result);
		})
		.catch(error => console.log('swim fetch에 문제가 있습니다: ', error))
}

swimFetch();

function swimTemplate(data) {
	const dataResult = `
	<p class="circleText2">(${data})</p>
`;
	$swim.insertAdjacentHTML('beforeend', dataResult);
}

/*테니스 */
function tennisFetch() {
	fetch('/review/m/tennis', {
		method: 'GET',
	})
		.then((response) => response.json())
		.then((tennis) => {
			/*test용 
			console.log(tennis);  */
			const result = Object.keys(tennis).length;
			tennisTemplate(result);
		})
		.catch(error => console.log('tennis fetch에 문제가 있습니다: ', error))
}

tennisFetch();

function tennisTemplate(data) {
	const dataResult = `
        <p class="circleText2">(${data})</p>
`;
	$tennis.insertAdjacentHTML('beforeend', dataResult);
}

/*헬스,필테,요가 */
function gymFetch() {
	fetch('/review/m/gym', {
		method: 'GET',
	})
		.then((response) => response.json())
		.then((gym) => {
			const result = Object.keys(gym).length;
			gymTemplate(result);
		})
		.catch(error => console.log('gym fetch에 문제가 있습니다: ', error))
}

gymFetch();

function gymTemplate(data) {
	const dataResult = `
	<p class="circleText2">(${data})</p>
`;
	$gym.insertAdjacentHTML('beforeend', dataResult);
}

