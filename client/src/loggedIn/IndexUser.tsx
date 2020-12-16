import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../style/messages.css'

import '../style/indexUser.css'

import photo from '../style/photo.jpg'
import { getChats } from '../store/actions/messenger/messenger';
import ChatPreview from './ChatPreview';


const IndexUser = ({ auth, setMenu, menu, history, getChats, messenger }: any) => {

    const { avatar, name, status } = auth.user
    
    useEffect(() => {
        getChats()
        return () => getChats()
    }, [getChats])

    
    
    

    return (
        <Fragment>
            <div className="messages-content">
            <div className="messages-box">
                {
                    messenger.chats ? messenger.chats.map((chat: any) => <ChatPreview key={chat._id} chat={chat} user={auth.user}  />) : null
                }
                
            </div>
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state:any) => ({
    auth: state.auth,
    messenger: state.messenger
})
export default connect(mapStateToProps, { getChats })(withRouter(IndexUser));