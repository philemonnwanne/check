import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { useState } from "react"
import { ChatSidebar } from "@/components/lawyer-dashboard/communications/ChatSidebar"
import { TeamsLikeChat } from "@/components/lawyer-dashboard/communications/TeamsLikeChat"
import { GroupChat, ChatMessage } from "@/types/chat"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockChats: GroupChat[] = [
  {
    id: "1",
    name: "Smith vs. Johnson Case",
    caseId: "case-1",
    participants: [
      {
        id: "lawyer-1",
        name: "Sarah Parker",
        role: "lawyer",
        email: "sarah.parker@lawfirm.com"
      },
      {
        id: "client-1",
        name: "John Smith",
        role: "client",
        email: "john.smith@email.com"
      }
    ],
    createdAt: new Date(),
    lastMessage: {
      content: "Latest update on the case documents",
      sender: "Sarah Parker",
      timestamp: new Date()
    }
  },
  {
    id: "2",
    name: "Estate Planning Team",
    caseId: "case-2",
    participants: [
      {
        id: "lawyer-1",
        name: "Sarah Parker",
        role: "lawyer",
        email: "sarah.parker@lawfirm.com"
      },
      {
        id: "client-2",
        name: "Robert Brown",
        role: "client",
        email: "robert.brown@email.com"
      }
    ],
    createdAt: new Date(),
    lastMessage: {
      content: "Meeting scheduled for tomorrow",
      sender: "Robert Brown",
      timestamp: new Date()
    }
  }
]

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Hello, I've reviewed the latest documents",
    senderId: "lawyer-1",
    senderName: "Sarah Parker",
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: "2",
    content: "Thank you for the update. When can we schedule a meeting?",
    senderId: "client-1",
    senderName: "John Smith",
    timestamp: new Date(Date.now() - 1800000)
  }
]

export default function LawyerCommunications() {
  const [selectedChat, setSelectedChat] = useState<GroupChat>()
  const { toast } = useToast()

  const handleSendMessage = (content: string) => {
    // In a real app, this would send the message to the backend
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    })
  }

  const handleCreateGroup = (name: string, participants: ChatParticipant[]) => {
    // In a real app, this would create a new group chat
    toast({
      title: "Group created",
      description: "New group chat has been created successfully.",
    })
  }

  const handleInviteParticipants = (chatId: string, participants: ChatParticipant[]) => {
    // In a real app, this would invite new participants to the group
    toast({
      title: "Invitations sent",
      description: "Invitations have been sent to the selected participants.",
    })
  }

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <ChatSidebar
              chats={mockChats}
              selectedChat={selectedChat}
              onSelectChat={setSelectedChat}
            />
          </div>
          <div className="col-span-9">
            <TeamsLikeChat
              selectedChat={selectedChat}
              messages={mockMessages}
              onSendMessage={handleSendMessage}
              onCreateGroup={handleCreateGroup}
              onInviteParticipants={handleInviteParticipants}
            />
          </div>
        </div>
      </div>
    </LawyerDashboardLayout>
  )
}