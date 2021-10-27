import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import IndexPage from './loggedOff/IndexPage';
import './style/header.css'
import './style/output.css'
import './style/frontVisitor.css'
import './style/headerLoggedIn.css'
import './style/profile.css';
import './style/notifications.css';
import './style/friends.css';
import './style/settings.css';
import './style/messenger.css';
import './style/support.css';
import './style/options.css';
import './style/update.css';

import Login from './auth/login';
import Register from './auth/register';
import Alert from './utils/alert';
import { AuthType } from './store/actions/auth/types';
import setAuthToken from './utils/setAuthToken';
import { loadUser  } from './store/actions/auth/auth';
import Menu from './Menu';

import menuBtn from './style/menu.png'
import IndexUser from './loggedIn/IndexUser';
import Profile from './loggedIn/profile/Profile';
import Status from './loggedIn/Status';
import Friends from './loggedIn/friends/Friends';
import Notifications from './loggedIn/Notifications';
import Settings from './loggedIn/Settings';
import NoMatch from './NoMatch';

import WebName from './style/types.png';

import photo from './style/photo.jpg'
import leftArrow from './style/icons/left-arrow2.png'
import Messenger from './loggedIn/Messenger';
import Support from './loggedIn/Support';
import Recipient from './loggedIn/profiles/Recipient';
import Header from './loggedIn/Header';
import { getFromInvite, getFromMessenger } from './store/actions/notification/notification';
import { getInvites, getSentInvites } from './store/actions/friend/invite';
import { getFriends } from './store/actions/friend/friend';
import { getConnected } from './store/actions/messenger/connection';
import io from 'socket.io-client';
import { getChat, getChats } from './store/actions/messenger/messenger';


type Props = {
  auth: AuthType,
  history: RouteComponentProps,
  loadUser: () => void
}


let socket: any;
const App = ({ loadUser, auth, history, match, messenger, recipient, getConnected, getFriends, getFromInvite, getInvites, getSentInvites, getFromMessenger, getChats, getChat }: any) => {
  
  let connection: any;

  useEffect(() => {

    if (auth.isAuthenticated) {

    
    console.log('connected now')
    socket = io("http://localhost:3000")

    connection = setInterval(() => console.log('I am running'), 10000)

    socket.emit('join', { id: auth.user._id }, () => {
        console.log('Socket client logged in')
    })

    socket.on('success', (success: any) => console.log(success))
    
    console.log('logged in')

    return () => {
      socket.disconnect()
      socket.off()
      clearInterval(connection)

      console.log('disconnected now')
  }

    }
    
}, [match.params.id, auth.isAuthenticated])

useEffect(() => {
    
  if (socket) {
    socket.on('userlist', (users: any[]) => getConnected(users))

    socket.on('welcome', (users: any[]) => getConnected(users))
    
    
    
    return () => {

        socket.on('welcome', (users: any[]) => getConnected(users))


        socket.on('userlist', (users: any[]) => getConnected(users))

    }
  }
}, [messenger.connected, auth.user])

useEffect(() => {
  if (socket) {
  socket.on('chat', (msg: any) => {
      console.log('use chat')
      
      if (recipient.recipient) {
        getChat(recipient.recipient._id)
      }
      
      getChats()
      
      getFromMessenger()
      
  })
}
}, [socket])

useEffect(() => {
  if (socket) {
  socket.on('deletemessage', (msg: any) => {
      if (match.params.id) {
        console.log('use delete message')
          
          if (recipient.recipient) {
            getChat(recipient.recipient._id)
          }


          getChats()
          getFromMessenger()
      }
      
  })
}

}, [socket])
useEffect(() => {
  if (socket) {
  socket.on('invite', (msg: any) => {
    console.log('use invite')
      getFromInvite()
      getInvites()
      getSentInvites()
  })
}
}, [socket])
useEffect(() => {
  if (socket) {
  socket.on('deleteinvite', (msg: any) => {
    console.log('use deleteinvite')
      getInvites()
      getFromInvite()
      getSentInvites()
  })
}
}, [socket])

useEffect(() => {
  if (socket) {
  socket.on('deletefriend', (msg: any) => {
    console.log('use deletefriend')
      getFriends()
      
  })
}
     
}, [socket])

useEffect(() => {
  if (socket) {
  socket.on('updateinvite', (msg: any) => {
    console.log('use updateinvite')
      getFriends()
      getFromInvite()
  })
}
     
}, [socket])

useEffect(() => {
  if (socket) {
  socket.on('updateMessage', (msg: any) => {
    console.log('use update message')
    if (recipient.recipient) {
      getChat(recipient.recipient._id)
    }  
      getChats()
      getFromMessenger()
      
      
  })
}
     
}, [socket])



  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      return loadUser();
    } 
  }, [loadUser])

  const [menu, setMenu] = useState<boolean>(false)
  const [notificationView, setNotificationView] = useState<boolean>(false)
  const [titlePage, setTitlePage] = useState('messenger')

  return (
    <Fragment>
        {
          auth.isAuthenticated ? <Fragment>
            <Header socket={socket} history={history} auth={auth} titlePage={titlePage} setTitlePage={setTitlePage} setMenu={setMenu} menu={menu} match={match} setNotificationView={setNotificationView} notificationView={notificationView} />
            
          </Fragment> : <Fragment>
            <header className="header" >
              <div className="webName">
                <Link to="/" ><img src={WebName} alt="webName" /></Link>
              </div>
              <div className="menu-button">
                
                <img src={menuBtn} alt="menu" height="45px" onClick={e=> setMenu(!menu)} />
                
              </div>
            </header>
          </Fragment>
        }
        
        
        
        <main className="output" style={ auth.isAuthenticated ? { marginTop: '0' } : { marginTop : '12vh', width: '100%' }}>
          {
            menu && <Fragment><Menu auth={auth} setMenu={setMenu} /> <div className="addshadow" onClick={e=> setMenu(false)}></div></Fragment>
          }

          {
            auth.isAuthenticated ? <Fragment>

              {
                notificationView && <Notifications notificationView={notificationView} setNotificationView={setNotificationView} socket={socket} />
              }
              {
                notificationView && <div className="addshadow" onClick={e=> setNotificationView(false)}></div>
              
              }
              <Switch>
              
              <Route exact path="/">
                <IndexUser setMenu={setMenu} menu={menu} socket={socket} />
                <Alert />
              </Route>

              <Route exact path="/status">
              
                <Status  />
                <Alert />

              </Route>

              <Route exact path="/friends">
              
                <Friends socket={socket} />
                <Alert />

              </Route>

              
              

              <Route exact path="/settings">
              
                <Settings socket={socket} />
                <Alert />

              </Route>

              <Route exact path="/profile">
                
                <Profile socket={socket} />
                <Alert />

              </Route>
              <Route exact path="/messenger/:id">
                
                <Messenger socket={socket} />
                <Alert />

              </Route>
              <Route exact path="/profile/:id">
                
                <Recipient socket={socket} />
                <Alert />

              </Route>

              <Route exact path="/support">
                
                <Support />
                <Alert />

              </Route>
              
              <Route>
                <NoMatch />
              </Route>

              </Switch>
            </Fragment> : <Fragment>
              <Switch>
              <Route exact path="/">
              
                <IndexPage />
                <Alert />

              </Route>
              <Route exact path="/sign-in">
                <Login />
                <Alert />
              </Route>
              <Route exact path="/sign-up">
                <Register />
                <Alert />
              </Route>
              
              <Route component={NoMatch} />
              
              </Switch>
            </Fragment>
          }
          
        </main>
      
    </Fragment>
  );
}
const mapStateToProps = (state: any) => ({
  alert: state.alert,
  auth: state.auth,
  messenger: state.messenger,
  notification: state.notification,
  friend: state.friend,
  recipient: state.recipient
})
export default connect(mapStateToProps, { loadUser, getConnected, getFriends, getFromInvite, getInvites, getSentInvites, getFromMessenger, getChats, getChat })(withRouter(App));