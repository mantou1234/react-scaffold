import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import './index.css'

export default class List extends Component {
 //初始化状态
 state ={
    users:[],//users初始化数组
    isFirst:true,//是否第一打开页面
    isLoading:false,//正在加载
    err:'',//储存错误信息
  } 

componentDidMount(){
 this.token=PubSub.subscribe('topics',(_,stateObj)=>{
    this.setState(stateObj)
 })
}

componentWillUnmount(){
    PubSub.unsubscribe(this.token)
}
    render() {
        const{users,isFirst,isLoading,err} = this.state
        return (
            <div className="row">
                {
                    isFirst ? <h2>please enter</h2> :
                    isLoading ? <h2>Loading....</h2>:
                    err ? <h2 style={{color:'red'}}>{err}</h2>:
                    users.map((userObj) => {
                        return (
                            <div key={userObj.id} className="card">
                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                    <img alt="head_portrait" src={userObj.avatar_url} style={{ width: '100px' }} />
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}
