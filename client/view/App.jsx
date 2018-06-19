import React from 'react'

import Route from '../config/router'
import {
  Link
} from 'react-router-dom'
import cookie from 'react-cookies'
import MainAppbar from './layout/app-bar'
import PropTypes from 'prop-types'


export default class App extends React.Component{
  static contextTypes = {
    router: PropTypes.object,
  };
  componentDidMount(){
    // let userId = cookie.loadAll().userId
    // console.log(userId)
    // if(userId){
    //   return this.props.appState.login(userId.userId)
    //     .then(msg => {
    //       cookie.save('userId', msg.accessToken, { path: '/' });
    //       this.context.router.history.replace('/user/info')
    //     }).catch((error)=>{
    //       console.log(error)
    //     })
    // }
    // console.log('App.jsx')
  }
  render(){
    return (<div>
      <MainAppbar/>,
      <Route key="routers"/>
    </div>)
  }
}


