import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Paperclip,
  Smile,
  Phone,
  Video,
  Info
} from 'lucide-react';
import { useStore } from '../store/useStore';

const Messages = () => {
  const { user } = useStore();
  const [selectedChat, setSelectedChat] = useState('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from API
  const conversations = [
    {
      id: '1',
      name: 'Kartik Singh',
      avatar: 'K',
      lastMessage: 'Thanks for the quick delivery! The template works perfectly.',
      timestamp: '2 min ago',
      unread: 0,
      online: true,
      type: 'support'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'S',
      lastMessage: 'When can we start the project?',
      timestamp: '1 hour ago',
      unread: 2,
      online: false,
      type: 'client'
    },
    {
      id: '3',
      name: 'Mike Chen',
      avatar: 'M',
      lastMessage: 'The API documentation looks great!',
      timestamp: '3 hours ago',
      unread: 0,
      online: true,
      type: 'client'
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Kartik Singh',
      content: 'Hi! Thanks for purchasing the React E-commerce Template. How can I help you today?',
      timestamp: '10:30 AM',
      type: 'received'
    },
    {
      id: '2',
      senderId: user?.id || '2',
      senderName: user?.name || 'You',
      content: 'Hello! I\'m having trouble with the payment integration. Could you help me set it up?',
      timestamp: '10:32 AM',
      type: 'sent'
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Kartik Singh',
      content: 'Of course! I\'ll send you a detailed guide for Stripe integration. It should be straightforward to implement.',
      timestamp: '10:35 AM',
      type: 'received'
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Kartik Singh',
      content: 'I\'ve also included some example code in the documentation folder. Let me know if you need any clarification!',
      timestamp: '10:36 AM',
      type: 'received'
    },
    {
      id: '5',
      senderId: user?.id || '2',
      senderName: user?.name || 'You',
      content: 'Perfect! That\'s exactly what I needed. Thanks for the quick response!',
      timestamp: '10:40 AM',
      type: 'sent'
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In real app, this would send the message via API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-gray-400">Communicate with clients and get support</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden"
          >
            {/* Search */}
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto flex-1">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-gray-700/50 transition-colors border-b border-gray-700/50 ${
                    selectedChat === conversation.id ? 'bg-purple-500/10 border-purple-500/50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{conversation.avatar}</span>
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                      </div>
                      <p className="text-gray-400 text-sm truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                    
                    {conversation.unread > 0 && (
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{conversation.unread}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl flex flex-col overflow-hidden"
          >
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{selectedConversation.avatar}</span>
                      </div>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{selectedConversation.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {selectedConversation.online ? 'Online' : 'Last seen 1 hour ago'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                      <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                      <Info className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.type === 'sent'
                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'sent' ? 'text-purple-100' : 'text-gray-400'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-700">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Paperclip className="h-5 w-5" />
                    </button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-gray-700 border border-gray-600 rounded-full px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Smile className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full hover:from-purple-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                  <p className="text-gray-400">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Messages;