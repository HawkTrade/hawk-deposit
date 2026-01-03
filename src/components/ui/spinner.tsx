const Spinner: React.FC = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    preserveAspectRatio="xMidYMid"
    xmlns="http://www.w3.org/2000/svg"
    style={{ mixBlendMode: "difference" }}
  >
    <circle
      cx="10"
      cy="10"
      r="7"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="11 33"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 10 10"
        to="360 10 10"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export { Spinner };
