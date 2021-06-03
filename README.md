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
````

# style - scss
````
src/assets/scss/*.scss로 사용
````

# Riot API
````
소환사의 상태를 알기 위해선 특정 소환사의 id 값이 필요함.
아래 request를 이용해 "id"="value" value값을 얻는다.
/lol/summoner/v4/summoners/by-name/{summonerName}

얻은 value를 아래 request를 태우면 특정 소환사의 게임중인 정보를 얻을 수 있다
/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}
````

