import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { getChat } from '../store/actions/messenger/messenger';

import MessagePreview from './MessagePreview';




const ChatPreview = ({ chat }: any) => {

   

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