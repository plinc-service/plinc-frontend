"use client"

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { LoginFormSchema } from "@/schemas/LoginFormSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "../ui/Spinner";

const LoginForm = () => {

  const { login, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    login(
      { email: values.email, password: values.password },
      {
        onSuccess: () => {
          form.reset();
        },
        onError: (error: unknown) => {
          console.error("Erreur lors de la connexion :", error);
        }
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-md w-full bg-white p-10 rounded-3xl text-neutral-high">
        <div className="space-y-3 mb-5">
          <h1 className="text-xl font-semibold">Connectez-vous</h1>
          <p className="text-sm">Accédez à l&apos;espace administrateur de PLINC</p>
        </div>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mail</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-input-placeholder" size={16} />
                  <FormControl className="mt-1.5 mb-5">
                    <Input type="email" className="h-10 pl-9" placeholder="votre@email.com" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-input-placeholder" size={16} />
                  <FormControl className="mt-1.5">
                    <Input type={showPassword ? "text" : "password"} className="h-10 px-9" placeholder="********" {...field} />
                  </FormControl>
                  {showPassword ? (
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-input-placeholder cursor-pointer" size={16} onClick={toggleShowPassword} />
                  ) : (
                    <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-input-placeholder cursor-pointer" size={16} onClick={toggleShowPassword} />
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="text-end">
          <Link href={"/forgot-password"} className="text-primary mt-2 text-sm">Mot de passe oublié</Link>
        </div>
        <Button type="submit" className="w-full mt-10 h-10" disabled={isLoading}>
          {isLoading ? <Spinner className="text-white" /> : "Se connecter"}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm