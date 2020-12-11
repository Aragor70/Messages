import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { getChat } from '../store/actions/messenger/messenger';
import Message from './Message';
import MessagePreview from './MessagePreview';




const ChatPreview = ({ chat, user }: any) => {

   

    return (
        <Fragment>
            {
                chat && chat.messages.length > 0 ? <MessagePreview message={chat.messages[0]} chat={chat} /> : null
            }
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    messenger: state.messenger
})
export default connect(mapStateToProps, { getChat })(ChatPreview);