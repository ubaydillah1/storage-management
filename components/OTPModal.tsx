"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { Button } from "./ui/button";
import { sendEmailOTP, verifyOtp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OTPModal = ({
  email,
  accountId,
}: {
  email: string;
  accountId: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifyOtp({ accountId, password });

      if (sessionId) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    await sendEmailOTP(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="relative flex justify-center text-center!">
          <DialogTitle className="text-[24px]">Enter your OTP</DialogTitle>
          <DialogDescription className="body-2 text-center text-[#333F4E]">
            We&apos;ve sent a code to{" "}
            <span className="pl-1 text-primary">{email}</span>
          </DialogDescription>
        </DialogHeader>

        <InputOTP
          maxLength={6}
          value={password}
          onChange={setPassword}
          className=""
        >
          <InputOTPGroup className="w-full flex justify-center gap-[12px]">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Button type="submit" className="shad-cn-button" onClick={handleSubmit}>
          Submit
          {isLoading && (
            <Image
              src="/loader.svg"
              alt="loader"
              width={20}
              height={20}
              className="animate-spin"
            />
          )}
        </Button>

        <p className="text-center body-2">
          Didn’t get a code?{" "}
          <span className="text-primary font-medium" onClick={handleResendOtp}>
            Click to resend.
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;
