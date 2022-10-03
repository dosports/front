
const session = require('express-session');

let setStorage = fuction(authToken, email, refreshToken){
  sessionStorage.setItem("jwt-auth-token",authToken);
  sessionStorage.setItem("email",email);
  sessionStorage.setItem("jwt-refresh-token",refreshToken);
}

function checkToken(){
          let getToken = window.localStorage.getItem('token');

          if(getToken != undefined && getToken != null){
            return getToken;
          }
          else{
            alert(getToken);
          }
}

fetch("../../templates/main/footer.html")
	.then((res) => res.text())
	.then((text) => {
		document.querySelector("footer").innerHTML = text;
	});

  //로그인
  document.querySelector(#login_btn).addEventListener("click",function(){
    setInfo("","","","");
    setStorage("", "","");
    (async () =>{
      let res = "";
      try{
        res = await axios.post("/api/user/login",{
              "email":document.querySelector("#email").value,
              "pass": document.querySelector("#pass").value
        });
        setInfo(res.data["jwt-auth-token"], res.data.exp,"로그인 성공",null);
        //refresh token 저장
        setStorage(res.data["jwt-auth-token"],res.data.user , res.data["jwt-refresh-toekn"]);
      }catch(error){
        setInfo("","","로그인 실패",error.response.data.message);
      }
    })();
  })

  //로그아웃
  document.querySelector("#log").addEventListener("click",function(){
    setInfo(null, null,"","");
    (async()=>{
      try{
        await axios.get("/api/user/logout",{
          params:{
              email: sessionStorage.getItem("email")
          }
        })
        setStorage("","","");
        setInfo("","","로그아웃 성공","")
      }catch(error){
        setInfo("","","로그아웃 실패",errir.response.data);
      }
    })();
  })

  //refresh token 요청
  async function refresh(){
    try{
      let res = await axios.post("/api/user/refresh",{
        email: sessionStorage.getItem("email"),
        refreshToken: sessionStorage.getItem("jwt-refresh-token")
      });
      console.log("조회 결과: ",res);
      alert("토큰이 갱신되었습니다.");
      setInfo(res.data.["jwt-auth-token"], res.data.exp, document.querySelector("#status").value += ">토큰 갱신");

      sessionStorage.setItem("jwt-auth-token", res.data["jwt-auth-token"])
      return true;
    }catch(error){
      console.log(error)
      if(error.response.status === 401){
        alert("refresh token까지 만료되었습니다. 다시 로그인 해주세요.")
      }
      return false;
    }
  };

  //정보 요청 및 토큰 만료, 리프레쉬
  document.querySelector(#desktop_click_search_btn, #mobile_click_search_btn).addEventListener("click",function(){
    setInfo(null, null, "","");
    (async () =>{
      let res;
      try{
        res = await axios.get("/api/info",{
          heaers: {
                "jwt-auth-token": sessionStorage.getItem("jwt-auth-token")
          }
        });
        console.log("1차 시도",res)
      }
      catch(error){
        document.querySelector("#status").value += ">정보 조회 실패"
        if(error.response.status == 401 && await refresh()){
          try{
            res = await axios.get("/api/info",{
              headers: {
                "jwt-auth-token": sessionStorage.getItem("jwt-auth-token")
              }
            });
            console.log("2차시도",res)
          }catch(error){
            console.log(error)
          }
        }
      }
      if(res){
        setInfo(null, null, document.querySelector("#status").value += ">정보 조회 성공", res.data.info)
      }
    }();
  });
