import { useRef, useState } from "react";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminUpload = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Olá! Envie uma pergunta para testar o agente Groq." },
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
        body: { messages: nextMessages },
      });

      if (error) throw error;

      const reply = (data as any)?.message || "Sem resposta.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e: any) {
      console.error(e);
      toast.error("Falha ao conversar com o agente.");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Ops! Não consegui responder agora." },
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
    <div className="min-h-screen container py-10">
      <SEO title="Upload de PDFs — Admin" description="Envie materiais para o agente Groq." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Enviar livros em PDF</CardTitle>
            <CardDescription>
              Esta é uma área de demonstração. A conexão com o Supabase Storage é necessária para efetivar o upload.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input type="file" accept="application/pdf" multiple className="w-full" />
            <div className="text-sm text-muted-foreground">
              Após conectar o Supabase, os PDFs serão enviados ao Storage e indexados para o Groq.
            </div>
            <Button variant="hero" disabled>
              Enviar (aguardando Supabase)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat com o Agente Groq</CardTitle>
            <CardDescription>Teste rápido via Edge Function segura.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div ref={listRef} className="h-64 overflow-auto rounded-md border p-3 bg-background">
              {messages.map((m, idx) => (
                <div key={idx} className={m.role === "user" ? "text-right mb-2" : "text-left mb-2"}>
                  <div className={m.role === "user" ? "inline-block rounded-md px-3 py-2 bg-primary/10" : "inline-block rounded-md px-3 py-2 bg-muted"}>
                    <span className={m.role === "user" ? "text-primary" : ""}>{m.content}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Digite sua mensagem... (Ctrl/⌘+Enter para enviar)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={3}
              />
              <div className="flex justify-end">
                <Button variant="hero" onClick={sendMessage} disabled={loading}>
                  {loading ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUpload;
