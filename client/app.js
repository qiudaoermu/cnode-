import React from 'react' //eslint-disable-line
import ReactDOM from 'react-dom' //eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './view/App.jsx';

import { AppContainer } from 'react-hot-loader' //eslint-disable-line
// ReactDOM.hydrate(<App/>,document.getElementById('root'));

import {AppState,TopicStore} from './store/store'


import { MuiThemeProvider,createMuiTheme} from 'material-ui'
import { lightBlue,pink } from  'material-ui/colors'
import TestApi from  './view/test/api-test'
const theme =createMuiTheme({
  palette:{
    primary:pink,
    accent: lightBlue,
    type:'light'
  }
});

const initialState =   window.__INITIAL_STATE__||{}
console.log(initialState)
const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    render() {
      return <TheApp />
    }
  }
  return Main
};
const appState = new AppState();
const topicStore = new TopicStore()
const root = document.getElementById('root');
console.log(appState)
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore} >
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <Component />
            </MuiThemeProvider>
          </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  )
};

render(createApp(App));
if(module.hot){
  module.hot.accept('./view/App', () => {
    const NextApp = require('./view/App').default;
    render(createApp(NextApp))
  })
}
