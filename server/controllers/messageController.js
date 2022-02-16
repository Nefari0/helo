module.exports = {
    // ---- messages to admin ---- //
    getUserMessages: async (req,res) => {
        const { user_id } = req.params
        const db = req.app.get('db')
        const messages = await db.messaging.get_messages_from_user([user_id])
        return res.status(200).send(messages)
    },

    createMessage: async (req,res) => {
        const { user_id, text, message_discription, send_from } = req.body
        const db = req.app.get('db')
        const message = await db.messaging.add_message([user_id,text,message_discription,send_from])
        return res.status(200).send(message)
    },

    deleteMessage: async (req,res) => {
        const { message_id,user_id } = req.body
        const db = req.app.get('db')
        const query = await db.messaging.delete_message([message_id])
        return res.status(200).send(query)
    },
    // --------------------------------- //

    // ---- site messaging system below ---- //
    getConversationByUserId: async (req,res) => {
        const { user_id } = req.params
        console.log('hit backend',user_id)
        const db = req.app.get('db')
        const conversations = await db.messaging.get_conversations_by_user_id([user_id])
        return res.status(200).send(conversations)
    },

    getConversationMessagesById: async (req,res) => {
        const { conversation_id } = req.params
        const db = req.app.get('db')
        const messages = await db.messaging.get_conversation_messages_by_id([conversation_id])
        return res.status(200).send(messages)
    },

    createNewConversation: async (req,res) => {
        const { text,id,user_id } = req.body
        const content = text
        const conversation_name = 'new conversation'
        const db = req.app.get('db')
        console.log('here is id',user_id)
        const newConversation = await db.messaging.create_new_conversation([conversation_name])
        const conversation = newConversation[0]
        const { conversation_id } = conversation
        
        const userConversationFrom = await db.messaging.create_user_conversation([id,conversation['conversation_id'],user_id])
        const fromUser = userConversationFrom[0]
        const userConversationTo = await db.messaging.create_user_conversation([user_id,conversation['conversation_id'],id])
        const toUser = userConversationTo[0]
        
        const message = await db.messaging.create_conversation_message([id,conversation['conversation_id'],text])
        return res.status(200).send(message)

    },

    sendMessage: async (req,res) => {
        const db = req.app.get('db')
        const { user_id,conversation_id,text } = req.body
        const conversation = await db.messaging.create_conversation_message([user_id,conversation_id,text])
        const info = conversation[0]
        return res.status(200).send(info)
    },

    checkExisting: async (req,res) => {
        const db = req.app.get('db')
        const { id,user_id } = req.body
        console.log('hit "checkExisting"',req.body)
        const existingMessages = await db.messaging.check_for_existing_message([id,user_id])
        const existing = existingMessages[0]
        // const user = existing['user_id']
        console.log('here is user',existingMessages[0] === undefined)
        return res.status(200).send(existingMessages[0] != undefined)
        
    }
}