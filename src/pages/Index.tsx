import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const Index = () => {
  const navigate = useNavigate();
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x, y });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const startAs = (role: "aluno" | "admin") => {
    localStorage.setItem("role", role);
    localStorage.setItem("sessionStart", Date.now().toString());
    navigate("/dashboard");
  };

  return (
    <div ref={ref} className="min-h-screen bg-background">
      <SEO
        title="Grok Guardian Learning — Aulas online com Groq"
        description="Plataforma de estudo com IA Groq. Autenticação e progresso via Supabase."
      />
      <header className="container py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-md bg-primary" aria-hidden />
          <span className="font-semibold">Grok Guardian Learning</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#recursos" className="hover:underline">Recursos</a>
          <a href="#como-funciona" className="hover:underline">Como funciona</a>
          <Button variant="subtle" onClick={() => startAs("aluno")}>Entrar demo</Button>
        </nav>
      </header>

      <main
        className="relative overflow-hidden"
        style={{
          background:
            `radial-gradient(800px 400px at ${pos.x}% ${pos.y}%, hsl(var(--accent)/0.5), transparent 60%)`,
          transition: "var(--transition-smooth)",
        } as React.CSSProperties}
      >
        <section className="container py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Estude sem distrações com um agente Groq focado na sua matéria
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Autenticação, evolução e materiais no Supabase. O agente responde apenas ao tema estudado e mantém memória por 1 hora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" onClick={() => startAs("aluno")}>Entrar como Aluno de Demonstração</Button>
            <Button variant="outline" size="lg" onClick={() => startAs("admin")}>Entrar como Admin de Demonstração</Button>
          </div>
        </section>

        <section id="recursos" className="container py-16 grid md:grid-cols-3 gap-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Memória de 1 hora</h3>
            <p className="text-muted-foreground">Sessões de estudo com registro automático do progresso ao encerrar.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-2">PDFs como base</h3>
            <p className="text-muted-foreground">Admins enviam livros em PDF para alimentar o agente Groq.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Foco no conteúdo</h3>
            <p className="text-muted-foreground">Tema discreto, sem distrações, mantendo a atenção do estudante.</p>
          </div>
        </section>

        <section id="como-funciona" className="container py-14">
          <h2 className="text-2xl font-semibold mb-4">Como funciona</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Conecte o Supabase e cadastre usuários (aluno e admin).</li>
            <li>Admin envia PDFs; agente Groq usa apenas esse material.</li>
            <li>Aluno estuda; progresso e pontuação são atualizados no Supabase.</li>
          </ol>
        </section>
      </main>

      <footer className="container py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Grok Guardian Learning
      </footer>
    </div>
  );
};

export default Index;
