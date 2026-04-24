"use client";

import { useState, useEffect } from "react";
import { activityMessages } from "@/lib/data";
import { MapPin, Clock } from "lucide-react";

export default function ActivityFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Initial delay before showing first message
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      // Start exit animation
      setIsExiting(true);

      // After exit animation, change message
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activityMessages.length);
        setIsExiting(false);
      }, 400);
    }, 8000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const message = activityMessages[currentIndex];

  return (
    <div
      id="activity-feed-container"
      className={`fixed bottom-24 left-4 z-40 max-w-[300px] ${
        isExiting ? "animate-slide-out" : "animate-slide-in"
      }`}
    >
      <div className="glass-card rounded-xl p-4 shadow-2xl shadow-black/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-trust-green/15 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-trust-green" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-primary leading-relaxed">
              <span className="font-semibold">Khách hàng tại {message.city}</span>{" "}
              {message.action}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-text-muted" />
              <span className="text-[10px] text-text-muted">{message.time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
