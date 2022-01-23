import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';


export default class App extends Component {

  //初始化状态
  state ={
    users:[],//users初始化数组
    isFirst:true,//是否第一打开页面
    isLoading:false,//正在加载
    err:'',//储存错误信息
  } 

  //更新app的state
  updateAppState = (stateObj) =>{
     this.setState({stateObj})
  }
  render() {
    
    return (
      <div className="container">
       <Search updateAppState={this.updateAppState}/>
        <List {...this.state}/>
      </div>
    )

  }
}
