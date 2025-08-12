import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminUpload = () => {
  return (
    <div className="min-h-screen container py-10">
      <SEO title="Upload de PDFs — Admin" description="Envie materiais para o agente Groq." />
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
          <Button variant="hero" disabled>Enviar (aguardando Supabase)</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUpload;
