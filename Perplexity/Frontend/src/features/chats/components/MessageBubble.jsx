import React from 'react'
import ReactMarkdown from 'react-markdown'

export const MessageBubble = ({ message, role }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
          role === 'user'
            ? 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 rounded-b-sm'
            : 'bg-black/40 max-w-full backdrop-blur-lg border border-[#00FFC2]/30 hover:border-[#00FFC2]/50 shadow-lg shadow-[#00FFC2]/10 hover:shadow-[#00FFC2]/20'
        }`}
      >
        {role === 'user' ? (
          <p className="text-sm text-white leading-relaxed">
            {message}
          </p>
        ) : (
          <div className="text-sm text-white leading-relaxed markdown-content">
            <ReactMarkdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-base font-bold text-[#00FFC2] mt-3 mb-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-sm font-bold text-white mt-2 mb-1" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                li: ({node, ...props}) => <li className="text-sm" {...props} />,
                p: ({node, ...props}) => <p className="my-1" {...props} />,
                strong: ({node, ...props}) => <strong className="text-[#00FFC2]" {...props} />,
                em: ({node, ...props}) => <em className="text-gray-300" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline ? (
                    <code className="bg-white/10 px-2 py-1 rounded text-[#00FFC2] text-xs" {...props} />
                  ) : (
                    <code className="block bg-white/10 p-2 rounded my-2 text-xs overflow-x-auto" {...props} />
                  ),
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
