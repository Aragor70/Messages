import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';

import '../style/messages.css'
import photo from '../style/photo.jpg'
import Options from './reusable/Options';
import leftArrow from '../style/icons/left-arrow2.png'
import auth from '../store/reducers/auth';
import { getChat, getChats, getMessenger } from '../store/actions/messenger/messenger';
import Chat from './Chat';
import Message from './Message';

const Messenger = ({ auth, getChats, getChat, messenger, match }: any) => {

    const [msgNavOpt, setMsgNavOpt] = useState(false)
    const [editMode, setEditMode] = useState(false)


    useEffect(() => {
        return getChat(match.params.id)
    }, [getChat, match.params.id])

    console.log(messenger)
    console.log(match.params.id)
    
    return (
        <Fragment>
            <div className="messenger-content">
                <div className="messenger-header">
                    {
                        editMode ? <Fragment>
                            <div className="editMode">
                                <span><img src={leftArrow} onClick={e=> setEditMode(!editMode)} className="img35" /></span><span>quote</span><span>like</span><span>copy</span><span>delete</span>
                            </div>
                        </Fragment> : <Fragment>
                            <div className="avatar"><img src={photo} height="35px" width="35px" /></div><div className="messenger-recipient"><span>Bambino : </span><span className="status" >Offline</span></div>
                            <div className="options"><button onClick={e=> setMsgNavOpt(true)}>options</button></div>
                        </Fragment>
                    }
                    
                </div>
                {
                    msgNavOpt && <Fragment>

                        <Options recipient="Dymy" user={auth.user} msgNavOpt={msgNavOpt} setMsgNavOpt={setMsgNavOpt} />

                    </Fragment>
                }
                <hr />
                {
                    messenger.chat && messenger.chat.messages && messenger.chat.messages.map((msg: any) => <Message key={msg._id} message={msg} />)
                }
                
                
                
                
                
                
                {
                    //messenger.chats ? messenger.chats.map((id: string) => <Chat key={id} id={id} user={auth.user} setEditMod={setEditMode} editMode={editMode} />) : null
                }
                
                
                
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth,
    messenger: state.messenger
})
export default connect(mapStateToProps, { getChats, getChat })(withRouter(Messenger));