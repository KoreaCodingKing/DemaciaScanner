# DemaciaScanner
we will find all villains


# Use Stack
1. React
2. React-Router
3. axios
4. scss
5. styledComponent
6. dotenv
7. firebase
8. node - 12.13.0
9. Riot API


# Dev setting

````
 Node - 12.13.0
 react - 17.0.2
 react-router-dom - ^5.2.0
 dotenv - ^10.0.0
 axios - ^0.21.1,
 node-sass - ^6.0.0
````


# dotenv 
````
1. .env파일 생성
2. .env에 REACT_APP_TEST_API=TEST123TEST123 삽입
3. 사용할 페이지에 아래와 같이 작성
   - import dotenv from 'dotenv';
   - {process.env.REACT_APP_TEST_API}
   
4. server에서 사용시, const dotenv = require("dotenv").config(); 
   위와 같이 사용하였다.
````

# style - scss
````
src/assets/scss/*.scss로 사용
````

# axios
```
참고용)
axios는 fetch와 달리, .then(res=> res.json())
.json()해줄 필요가 없는것 같음.

그래서 .then(res=> res.data)로 불러옴

````

# CORS Error 
````
중요)
open API의 경우 CROS 정책 오류가 많이 발생함.
Riot api의 경우, 프론트(웹)에서 요청해서 그랬음

참고내용) https://hello-bryan.tistory.com/121
1. express서버에서 Riot api에게 값 요청
2. 해당 값을 받아 서버에서 endPoint 지정
3. 프론트에서 해당 값을 useEffect()로 받아옴
(!). 여기서도 승인되지 않은 도메인으로부터 값을 받는 요청이기 때문에 CROS 정책 오류뜸.
     해당 이슈는 yarn add cros로 일단 해결.
     
(추가) CORS 미들웨어를 사용하여 app.use(cors())로 지정할 경우, 외부의 모든 origin을 허용하게됨.
좋지 않은 방법임(보안 이슈)

일부 origin을 사용하고 싶다면 https://github.com/KoreaCodingKing/DemaciaScanner.git을 참고


CORS 이슈 참고)
https://devport.tistory.com/13

````

# Riot API
````
작업 프로세스)
소환사의 상태를 알기 위해선 특정 소환사의 id 값이 필요함.
아래 request를 이용해 "id"="value" value값을 얻는다.
/lol/summoner/v4/summoners/by-name/{summonerName}

얻은 value를 아래 request를 태우면 특정 소환사의 게임중인 정보를 얻을 수 있다
/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}
````

# Riot API - 소환사 검색 이슈
````
한글ID의 소환사의 경우 별도의 인코딩이 필요함.(테스트 결과, 띄어쓰기는 별 상관이 없다)
encodeURI("한글소환사명")사용.

참고)
https://jamesdreaming.tistory.com/2


따라서, 실행 프로세스에 소환사의 이름이 한글인지, 그렇지 않은지 부터 확인하여야 한다.
테스트 결과 - encodeURI()내부에 한글, 영서 숫자가 들어가도 알아서 함. (로직 불필요) 

예시) 소환사의 이름이 한글이라면, 변환(인코딩 function)로직 추가, 그렇지 않다면 다음 로직 진행 - 필요 없어보임


한글이 있는지 찾는 정규식 참고)
https://eblee-repo.tistory.com/40


중복된 아이디 제거
참고) http://megaton111.cafe24.com/2018/06/18/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4-%EC%A4%91%EB%B3%B5-%EC%9A%94%EC%86%8C-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0/
````

# 로그인 후, 데이터 추가
````
동작 프로세스)
로그인 -> 데이터 추가 페이지 -> 입력 -> 저장

UX)
input에 아이디를 입력, 엔터치면 다음 input활성화 반복

````



# 에러 해결 방법
````20210710
리스트의 형태로 api서버에 보낼때.

1. 클라이언트에서 하나씩 보내지 말고, 리스트 형태로 서버에 넘기고 서버에서 분기처리 해야함(비중이 큰 작업은 서버에서).
2. map.(index=> setTimeOut(()=> console.log(index), 1000)) 해당 map함수는 1초마다 setTimeOut이 실행되겠다고 생각하지만,
해당 결과는 {1,1,1,1....} 비동기 처리 안에서 map 함수의 속도보다 index의 값이 변경되는 속도가 느리기 때문임(정확히는, 클로저 개념이 필요 -->
참고)https://webisfree.com/2015-07-07/[%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8]-%ED%81%B4%EB%A1%9C%EC%A0%80%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-settimeout%EC%9D%84-%EC%8B%A4%ED%96%89%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
3. map + setTimeout을 이용해 클라이언트로 부터 받은 리스트값을 axios를 통해 api와 통신함 거기서 받은 값을 Promise를 사용해 아래와 같이 값을 얻는다.
.then(res=>console.log(res)
.catch(err=>console.log(err)

(!)여기서 기존과 같이 then()과 catch() 각각에 'return {name : name, status : status}' 를 사용하여 클라이언트로 넘기면 아래와 같은 이슈가 생김
'cannot set headers after they are sent to the client.'

위 이슈는 서버에서 클라이언트로 값(resolve or reject)을 보냈으나 다시한번 값을 보내려하여 발생함(response 중복)


하여 나의 경우 아래 방법을 사용함.
.then(res=>console.log(res)
.catch(err=>console.log(err)
.finally(()=>console.log('끝'))


then()과 catch()에서 받은 값을 임시 리스트에 저장하고 그 값을 finally때 return res.json(tempList)로 보내는 형태다.

여기서 finally()에 if문을 사용하여 리스트.map((item, index))의 총 item 갯수와 index의 값이 같아지면 위 임시리스트(tempList)를 최종적으로 반환 하는 형태를 사용했다.
````
