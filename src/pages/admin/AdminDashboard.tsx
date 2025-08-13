import SEO from "@/components/SEO";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Activity,
  Upload,
  MessageSquare,
  Clock,
  Target,
  BarChart,
  Settings,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = {
    totalStudents: 142,
    activeToday: 28,
    totalLessons: 45,
    completionRate: 78
  };

  const recentActivity = [
    { student: "João Silva", action: "Completou lição", lesson: "Variáveis em Python", time: "5 min atrás" },
    { student: "Maria Santos", action: "Iniciou exercício", lesson: "Loops em JavaScript", time: "12 min atrás" },
    { student: "Pedro Costa", action: "Concluiu módulo", lesson: "Introdução à Programação", time: "1h atrás" },
  ];

  const systemStatus = [
    { service: "Chat IA (Groq)", status: "online", message: "Funcionando normalmente" },
    { service: "Upload de Materiais", status: "online", message: "Sistema ativo" },
    { service: "Base de Dados", status: "warning", message: "Alta utilização (85%)" },
  ];

  return (
    <MainLayout userRole="admin" title="Painel Administrativo">
      <SEO 
        title="Admin Dashboard - CodeLearn" 
        description="Painel administrativo para gestão de alunos e conteúdo"
      />
      
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 rounded-lg p-6 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Painel Administrativo 🎯
              </h2>
              <p className="text-muted-foreground">
                Gerencie alunos, conteúdo e monitore o progresso geral
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/admin/upload">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Material
                </Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-accent">
                <Link to="/admin/students">
                  <Users className="w-4 h-4 mr-2" />
                  Ver Alunos
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Total de Alunos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">+12 este mês</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-600" />
                Ativos Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeToday}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.activeToday / stats.totalStudents) * 100)}% do total
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                Lições Criadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.totalLessons}</div>
              <p className="text-xs text-muted-foreground">Conteúdo disponível</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600" />
                Taxa de Conclusão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{stats.completionRate}%</div>
              <p className="text-xs text-muted-foreground">Média geral</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Atividade Recente
                </CardTitle>
                <CardDescription>
                  Últimas ações dos alunos na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{activity.student}</h4>
                          <p className="text-xs text-muted-foreground">
                            {activity.action}: {activity.lesson}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">
                          {activity.time}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/admin/reports">
                      <BarChart className="w-4 h-4 mr-2" />
                      Ver Relatório Completo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-accent" />
                  Status do Sistema
                </CardTitle>
                <CardDescription>
                  Monitoramento dos serviços principais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemStatus.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        {item.status === "online" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                        )}
                        <div>
                          <h4 className="font-medium text-sm">{item.service}</h4>
                          <p className="text-xs text-muted-foreground">{item.message}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={item.status === "online" ? "default" : "secondary"} 
                        className="text-xs"
                      >
                        {item.status === "online" ? "Online" : "Atenção"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Material
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/students">
                    <Users className="w-4 h-4 mr-2" />
                    Gerenciar Alunos
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/chat">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Testar Chat IA
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Today's Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Resumo de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Novos registros</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lições completadas</span>
                  <Badge variant="secondary">47</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Chat IA usado</span>
                  <Badge variant="secondary">156x</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tempo médio online</span>
                  <Badge variant="secondary">2.3h</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;