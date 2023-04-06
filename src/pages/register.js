import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

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
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,email,password
      })
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
    <Layout title={"Register"}>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Create Accound</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="w-full"
            id="name"
            placeholder="Name"

            autoFocus
            {...register("name", {
              required: "please enter your name",
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            {...register("confirmPassword", {
              required: "please enter password",
              validate:(value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: "password is more than 5 chars",
              },
            })}
            type="password"
            id="confirmPassword"
            className="w-full"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            errors.confirmPassword.type === 'validate' && (
              
              <div className="text-red-500">Password do not match </div>
            )
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
        <div className="mb-4">
           have an accound ? &nbsp;
          <Link href={"login"}>Login</Link>
        </div>
      </form>
    </Layout>
  );
}

export default LoginScreen;
