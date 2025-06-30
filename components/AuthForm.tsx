"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type FormType = "sign-in" | "sign-up";

const authFormScheme = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullname:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading] = useState<boolean>(false);
  const [errorMessage] = useState<string>("");

  const formSchema = authFormScheme(type);

  type FormScheme = z.infer<typeof formSchema>;

  const form = useForm<FormScheme>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  });

  function onSubmit(values: FormScheme) {
    console.log(values);
  }

  return (
    <div className="flex flex-1 justify-center items-center flex-col px-[24px]">
      <div className="max-w-[580px] w-full">
        <h1 className="heading-1 ">
          {type === "sign-up" ? "Create Account" : "Login"}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-5"
          >
            {type === "sign-up" && (
              <>
                <div
                  className="p-4 rounded-[12px]"
                  style={{
                    boxShadow: "0px 10px 30px rgba(66, 71, 97, 0.1)",
                  }}
                >
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body2 md:text-body1">
                          Full name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            {...field}
                            className="
                            text-[15px]
                            font-medium
                            bg-white
                            border
                            border-gray-300
                            rounded-md
                            px-3
                            py-2
                            text-gray-800
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-primary
                            focus:border-primary
                            transition
                        "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div
                  className="p-4 rounded-[12px]"
                  style={{
                    boxShadow: "0px 10px 30px rgba(66, 71, 97, 0.1)",
                  }}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your email"
                            {...field}
                            className="
                            text-[15px]
                            font-medium
                            bg-white
                            border
                            border-gray-300
                            rounded-md
                            px-3
                            py-2
                            text-gray-800
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-primary
                            focus:border-primary
                            transition
                        "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {type === "sign-in" && (
              <div
                className="p-4 rounded-[12px]"
                style={{
                  boxShadow: "0px 10px 30px rgba(66, 71, 97, 0.1)",
                }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body2 md:text-body1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email"
                          {...field}
                          className="
                            text-[15px]
                            font-medium
                            bg-white
                            border
                            border-gray-300
                            rounded-md
                            px-3
                            py-2
                            text-gray-800
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-primary
                            focus:border-primary
                            transition
                        "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-6 rounded-[12px]"
              disabled={isLoading}
            >
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="Loader"
                  width={18}
                  height={18}
                  className="animate-spin"
                />
              )}
            </Button>

            {errorMessage && (
              <p className="text-destructive text-center text-[14px]">
                {errorMessage}
              </p>
            )}
          </form>
        </Form>

        <p className="my-5 text-center text-body2 md:text-body1">
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          {type === "sign-in" ? (
            <Link href="sign-up" className="text-primary font-medium">
              Create Account
            </Link>
          ) : (
            <Link href="sign-in" className="text-primary font-medium">
              Login
            </Link>
          )}
        </p>
      </div>

      {/* OTP Verification */}
    </div>
  );
};

export default AuthForm;
