import { useRef, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, FileText, MessageSquare, Bot, User } from "lucide-react";

const AdminUpload = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { 
      role: "assistant", 
      content: "Olá! Sou o assistente de programação para iniciantes. Posso ajudar com conceitos básicos, exercícios e tirar dúvidas sobre Python, JavaScript e fundamentos da programação. Como posso ajudar você hoje?" 
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const nextMessages: { role: "user" | "assistant"; content: string }[] = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("groq-chat", {
        body: { 
          messages: [
            { 
              role: "system", 
              content: "Você é um instrutor de programação especializado em ensinar iniciantes. Foque em Python e JavaScript. Seja didático, use exemplos práticos e linguagem clara. Sempre incentive o aprendizado gradual." 
            },
            ...nextMessages
          ]
        },
      });

      if (error) throw error;

      const reply = (data as any)?.message || "Desculpe, não consegui processar sua mensagem.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e: any) {
      console.error(e);
      toast.error("Falha ao conversar com o agente.");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Ops! Tive um problema técnico. Tente novamente em alguns segundos." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() =>
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
      , 50);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <MainLayout userRole="admin" title="Upload de Materiais">
      <SEO 
        title="Upload de Materiais - Admin" 
        description="Gerencie materiais de aprendizado e teste o assistente de programação"
      />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 rounded-lg p-6 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Gerenciamento de Materiais 📚
          </h2>
          <p className="text-muted-foreground">
            Faça upload de materiais e teste o assistente de programação para iniciantes
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Section */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload de Materiais
              </CardTitle>
              <CardDescription>
                Envie PDFs, documentos e materiais de programação para iniciantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <input 
                  type="file" 
                  accept="application/pdf,.doc,.docx,.txt" 
                  multiple 
                  className="w-full mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  Arraste arquivos aqui ou clique para selecionar
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Suporte: PDF, DOC, DOCX, TXT
                </p>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Configuração Necessária
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Configure o Supabase Storage para ativar o upload de materiais. 
                      Os arquivos serão indexados automaticamente para o assistente IA.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button disabled className="w-full bg-gradient-to-r from-primary to-accent">
                <Upload className="w-4 h-4 mr-2" />
                Fazer Upload (Em breve)
              </Button>
            </CardContent>
          </Card>

          {/* Chat Test Section */}
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Teste do Assistente IA
              </CardTitle>
              <CardDescription>
                Instrutor de programação para iniciantes
                <Badge variant="secondary" className="ml-2">
                  <Bot className="w-3 h-3 mr-1" />
                  Groq AI
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                ref={listRef} 
                className="h-80 overflow-auto rounded-lg border border-border p-4 bg-muted/30"
              >
                {messages.map((m, idx) => (
                  <div key={idx} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
                    <div className="flex items-start gap-2 max-w-[85%] mx-auto">
                      {m.role === "assistant" && (
                        <div className="w-6 h-6 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      
                      <div className={`
                        rounded-lg px-4 py-2 max-w-full
                        ${m.role === "user" 
                          ? "bg-primary text-primary-foreground ml-auto" 
                          : "bg-card border border-border text-card-foreground"
                        }
                      `}>
                        <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                      </div>
                      
                      {m.role === "user" && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="text-left mb-4">
                    <div className="flex items-start gap-2 max-w-[85%] mx-auto">
                      <div className="w-6 h-6 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-card border border-border rounded-lg px-4 py-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Textarea
                  placeholder="Teste o assistente: 'Como criar minha primeira variável em Python?' ou 'Explique o que são loops'"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  rows={3}
                  className="resize-none"
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    Ctrl/⌘ + Enter para enviar
                  </p>
                  <Button 
                    onClick={sendMessage} 
                    disabled={loading || !input.trim()}
                    className="bg-gradient-to-r from-accent to-primary"
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminUpload;
