import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios'

export default class Search extends Component {
  search = () => {


    // 获取用户输入
    const { keyWordElement: { value: keyWord } } = this//解构赋值连续写法+重命名keyword
    // 发送请求前通知list更新状态
    // this.props.updateAppState({isFirst:false,isLoading:true})
    PubSub.publish('topics', { isFirst: false, isLoading: true })
    // 发送网络请求
    axios.get('/api1/search/users2?q=${keyWord}').then(
      response => {
        //     请求成功后通知list更新状态
        //    this.props.updateAppState({isLoading:false,users:response.data.items})
        PubSub.publish('topics', { isLoading: false, users: response.data.items })
      },
      error => {
        PubSub.publish('topics', { isLoading: false, users: response.data.items })
        //     请求失败后通知APP更新状态
        //     this.props.updateAppState({isLoading:false,err:error.message})
        PubSub.publish('topics', { isLoading: false, err: error.message })
      }
    )
  }
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={c => this.keyWordElement = c} type="text" placeholder="enter the name you search" />&nbsp;
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}
