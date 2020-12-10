import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { getChat } from '../store/actions/messenger/messenger';
import Message from './Message';




const Chat = ({ id, getChat, messenger, user, match }: any) => {

    useEffect(() => {
        return getChat(match.params.id)
    }, [getChat, match.params.id])

    const { date, messages, users } = messenger.chat;
    
    

    return (
        <Fragment>
            <div className="messages-box">
                {
                    messages && messages.map((msg: any) => <Message key={msg._id} message={msg} users={users} />)
                }
                <div className="message message-recipient">
                            
                    <div className="msg-field">
                        <div className="msg-head"><span>time</span> <span>*</span></div>
                        <div className="text">A start-up in Manchester have just received a huge amount of investment to scale-up their platform and we're looking for the industries top tier talent to drive their product forward!</div>
                    
                    </div>
                    <div className="options">
                        <button >options</button>
                    </div>
                </div>

                <div className="message message-user">
                    
                    <div className="msg-field">
                        <div className="msg-head"><span>time</span> <span>*</span></div>
                        <div className="text">A start-up in Manchester have just received a huge amount of investment to scale-up their platform and we're looking for the industries top tier talent to drive their product forward!</div>
                    
                    </div>
                    <div className="options">
                        <button >options</button>
                    </div>
                </div>
                <div className="message message-recipient">
                    
                    <div className="msg-field">
                        <div className="msg-head"><span>time</span> <span>*</span></div>
                        <div className="text">A start-up in Manchester have just received a huge amount of investment to scale-up their platform and we're looking for the industries top tier talent to drive their product forward!</div>
                    
                    </div>
                    <div className="options">
                        <button >options</button>
                    </div>
                </div>
            </div>

                    <div className="write-box">
                    <div className="write-header">hi</div>
                    <div className="write-input">
                        <input type="text" />
                        <button>Ok</button>
                    </div>
                </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    messenger: state.messenger
})
export default connect(mapStateToProps, { getChat })(Chat);