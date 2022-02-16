import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input, Typography } from 'antd'
import axios from 'axios';
import 'antd/dist/antd.css'

const { Search } = Input

const client = new W3CWebSocket('ws://127.0.0.1:9000');
// const client = new W3CWebSocket('8000');

class Socket extends Component {
    constructor(){
        super();

        this.state = {
            userName:'Nefari0',
            msgText:'',
            isLoggedIn:true,
            // isloggedIn:false,
            messages:[],
            fromD:[],
            user_id:12,
            conversation_id:72,
            thread:[],
        }
        // this.handleText = this.handleText.bind(this)
        // this.logInUser = this.logInUser.bind(this)
        // this.onButtonClick = this.onButtonClick.bind(this)
        // this.logInUser = this.logInUser.bind(this)
        this.executeSendMessage = this.executeSendMessage.bind(this)
        // this.openMessage = this.openMessage.bind(this)
        // this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }
//   componentWillMount() {
//     client.onopen = () => {
//       console.log('WebSocket Client Connected');
//     };
//     client.onmessage = (message) => {
//       console.log(message);
//     };
//   }

  // componentWillMount() {
    componentDidMount() {
    this.openMessage()

      const contentDefaultMessage = "default message as string"
    client.onopen = () => {
     console.log('WebSocket Client Connected');
    };

      client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply',dataFromServer)
      if (dataFromServer.type === 'message') {
        this.setState((State) =>
        ({messages:[...this.state.messages,
        // ({thread:[...this.state.messages,
        {
          msg: dataFromServer.msg,
          user:dataFromServer.user
        }]

      }))
        // this.setState({messages:dataFromServer.msg})
        // this.setState({thread:dataFromServer.msg})
        console.log('is messaged')
      }
      }
    // client.onmessage = (message) => {
    //   const dataFromServer = JSON.parse(message.data);
    //   const stateToChange = {};
    //   if (dataFromServer.type === "userevent") {
    //     stateToChange.currentUsers = Object.values(dataFromServer.data.users);
    //   } else if (dataFromServer.type === "contentchange") {
    //     stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage;
    //   }
    //   stateToChange.userActivity = dataFromServer.data.userActivity;
    //   this.setState({
    //     ...stateToChange
    //   });
    // };
  }

  executeSendMessage = async () => {
    // const { msgText } = this.state
    const { user_id,conversation_id,msgText } = this.state
    const text = msgText
    console.log('hit execute',msgText,conversation_id,user_id)

    axios.post('/api/conversation/user/new',{conversation_id,user_id,text})
    // this.onButtonClick(text)
    // this.openMessage(conversation_id)
}

  // onEditorStateChange = (text) => {
    onButtonClick = (text) => {
      const { messages } = this.state

      // console.log('hit onEditorStateChange',client)
    // client.send(JSON.stringify({type: "message",msg:text,user:this.state.userName}))
    client.send(JSON.stringify({type: "message",msg:text,user:this.state.userName}))
    this.executeSendMessage()
   };

  openMessage = () => {
    const { conversation_id } = this.state
    axios.get(`/api/conversation/messages/get/${conversation_id}`).then(res => {
        this.setState({
            thread:res.data,
            conversation_id:conversation_id,
            openContacts:false
        })
    })
 }

  handleText = (prop,val) => {
      this.setState({[prop]:val})
  }

  logInUser = () => {
      console.log('hit login functions')
    // const username = this.username.value;
    const { username } = this.state
    if (username.trim()) {
      const data = {
        username
      };
      this.setState({
        ...data
      }, () => {
        client.send(JSON.stringify({
          ...data,
          type: "userevent"
        }));
      });
    }
  }

  logUser = () => {
    this.setState({
      isLoggedIn:true
    })
  }


  
  
  render() {
    const { fromD,thread,msgText } = this.state
    const mappedMessages = this.state.messages.map(msg => {
      return(<p>{msg.msg}</p>)
    })
    const mappedUserMessages = thread.map(el => {
      return <div key={el.message_id} ><p style={{color:'#555'}} >{el.content}</p></div>
    })
    return (
      <div className='main'>
        Practical Intro To WebSockets.
        {!this.state.isLoggedIn ?
        <div>
        {/* <button onClick={() => this.onButtonClick("hello from socket")} style={{height:'40px',width:'40px'}} ></button> */}
        {/* <button onClick={() => this.executeSendMessage()} style={{height:'40px',width:'40px'}} ></button> */}
        <button onClick={() => this.onButtonClick()} style={{height:'40px',width:'40px'}} ></button>
        {/* {mappedMessages} */}
        {/* {this.state.message.map(msg =>  <p>{msg:msg}</p>)} */}
        </div>
        :
        // <input onChange={e => this.onEditorStateChange(e.target.value)} ></input>
        <div style={{ padding:'200px 40px'}}>
          {mappedUserMessages}
          {mappedMessages}
          <input type='text' onChange={e => this.handleText('msgText',e.target.value)}></input>
          {/* <button onClick={() => this.logUser("hello from socket")} style={{height:'40px',width:'40px'}} ></button> */}
          <button onClick={() => this.onButtonClick(msgText)} style={{height:'40px',width:'40px'}} ></button>

          {/* <Search
          placeholder='Enter UserName'
          enterButton="Login"
          size='large'
          onSearch={value => this.setState({isLoggedIn:true,userName:value})}
          /> */}

        </div>
      }
        {/* <button onClick={() => this.logInUser()} style={{height:'40px',width:'40px'}} ></button> */}
      </div>
    );
  }
}

export default Socket;