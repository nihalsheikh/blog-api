/**
 * A geometric abstract visual for the hero. Animated circles, curves, and
 * organic forms in teal and neutral tones, arranged to feel like a thought
 * taking shape — the visual metaphor for writing.
 *
 * The shapes are SVG, not CSS, so they can be precise and layered without
 * fighting the layout model. They animate on mount with a staggered reveal
 * so the page feels like it's assembling as you arrive.
 */
export default function HeroVisual() {
  return (
    <figure
      className="relative w-full h-full min-h-[500px] select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full absolute inset-0"
        style={{ filter: "drop-shadow(0 40px 80px rgba(13, 148, 136, 0.08))" }}
      >
        {/* Background gradient layers for depth */}
        <defs>
          <radialGradient id="glow1" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(13, 148, 136, 0.3)" />
            <stop offset="100%" stopColor="rgba(13, 148, 136, 0)" />
          </radialGradient>
          <radialGradient id="glow2" cx="70%" cy="70%">
            <stop offset="0%" stopColor="rgba(45, 212, 191, 0.2)" />
            <stop offset="100%" stopColor="rgba(45, 212, 191, 0)" />
          </radialGradient>
        </defs>

        {/* Ambient glow layers */}
        <circle
          cx="300"
          cy="300"
          r="280"
          fill="url(#glow1)"
          className="animate-[float_8s_ease-in-out_infinite]"
        />
        <circle
          cx="300"
          cy="300"
          r="250"
          fill="url(#glow2)"
          className="animate-[float_10s_ease-in-out_2s_infinite]"
        />

        {/* Floating geometric shapes with staggered animations */}

        {/* Large teal circle, top right */}
        <circle
          cx="480"
          cy="120"
          r="85"
          fill="#14b8a6"
          className="animate-[float_7s_ease-in-out_0.2s_infinite]"
          opacity="0.9"
        />

        {/* Medium navy circle, center-left */}
        <circle
          cx="140"
          cy="280"
          r="65"
          fill="#0f766e"
          className="animate-[float_9s_ease-in-out_0.4s_infinite]"
          opacity="0.85"
        />

        {/* Large teal circle, bottom right */}
        <circle
          cx="520"
          cy="450"
          r="110"
          fill="#0d9488"
          className="animate-[float_8.5s_ease-in-out_0.6s_infinite]"
          opacity="0.8"
        />

        {/* Small accent circle, top left */}
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="#5eead4"
          className="animate-[float_6s_ease-in-out_0.3s_infinite]"
          opacity="0.7"
        />

        {/* Organic curved shape, center — a partial circle slice */}
        <path
          d="M 300 150 A 150 150 0 0 1 420 420 L 300 300 Z"
          fill="#2dd4bf"
          className="animate-[float_10s_ease-in-out_0.5s_infinite]"
          opacity="0.6"
        />

        {/* Another organic form, left side */}
        <path
          d="M 80 400 Q 120 380 140 420 Q 120 460 80 450 Z"
          fill="#0f766e"
          className="animate-[float_7.5s_ease-in-out_0.7s_infinite]"
          opacity="0.5"
        />

        {/* Small circle nest — teal on neutral */}
        <circle
          cx="380"
          cy="280"
          r="50"
          fill="#115e59"
          className="animate-[float_9.5s_ease-in-out_0.4s_infinite]"
          opacity="0.7"
        />
        <circle
          cx="380"
          cy="280"
          r="30"
          fill="#5eead4"
          className="animate-[float_8s_ease-in-out_0.2s_infinite]"
          opacity="0.8"
        />

        {/* Floating dot swarm — three small circles */}
        <circle
          cx="250"
          cy="100"
          r="20"
          fill="#14b8a6"
          className="animate-[float_6.5s_ease-in-out_0.1s_infinite]"
          opacity="0.6"
        />
        <circle
          cx="200"
          cy="520"
          r="25"
          fill="#2dd4bf"
          className="animate-[float_7.5s_ease-in-out_0.3s_infinite]"
          opacity="0.5"
        />
        <circle
          cx="450"
          cy="550"
          r="15"
          fill="#0f766e"
          className="animate-[float_8.5s_ease-in-out_0.5s_infinite]"
          opacity="0.7"
        />
      </svg>
    </figure>
  );
}
