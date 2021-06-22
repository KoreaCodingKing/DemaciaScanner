// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect,} from "react";
import axios from "axios";
import Loading from "../components/Loading";
import UserInsertForm from "../components/UserInsertForm";

// import InputItem from "../components/InputItem"

function ApiTest() {
  const [status, setStatus] = useState(false)
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [idList, setIdList]= useState([]);
  const [load, setLoad] = useState(false);
  const [count, setCount] = useState(0);

  let globalList = [];

  // const getUserInfo = async () => {
  //   try {
  //     // insertUser();
  //     setLoad(true);
  //     const response = await axios.get("http://localhost:3001/userinfo");
  //     Promise.resolve(response).then((getData) => {
  //       setName(getData.data[0].name);
  //       setId(getData.data[0].id);
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   setLoad(false);
  // };


  // ---------------중복제거
  // let sortFunc = summonerId.filter((item, idx, array) => {
  //   return array.indexOf(item) === idx;
  // });

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  // 인풋 값 변경 확인
  const onChangeHandle = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText("");
  };

  const insertUser = () => {
    const data = new Object({
      id: text,
    });
    axios
      .post("http://localhost:3001/insertuser", {
        id: data.id,
      })
      .then((res) => {
        if(res.data ===null) {
          setStatus(false)
          return ;
        }
        setCount(count+1)
        setStatus(true);
        let response1 = res.data.name;
        
        setIdList([
          ...idList,
          {
            index : count,
            name : response1
          }
        ]);

        
        console.log('아이디리스트',...idList)
      })
      .catch((err) => {
        setIdList([
          ...idList
        ]);
      });
    onReset();
  };

  


  if (load)
    return (
      <>
        {" "}
        로딩중...
        <Loading />
      </>
    );

  return (
    <>
      <hr />
      {/* <button onClick={getUserInfo}>정보 갱신</button> */}
      <br />
      <form className="insert_form" onSubmit={handleSubmit}>
        <UserInsertForm onInsertUser={insertUser} userValue={text} existValue={status} onChangeEvent={onChangeHandle} />
      </form>
      <br />
      <textarea value={JSON.stringify(idList)} readOnly />
      <br />
      <div className="id-list"></div>
      <br />
      아이디 : {name}
      <br />
      id : {id}
    </>
  );
}

export default ApiTest;
