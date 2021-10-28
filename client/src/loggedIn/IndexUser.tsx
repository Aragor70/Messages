import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../style/messages.css'

import '../style/indexUser.css'

import { getChats } from '../store/actions/messenger/messenger';
import ChatPreview from './ChatPreview';
import { deleteSocketMessage, getConnected, getSocketMessage } from '../store/actions/messenger/connection';
import { getInvites } from '../store/actions/friend/invite';
import { getFromInvite, getFromMessenger } from '../store/actions/notification/notification';
import { getFriends } from '../store/actions/friend/friend';


const IndexUser = ({ auth, getChats, messenger }: any) => {

    
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
export default connect(mapStateToProps, { getChats, getConnected, deleteSocketMessage, getSocketMessage, getInvites, getFromInvite, getFromMessenger, getFriends })(withRouter(IndexUser));