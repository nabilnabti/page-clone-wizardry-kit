
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // À implémenter avec Supabase plus tard
    console.log("Form submitted:", { email, password });
  };

  return (
    <div className="min-h-screen bg-[#1A2533] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[#1A2533] border-[#7FD1C7]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            {isLogin ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Enter your information to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#2A3544] border-[#7FD1C7] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#2A3544] border-[#7FD1C7] text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533] font-medium"
            >
              {isLogin ? <LogIn className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />}
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#7FD1C7] hover:underline text-sm"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
