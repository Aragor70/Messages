import React, { Fragment, useEffect } from "react"



const MessageInvite = ({recipient, acceptInvite, deleteInvite, match, socket, message, updateInvite}: any) => {

    useEffect(() => {
        updateInvite(message._id, { seen: true }, socket)
    }, [updateInvite])

    return (
        <Fragment>
            <div className="invite-msg">
                <h1>{recipient.recipient.name} sent you invite.</h1>
                <span>{message.text}</span>
                <div className="options">
                    <button onClick={e=> acceptInvite(match.params._id, {accepted: true}, socket)}>accept</button>
                    <button onClick={e=> deleteInvite(match.params._id, socket)}>deny</button>
                </div>
            </div>
        </Fragment>
    );
}
export default MessageInvite;