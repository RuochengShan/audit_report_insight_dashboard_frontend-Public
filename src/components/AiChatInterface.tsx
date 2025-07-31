
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessageSquare } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export function AiChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (input.trim()) {
      const userMessage: Message = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');

      // Mock AI response
      setTimeout(() => {
        const aiResponse: Message = { sender: 'ai', text: `This is a mocked AI response to your query: "${input}". In a real implementation, this would be a generated summary based on the document's content.` };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
            <MessageSquare className="mr-2 h-6 w-6 text-primary" />
            Chat with Your Documents
        </CardTitle>
        <CardDescription>
          Ask questions about the uploaded documents to get AI-powered answers.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[500px]">
        <ScrollArea className="flex-grow p-4 border rounded-md mb-4 bg-muted/20">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg px-4 py-2 text-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                  <p>{message.text}</p>
                </div>
                 {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                Start the conversation by asking a question below.
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 'Summarize the key changes in the Objective and Scope section.'"
            className="flex-grow"
          />
          <Button onClick={handleSend} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
