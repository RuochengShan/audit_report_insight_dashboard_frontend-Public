
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageSquare, Loader2, AlertTriangle } from 'lucide-react';
import { getSimilaritySummaryAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface AiChatInterfaceProps {
    clientFileContent: string;
    qaFileContent: string;
}

export function AiChatInterface({ clientFileContent, qaFileContent }: AiChatInterfaceProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage: Message = { sender: 'user', text: input };
      setMessages(prev => [...prev, userMessage]);
      const currentInput = input;
      setInput('');
      setIsLoading(true);
      setError(null);

      try {
        const result = await getSimilaritySummaryAction(
          clientFileContent,
          qaFileContent,
          currentInput
        );
        const aiResponse: Message = { sender: 'ai', text: result.answer };
        setMessages(prev => [...prev, aiResponse]);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Error Getting AI Response",
          description: errorMessage,
        });
        // Remove the user message if the API call fails
        setMessages(prev => prev.slice(0, prev.length -1));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  React.useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);


  return (
    <Card className="shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
            <MessageSquare className="mr-2 h-6 w-6 text-primary" />
            Chat with Your Documents
        </CardTitle>
        <CardDescription>
          Ask questions about the uploaded documents to get AI-powered answers.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow h-[400px]">
        <ScrollArea className="flex-grow p-4 border rounded-md mb-4 bg-muted/20" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg px-4 py-2 text-sm max-w-[85%] whitespace-pre-wrap ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
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
             {isLoading && (
                 <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 text-sm bg-background flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
             )}
          </div>
        </ScrollArea>
        { error && <p className="text-sm text-destructive mb-2 text-center">{error}</p> }
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 'Summarize the key changes.'"
            className="flex-grow"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
