
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { LogIn, UserPlus, Building, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/context/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("tenant");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === "tenant" ? "/tenant" : "/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        await login(email, password, role);
      } else {
        if (!name) {
          alert("Veuillez entrer votre nom");
          setIsSubmitting(false);
          return;
        }
        await register(email, password, name, role);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A2533] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[#1A2533] border-[#7FD1C7]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            {isLogin ? "Bienvenue" : "Créer un compte"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isLogin
              ? "Choisissez votre type de compte pour vous connecter"
              : "Choisissez votre type de compte et entrez vos informations"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="tenant" 
            className="mb-4"
            onValueChange={(value) => setRole(value as UserRole)}
          >
            <TabsList className="w-full bg-[#2A3544]">
              <TabsTrigger value="tenant" className="w-1/2 data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
                <Users className="mr-2 h-4 w-4" />
                Locataire
              </TabsTrigger>
              <TabsTrigger value="landlord" className="w-1/2 data-[state=active]:bg-[#7FD1C7] data-[state=active]:text-[#1A2533]">
                <Building className="mr-2 h-4 w-4" />
                Propriétaire
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tenant">
              <p className="text-sm text-gray-400 mb-4">
                {isLogin 
                  ? "Connectez-vous en tant que locataire pour accéder à votre espace de colocation"
                  : "Inscrivez-vous en tant que locataire pour rejoindre votre espace de colocation"}
              </p>
            </TabsContent>
            <TabsContent value="landlord">
              <p className="text-sm text-gray-400 mb-4">
                {isLogin
                  ? "Connectez-vous en tant que propriétaire pour accéder à vos propriétés"
                  : "Inscrivez-vous en tant que propriétaire pour gérer vos propriétés"}
              </p>
            </TabsContent>
          </Tabs>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#2A3544] border-[#7FD1C7] text-white placeholder:text-gray-400"
                />
              </div>
            )}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#2A3544] border-[#7FD1C7] text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#2A3544] border-[#7FD1C7] text-white placeholder:text-gray-400"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533] font-medium"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : isLogin ? (
                <LogIn className="mr-2 h-5 w-5" />
              ) : (
                <UserPlus className="mr-2 h-5 w-5" />
              )}
              {isLogin ? "Se connecter" : "S'inscrire"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              disabled={isSubmitting}
              className="text-[#7FD1C7] hover:underline text-sm disabled:opacity-50"
            >
              {isLogin
                ? "Vous n'avez pas de compte ? Inscrivez-vous"
                : "Vous avez déjà un compte ? Connectez-vous"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

