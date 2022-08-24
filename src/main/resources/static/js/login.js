
function checkToken(){
          let getToken = window.localStorage.getItem('token');

          if(getToken != undefined && getToken != null){
            return getToken;
          }
          else{
            alert(getToken);
          }
}

async loginToken (state, val) {
    await axios.post(process.env.BACKEND_URL+'/api/users/login', val).then(
      (res) => {
        localStorage.setItem('accessToken', res.data.data.accessToken)
        localStorage.setItem('refreshToken', res.data.data.refreshToken)
        localStorage.setItem('expiredTime', res.data.data.cur_time)
        axios.defaults.headers.common['x-access-token'] = res.data.data.accessToken
      },
      (err) => { console.log("error",error);
      }
    )
  }
async setToken (state) {
    // HEADER에 토큰 설정
    axios.defaults.headers.common['x-access-token'] =  localStorage.getItem('accessToken')
    // 만료시간이 지났을 경우, RefreshToken을 이용하여 AccessToken 재발급
    var expiredTime = await this.$moment.utc(localStorage.getItem('expiredTime'))
    var diffTime = await this.$moment.duration(expiredTime.diff(this.$moment()))
    if (diffTime < 10000){
        axios.defaults.headers.common['x-refresh-token'] = localStorage.getItem('refreshToken')
        await axios.get(process.env.BACKEND_URL+'/api/users/reissue').then(
          (res) => {
            localStorage.setItem('accessToken', res.data.data.accessToken)
            localStorage.setItem('expiredTime', res.data.data.cur_time)
            axios.defaults.headers.common['x-access-token'] =  localStorage.getItem('accessToken')
          },
          (err) => {
          }
        ) 
    }
    return new Promise(function(resolve, reject) {
        resolve(true)
    });
  }

fetch("../../templates/main/footer.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector("footer").innerHTML = text;
	});