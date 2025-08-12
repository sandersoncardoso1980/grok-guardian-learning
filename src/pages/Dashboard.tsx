import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "@/hooks/use-toast";

const mockProgress = [
  { dia: "D1", pontos: 10 },
  { dia: "D2", pontos: 18 },
  { dia: "D3", pontos: 26 },
  { dia: "D4", pontos: 35 },
  { dia: "D5", pontos: 44 },
  { dia: "D6", pontos: 53 },
  { dia: "D7", pontos: 62 },
];

const students = [
  { nome: "aluno_teste", materia: "Matemática", pontos: 62 },
  { nome: "Maria", materia: "História", pontos: 48 },
  { nome: "João", materia: "Física", pontos: 37 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") as "aluno" | "admin" | null) ?? null;

  useEffect(() => {
    const start = Number(localStorage.getItem("sessionStart"));
    if (start && Date.now() - start > 60 * 60 * 1000) {
      toast({
        title: "Sessão encerrada",
        description:
          "A memória foi limpa e o progresso do aluno foi registrado (simulado).",
      });
      localStorage.removeItem("sessionStart");
    }
  }, []);

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SEO title="Dashboard — Grok Guardian Learning" description="Acompanhe sua evolução de estudos." />
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Você não está autenticado</CardTitle>
            <CardDescription>Use o modo demo na tela inicial.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")}>Voltar à tela inicial</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (role === "aluno") {
    return (
      <div className="min-h-screen">
        <SEO title="Minha evolução — Grok Guardian" description="Evolução e pontuação do aluno." />
        <div className="container py-8 grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Minha evolução</h1>
            <div className="flex gap-3">
              <Button variant="subtle" onClick={() => navigate("/")}>Sair do demo</Button>
              <Button variant="hero">Iniciar sessão de estudo</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progresso semanal</CardTitle>
              <CardDescription>Pontuação acumulada</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockProgress} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line type="monotone" dataKey="pontos" stroke="hsl(var(--ring))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // admin
  return (
    <div className="min-h-screen">
      <SEO title="Admin — Evolução dos alunos" description="Acompanhe todos os alunos e envie PDFs." />
      <div className="container py-8 grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Evolução dos alunos</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/admin/upload")}>Enviar PDFs</Button>
            <Button variant="subtle" onClick={() => navigate("/")}>Sair do demo</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de alunos</CardTitle>
            <CardDescription>Dados ilustrativos (simulados)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Aluno</th>
                    <th className="py-2">Matéria</th>
                    <th className="py-2">Pontuação</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.nome} className="border-b last:border-0">
                      <td className="py-2">{s.nome}</td>
                      <td className="py-2">{s.materia}</td>
                      <td className="py-2">{s.pontos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
