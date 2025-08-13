import SEO from "@/components/SEO";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Code, 
  Trophy, 
  Clock,
  Target,
  TrendingUp,
  Play,
  CheckCircle,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const progressData = {
    currentLevel: "Iniciante",
    completedLessons: 12,
    totalLessons: 30,
    streak: 5,
    points: 1250
  };

  const recentActivities = [
    { title: "Variáveis e Tipos de Dados", type: "Lição", completed: true, date: "Hoje" },
    { title: "Exercício: Calculadora Simples", type: "Exercício", completed: true, date: "Ontem" },
    { title: "Estruturas de Controle", type: "Lição", completed: false, date: "Em andamento" },
  ];

  const recommendations = [
    { title: "Loops e Iterações", description: "Próxima lição recomendada", difficulty: "Fácil" },
    { title: "Funções Básicas", description: "Continue sua jornada", difficulty: "Médio" },
  ];

  return (
    <MainLayout userRole="student" title="Dashboard do Aluno">
      <SEO 
        title="Dashboard - CodeLearn" 
        description="Acompanhe seu progresso em programação para iniciantes"
      />
      
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 rounded-lg p-6 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Bem-vindo de volta! 👋
              </h2>
              <p className="text-muted-foreground">
                Continue sua jornada de aprendizado em programação
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{progressData.points}</div>
              <div className="text-sm text-muted-foreground">Pontos XP</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Progresso Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">
                {Math.round((progressData.completedLessons / progressData.totalLessons) * 100)}%
              </div>
              <Progress 
                value={(progressData.completedLessons / progressData.totalLessons) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {progressData.completedLessons} de {progressData.totalLessons} lições
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                Sequência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent mb-2">{progressData.streak}</div>
              <p className="text-xs text-muted-foreground">dias consecutivos</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Nível Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground mb-2">{progressData.currentLevel}</div>
              <Badge variant="secondary" className="text-xs">
                {progressData.points} XP
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">2h</div>
              <p className="text-xs text-muted-foreground">tempo de estudo</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  Continue Aprendendo
                </CardTitle>
                <CardDescription>
                  Retome de onde parou
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">Estruturas de Controle</h3>
                      <p className="text-sm text-muted-foreground">Aprenda sobre if, else e switch</p>
                    </div>
                    <Badge variant="outline">Em andamento</Badge>
                  </div>
                  <Progress value={65} className="mb-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">65% concluído</span>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                      Continuar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        {activity.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-500" />
                        )}
                        <div>
                          <h4 className="font-medium text-sm">{activity.title}</h4>
                          <p className="text-xs text-muted-foreground">{activity.type}</p>
                        </div>
                      </div>
                      <Badge variant={activity.completed ? "default" : "secondary"} className="text-xs">
                        {activity.date}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Recomendações
                </CardTitle>
                <CardDescription>
                  Sugestões personalizadas para você
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((item, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {item.difficulty}
                      </Badge>
                      <Button size="sm" variant="ghost" asChild>
                        <Link to="/student/study">Iniciar</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/student/study">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Ir para Estudos
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/student/exercises">
                    <Code className="w-4 h-4 mr-2" />
                    Fazer Exercícios
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/student/chat">
                    <Star className="w-4 h-4 mr-2" />
                    Chat com IA
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;