import { random, useVideoConfig } from 'remotion';
import { useState } from 'react';

export const Line: React.FC<{
    progress: number;
    strokeWidth?: number;
    color1: string;
    color2: string;
}> = ({ progress, strokeWidth = 30, color1, color2 }) => {
    const { width, height } = useVideoConfig();
    const [gradientId] = useState(() => String(random(null)));

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width={"100%"}
            height={"100%"}
            style={{
                position: "absolute"
            }}
        >
            <defs>
                <linearGradient id={`grad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={color1} />
                    <stop offset="100%" stopColor={color2} />
                </linearGradient>
            </defs>
            <line
                x1="0"
                y1={(height / 2) - 0.01}
                x2={width}
                y2={height / 2}
                stroke={`url(#grad-${gradientId})`}
                strokeLinecap='round'
                strokeWidth={strokeWidth}
                strokeDasharray={width}
                strokeDashoffset={width - (width * progress)}
            />

        </svg>)

}