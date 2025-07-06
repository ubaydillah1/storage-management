"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import { Button } from "./ui/button";
import { sendEmailOTP, verifyOtp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const OTPModal = ({
  email,
  accountId,
  onClose,
}: {
  email: string;
  accountId: string;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [remainingCooldown, setRemainingCooldown] = useState<number>(0);
  const RESEND_COOLDOWN_SECONDS = 60;

  useEffect(() => {
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const lastResend = localStorage.getItem("remainingCooldown");

    if (lastResend) {
      if (Number(lastResend) > 0) {
        setRemainingCooldown(Number(lastResend));
      }
    } else {
      localStorage.setItem("remainingCooldown", "0");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingCooldown == 0) {
        return clearInterval(interval);
      }

      setRemainingCooldown((prev) => {
        const newValue = prev - 1;
        localStorage.setItem("remainingCooldown", String(newValue));
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingCooldown]);

  const submitOtp = useCallback(async () => {
    setIsLoading(true);
    try {
      const sessionId = await verifyOtp({ accountId, password });

      if (sessionId) {
        toast.success("Verification successful! Redirecting...");
        setRemainingCooldown(0);
        router.push("/");
      }
    } catch {
      setPassword("");
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [accountId, password, router]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitOtp();
  };

  useEffect(() => {
    if (password.length === 6) {
      submitOtp();
    }
  }, [password, submitOtp]);

  const handleResendOtp = async () => {
    try {
      setRemainingCooldown(RESEND_COOLDOWN_SECONDS);

      await sendEmailOTP(email);
      toast.success("A new OTP has been sent to your email.");
    } catch {
      toast.error("Failed to resend OTP. Please try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="relative flex-col items-center text-center">
          <DialogTitle className="text-[24px]">Enter your OTP</DialogTitle>
          <DialogDescription className="body-2 text-center text-muted-foreground">
            We&apos;ve sent a code to{" "}
            <span className="pl-1 text-primary">{email}</span>
          </DialogDescription>
        </DialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="w-full flex justify-center gap-[12px]">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Button
          type="submit"
          className="shad-cn-button flex items-center gap-2"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Submit"}
          {isLoading && <LoaderCircle size={20} className="animate-spin" />}
        </Button>

        <p className="text-center body-2 text-muted-foreground">
          Didn’t get a code?{" "}
          <button
            className="text-primary font-medium cursor-pointer disabled:opacity-50 disabled:cursor-text"
            onClick={handleResendOtp}
            disabled={remainingCooldown !== 0 || isLoading}
          >
            {remainingCooldown === 0
              ? "Click to resend."
              : "remaining : " + remainingCooldown}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;
