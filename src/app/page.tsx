"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdContentCopy } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function Home() {
  const defaultOTPStr = "______";
  const [otp, setOtp] = useState<string>(defaultOTPStr);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  async function generateOTPhandler() {
    setIsLoading(true);
    setOtp(defaultOTPStr);
    try {
      const response = await fetch("/api/generate-otp");
      if (response.status >= 200 && response.status < 300) {
        const results = await response.json();
        setOtp(results.otp);
        return results;
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      const error = err;
      const results = null;
      return error;
    } finally {
      setIsLoading(false);
    }
  }
  async function handleCopyToClipboard() {
    await navigator.clipboard.writeText(otp);
    toast({
      variant: "default",
      title: "Copy to clipboard!",
      description: "You copied one time password to clipboard",
    });
  }

  return (
    <main className="flex min-h-screen  items-center justify-center p-24">
      <div className="flex flex-col space-y-12 justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Generate OTP</CardTitle>
            <CardDescription>
              This OTP generator for reviewer to use and get into the facebook
              test account for{" "}
              <Link
                href="https://nexus-odm.com/"
                className="hover:underline text-black font-[600]"
              >
                Nexus-odm
              </Link>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center flex-col">
              <div>
                <p className="text-[48px] text-black tracking-widest text-center">
                  {otp}
                </p>
              </div>
              {otp !== defaultOTPStr && (
                <Button
                  variant="ghost"
                  onClick={handleCopyToClipboard}
                  className="flex space-x-2 items-center justify-center hover:bg-gray-100 px-4 py-2 rounded-full cursor"
                >
                  <MdContentCopy />
                  <p>Copy to Clipboard</p>
                </Button>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              disabled={isLoading}
              className="w-full"
              onClick={generateOTPhandler}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate New OTP
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
