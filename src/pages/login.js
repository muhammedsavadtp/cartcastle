import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function LoginScreen() {
  const router = useRouter();
  const { redirect } = router.query;
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError.error);
    }
  };

  return (
    <Layout title={"login"}>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-z0-9-]+.[a-zA-Z0-9-.]+$/i,

                message: "please enter valid email",
              },
            })}
            autoFocus
            type="email"
            id="email"
            className="w-full"
            placeholder="Email"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "please enter password",
              minLength: {
                value: 6,
                message: "password is more than 5 chars",
              },
            })}
            type="password"
            id="password"
            className="w-full"
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message} </div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an accound ? &nbsp;
          <Link href={`/register?redirect=${redirect || "/"}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}

export default LoginScreen;
