import React from "react";

export default function StarRating({ value = 0, size = 14 }) {
  const stars = [0, 1, 2, 3, 4];
  return (
    <span aria-label={`Rated ${value} out of 5`} style={{ display: "inline-flex", gap: 2 }}>
      {stars.map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
            <defs>
              <linearGradient id={`star-fill-${i}-${value}`}>
                <stop offset={`${fill * 100}%`} stopColor="#b8863e" />
                <stop offset={`${fill * 100}%`} stopColor="#e2d5c0" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.5l2.6 5.5 5.9.6-4.4 4 1.3 5.9L10 14.7 4.6 17.5l1.3-5.9-4.4-4 5.9-.6z"
              fill={`url(#star-fill-${i}-${value})`}
            />
          </svg>
        );
      })}
    </span>
  );
}
