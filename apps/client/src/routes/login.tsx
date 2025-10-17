import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { signIn } from "../lib/auth-client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/components/ui/spinner";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
 
const formSchema = z.object({
  email: z.string().min(2).max(100).email(),
  password: z.string().min(6).max(100),
});


export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getErrorMessage = (e: unknown, fallback = "Failed to sign in"): string => {
    if (!e) return fallback;
    if (typeof e === "string") return e;
    if (typeof e === "object") {
      const maybe = e as { message?: unknown };
      if (maybe && typeof maybe.message === "string") return maybe.message;
    }
    return fallback;
  };

 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Accepts validated values from react-hook-form (zod)
  const handleEmailLogin = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await signIn.email(values, {
        onSuccess: () => {
          toast.success("Signed in successfully");
          navigate({ to: "/" });
        },
        onError: (error) => {
          console.error(error);
          toast.error(getErrorMessage(error));
        },
      });
    } catch (err: unknown) {
      // signIn.email may throw in addition to calling onError
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   await signIn.social(
  //     { provider: "google" },
  //     {
  //       onSuccess: () => {
  //         navigate({ to: "/" });
  //       },
  //       onError: (error) => {
  //         console.error(error);
  //       },
  //     }
  //   );
  // };

  // const handleGithubLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   await signIn.social(
  //     { provider: "github" },
  //     {
  //       onSuccess: () => {
  //         navigate({ to: "/" });
  //       },
  //       onError: (error) => {
  //         console.error(error);
  //       },
  //     }
  //   );
  // };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      await signIn.social(
        { provider },
        {
          onSuccess: () => {
            toast.success('Signed in successfully');
            navigate({ to: '/' });
          },
          onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
          },
        }
      );
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
        <div className="min-h-[calc(80vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xs border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Welcome back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEmailLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 shadow-xs hover:shadow-xs"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={() => handleSocialLogin('github')}
                variant="outline"
                size="lg"
                className="w-full"
                aria-label="Sign in with GitHub"
                disabled={isLoading}
              >
                <Github className="size-4" />
                GitHub
              </Button>

              <Button
                onClick={() => handleSocialLogin('google')}
                variant="outline"
                size="lg"
                className="w-full"
                aria-label="Sign in with Google"
                disabled={isLoading}
              >
                {/* Google G logo */}
                <svg className="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M23.5 12.25c0-.83-.07-1.63-.2-2.4H12v4.55h6.36c-.27 1.43-1.09 2.64-2.34 3.45v2.86h3.78c2.21-2.04 3.6-5.03 3.6-8.46z" fill="#4285F4"/>
                  <path d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.78-2.86c-1.05.7-2.4 1.12-4.17 1.12-3.2 0-5.91-2.16-6.88-5.07H1.24v2.99C3.2 21.7 7.33 24 12 24z" fill="#34A853"/>
                  <path d="M5.12 14.29A7.2 7.2 0 0 1 4.6 12c0-.83.14-1.63.5-2.37V6.64H1.24A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.24 5.36l3.88-3.07z" fill="#FBBC05"/>
                  <path d="M12 4.77c1.76 0 3.34.6 4.58 1.77l3.44-3.44C17.95 1.13 15.23 0 12 0 7.33 0 3.2 2.3 1.24 5.64l3.88 2.99C6.09 6.93 8.8 4.77 12 4.77z" fill="#EA4335"/>
                </svg>
                Google
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <a
                  href="/sign-up"
                  className="font-medium text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
                >
                  Sign up
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>


    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleEmailLogin}>
    //     <label htmlFor="email">Email</label>
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    //   <form onSubmit={handleGoogleLogin}>
    //     <button type="submit">Login with Google</button>
    //   </form>
    //   <form onSubmit={handleGithubLogin}>
    //     <button type="submit">Login with Github</button>
    //   </form>
    // </div>
  );
}
