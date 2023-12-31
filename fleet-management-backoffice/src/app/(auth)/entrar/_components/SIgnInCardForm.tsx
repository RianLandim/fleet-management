"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from "../../_components/Card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { api } from "@/utils/api";

const signInFormSchema = z.object({
  username: z
    .string()
    .email("E-mail invalido")
    .min(1, "Email precisa ser preenchido"),
  password: z.string().min(1, "Senha precisa ser preenchida"),
});

type SignInProps = z.infer<typeof signInFormSchema>;

export function SignInCardFrom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>({ resolver: zodResolver(signInFormSchema) });

  const submit: SubmitHandler<SignInProps> = (data) => {
    api
      .post("authentication/login", data)
      .then(() => api.get("authentication/me"));
  };

  return (
    <Card onSubmit={handleSubmit(submit)}>
      <h2 className="text-black font-bold text-3xl">Entrar</h2>
      <label
        htmlFor="email"
        className="self-start text-lg text-black font-bold"
      >
        E-mail
      </label>
      <Input type="email" {...register("username")} />
      {errors.username && (
        <label htmlFor="username" className="self-start text-base text-red-700">
          {errors.username.message}
        </label>
      )}
      <label
        htmlFor="password"
        className="self-start text-lg text-black font-bold"
      >
        Senha
      </label>
      <Input type="password" {...register("password")} />
      {errors.password && (
        <label htmlFor="password" className="self-start text-base text-red-700">
          {errors.password.message}
        </label>
      )}
      <Link
        href="/recuperar-senha"
        className="text-sm self-start text-zinc-800 hover:cursor-pointer hover:underline"
      >
        Esqueceu a senha?
      </Link>
      <Button className="w-full" type="submit">
        Entrar
      </Button>
    </Card>
  );
}
