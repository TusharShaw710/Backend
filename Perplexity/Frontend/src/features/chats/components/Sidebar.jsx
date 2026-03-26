import React from 'react'
import { Plus,Folder } from 'lucide-react'
import { UserProfile } from './UserProfile'
import { useSelector } from 'react-redux'
import useChat from '../hooks/useChat';


export const Sidebar = () => {
    const chats=useSelector((state)=>state.chat.chats);
    const {openChat}=useChat();
    const recentClusters=Object.values(chats)
        .sort((a,b)=>new Date(b.lastUpdated)-new Date(a.lastUpdated))
        .slice(0,5);
    console.log(recentClusters);

  return (
    <div className="w-64 bg-black backdrop-blur-xl border-r border-white/10 flex flex-col h-screen">
      {/* Top Section - Logo & New Chat */}
      <div className="p-6 border-b border-white/10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-black to-[#3D5AFE] flex items-center justify-center">
            <span className="text-sm font-bold text-black">⚡</span>
          </div>
          <span className="text-lg font-bold bg-[#00FFC2] bg-clip-text text-transparent">
            CyberFlux Interface
          </span>
        </div>

        {/* New Chat Button */}
        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-linear-to-r from-[#00FFC2] to-[#3D5AFE] text-black font-semibold text-sm hover:shadow-lg hover:shadow-[#00FFC2]/50 transition-all duration-300 group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          New Chat
        </button>
      </div>

      {/* Middle Section - Spacer */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Recent Clusters Heading */}
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                Recent Clusters
            </h3>
            
            {/* Cluster Items */}
            <div className="space-y-2">
                {recentClusters.map((cluster) => (
                  <div key={cluster.id} onClick={()=>{openChat(cluster.id,chats)}} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer bg-transparent hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-200 group">
                    <Folder size={16} className="group-hover:text-[#00FFC2] transition-colors duration-200" />
                    <span  className="text-sm font-medium">{cluster.title}</span>
                  </div>
                ))}
            </div>
    </div>

      {/* Bottom Section - User Profile */}
      <UserProfile />
    </div>
  )
}
