import React from 'react'
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import {
  inject,
  observer,
} from 'mobx-react'
import TopicList from '../view/topic-list'
import TopicDetail from  '../view/topic-detail'
import PropTypes from 'prop-types'
import TestApi from '../view/test/api-test'
import UserInfo from '../view/user/info'
import  UserLogin from '../view/user/login'
const PrivateRoute = ({ isLogin, component: Component, ...rest }) => {
  // debugger // eslint-disable-line
  return (
    <Route
      {...rest}
      render={
        (props) => (
          isLogin ?
            <Component {...props} /> :
            <Redirect
              to={{
                pathname: '/user/login',
                search: `?from=${rest.path}`, // eslint-disable-line
              }}
            />
        )
      }
    />
  )
}
const InjectedPrivateRoute = withRouter(inject(({ appState }) => {
  return {
    isLogin: appState.user.isLogin,
  }
})(observer(PrivateRoute)));

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  isLogin: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  isLogin: false,
}

export default ()=>[
    <Route path="/" render={() => <Redirect  to="/list" />}  exact={true} key="first"/>,
    <Route path="/index" component={TopicList} exact key="index" />,
    <Route path='/list' component={TopicList} key="list" />,
    <Route path='/detail/:id' component={TopicDetail} key="detail"/>,
    <Route path="/user/login" exact component={UserLogin} key="login"/>,
    <Route path="/user/info" component={UserInfo} key="user-info" />,
]