"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  /** Number of spots remaining this month. Default 7. */
  spotsLeft?: number;
  onOpenForm: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Returns the start of the next calendar month in local time */
function getEndOfMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
}

function calcTimeLeft(): TimeLeft {
  const diff = getEndOfMonth().getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSec = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({ spotsLeft = 7, onOpenForm }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="countdown-section" aria-label="Limited availability countdown">
      <div className="countdown-section-inner">
        <div className="countdown-eyebrow" aria-hidden="true">
          <span style={{ animation: "none" }}>⏳</span>
          Limited slots this month
        </div>

        <h2 className="countdown-heading">
          This month&apos;s free samples are filling up.
        </h2>
        <p className="countdown-sub">
          We cap the number of free samples to guarantee quality. Slots reset at the end of each month.
        </p>

        {/* Spots pill */}
        <div className="spots-pill" role="status" aria-live="polite">
          <span className="spots-dot" aria-hidden="true" />
          Only <strong style={{ marginLeft: "4px", marginRight: "4px" }}>{spotsLeft} spots</strong> left this month
        </div>

        {/* Countdown */}
        <div className="countdown-timer" aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}>
          <div className="countdown-unit">
            <div className="countdown-digit" aria-hidden="true">{pad(timeLeft.days)}</div>
            <div className="countdown-unit-label">Days</div>
          </div>
          <div className="countdown-sep" aria-hidden="true">:</div>
          <div className="countdown-unit">
            <div className="countdown-digit" aria-hidden="true">{pad(timeLeft.hours)}</div>
            <div className="countdown-unit-label">Hours</div>
          </div>
          <div className="countdown-sep" aria-hidden="true">:</div>
          <div className="countdown-unit">
            <div className="countdown-digit" aria-hidden="true">{pad(timeLeft.minutes)}</div>
            <div className="countdown-unit-label">Min</div>
          </div>
          <div className="countdown-sep" aria-hidden="true">:</div>
          <div className="countdown-unit">
            <div className="countdown-digit" aria-hidden="true">{pad(timeLeft.seconds)}</div>
            <div className="countdown-unit-label">Sec</div>
          </div>
        </div>

        <button className="btn-grad" onClick={onOpenForm} style={{ fontSize: "16px", padding: "16px 40px" }}>
          Claim My Spot Now
        </button>
      </div>
    </section>
  );
}
