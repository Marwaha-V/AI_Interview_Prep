"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

// Demo lines (will be replaced by the real conversation later)
const demoMessages = [
    "Hello! Welcome to your interview. Are you ready to begin?",
    "Yes, I'm ready.",
    "Great. Tell me a little about yourself and your experience.",
    "I'm a developer who enjoys building web apps.",
    "Nice. What is your favorite project you have worked on?",
];

const Agent = ({ userName }: AgentProps) => {
    const router = useRouter();
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [lastMessage, setLastMessage] = useState<string>("");

    // Fake speaking animation + fake transcript while the call is active
    useEffect(() => {
        if (callStatus !== CallStatus.ACTIVE) {
            setIsSpeaking(false);
            setLastMessage("");
            return;
        }

        let index = 0;
        setLastMessage(demoMessages[0]);
        setIsSpeaking(true);

        const interval = setInterval(() => {
            index = (index + 1) % demoMessages.length;
            setLastMessage(demoMessages[index]);
            setIsSpeaking(index % 2 === 0); // AI speaks on even lines
        }, 3000);

        return () => clearInterval(interval);
    }, [callStatus]);

    const handleCall = () => {
        setCallStatus(CallStatus.CONNECTING);

        setTimeout(() => {
            setCallStatus(CallStatus.ACTIVE);
        }, 1500);
    };

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        router.push("/");
    };

    return (
        <>
            <div className="call-view">
                {/* AI Interviewer Card */}
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image
                            src="/ai-avatar.png"
                            alt="profile-image"
                            width={65}
                            height={54}
                            className="object-cover"
                        />
                        {isSpeaking && <span className="animate-speak" />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>

                {/* User Profile Card */}
                <div className="card-border">
                    <div className="card-content">
                        <Image
                            src="/user-avatar.png"
                            alt="profile-image"
                            width={539}
                            height={539}
                            className="rounded-full object-cover size-[120px]"
                        />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {/* Transcript bar */}
            {lastMessage && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p
                            key={lastMessage}
                            className={cn(
                                "transition-opacity duration-500 opacity-0",
                                "animate-fadeIn opacity-100"
                            )}
                        >
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center">
                {callStatus !== "ACTIVE" ? (
                    <button className="relative btn-call" onClick={handleCall}>
            <span
                className={cn(
                    "absolute animate-ping rounded-full opacity-75",
                    callStatus !== "CONNECTING" && "hidden"
                )}
            />

                        <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                  ? "Call"
                  : ". . ."}
            </span>
                    </button>
                ) : (
                    <button className="btn-disconnect" onClick={handleDisconnect}>
                        End
                    </button>
                )}
            </div>
        </>
    );
};

export default Agent;