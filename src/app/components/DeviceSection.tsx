import deviceImg from "figma:asset/d6cb5124d85810eeef24e207bccdea33ff688bc6.png";

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Rounded', 'Helvetica Neue', sans-serif";
const dmSans = "'DM Sans', sans-serif";

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.83594 22.125H11.0625C11.316 22.125 11.5234 21.9176 11.5234 21.6641V11.5234H21.6641C21.9176 11.5234 22.125 11.316 22.125 11.0625V7.83594C22.125 7.58242 21.9176 7.375 21.6641 7.375H11.293C9.12656 7.375 7.375 9.12656 7.375 11.293V21.6641C7.375 21.9176 7.58242 22.125 7.83594 22.125ZM37.3359 11.5234H47.4766V21.6641C47.4766 21.9176 47.684 22.125 47.9375 22.125H51.1641C51.4176 22.125 51.625 21.9176 51.625 21.6641V11.293C51.625 9.12656 49.8734 7.375 47.707 7.375H37.3359C37.0824 7.375 36.875 7.58242 36.875 7.83594V11.0625C36.875 11.316 37.0824 11.5234 37.3359 11.5234ZM21.6641 47.4766H11.5234V37.3359C11.5234 37.0824 11.316 36.875 11.0625 36.875H7.83594C7.58242 36.875 7.375 37.0824 7.375 37.3359V47.707C7.375 49.8734 9.12656 51.625 11.293 51.625H21.6641C21.9176 51.625 22.125 51.4176 22.125 51.1641V47.9375C22.125 47.684 21.9176 47.4766 21.6641 47.4766ZM51.1641 36.875H47.9375C47.684 36.875 47.4766 37.0824 47.4766 37.3359V47.4766H37.3359C37.0824 47.4766 36.875 47.684 36.875 47.9375V51.1641C36.875 51.4176 37.0824 51.625 37.3359 51.625H47.707C49.8734 51.625 51.625 49.8734 51.625 47.707V37.3359C51.625 37.0824 51.4176 36.875 51.1641 36.875ZM52.0859 27.4258H6.91406C6.66055 27.4258 6.45312 27.6332 6.45312 27.8867V31.1133C6.45312 31.3668 6.66055 31.5742 6.91406 31.5742H52.0859C52.3395 31.5742 52.5469 31.3668 52.5469 31.1133V27.8867C52.5469 27.6332 52.3395 27.4258 52.0859 27.4258Z"
          fill="#E8E8EF"
        />
      </svg>
    ),
    title: "Smart Attendance",
    desc: "Instant check-ins with secure and unique QR",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 4a16 16 0 0 1 0 32A16 16 0 0 1 24 8zm0 6a2 2 0 0 0-2 2v8a2 2 0 0 0 .586 1.414l4 4a2 2 0 0 0 2.828-2.828L27 24.172V16a2 2 0 0 0-2-2z" fill="#E8E8EF" />
      </svg>
    ),
    title: "Real-Time Tracking",
    desc: "Live location updates the moment students enter or leave school",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 2L4 12v10c0 13.1 8.5 25.4 20 28 11.5-2.6 20-14.9 20-28V12L24 2zm0 22h-8v-2a8 8 0 0 1 16 0v2h-8zm8 12H16V26h16v10z" fill="#E8E8EF" />
      </svg>
    ),
    title: "Safety Alerts",
    desc: "Instant push notifications for every entry, exit, and safety event",
  },
];

export function DeviceSection() {
  return (
    <section id="product" className="relative bg-[#161617] py-20 md:py-32 overflow-hidden">
      {/* Decorative glowing diagonal line (left side) */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-40%",
          top: "10%",
          width: "80%",
          height: "120%",
          background:
            "linear-gradient(to right, #161617, rgba(5,79,213,0.45), #161617)",
          transform: "rotate(15deg)",
          filter: "blur(40px)",
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Headline */}
        <div className="mb-16 md:mb-24">
          <h2
            className="text-[#E8E8EF] text-4xl md:text-[48px] leading-tight font-normal"
            style={{ fontFamily: sfPro }}
          >
            One Device.
            <br />
            <span className="text-[#E8E8EF]">Every</span>
            <span className="text-[#858589]"> layer of safety</span>
          </h2>
        </div>

        {/* Main layout: features left, device center, info right */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: feature cards */}
          <div className="flex-1 flex flex-col gap-8 max-w-[340px] w-full mx-auto lg:mx-0">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="shrink-0 opacity-90">{f.icon}</div>
                <div>
                  <h3
                    className="text-[#E8E8EF] text-xl md:text-2xl font-normal mb-1"
                    style={{ fontFamily: sfPro }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-[#858589] text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: dmSans }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center: device image */}
          <div className="shrink-0 flex justify-center">
            <img
              src={deviceImg}
              alt="Smart Pin device"
              className="h-[320px] md:h-[456px] object-contain"
              style={{ filter: "drop-shadow(0 24px 64px rgba(5,79,213,0.25))" }}
            />
          </div>

          {/* Right: notification card mockup */}
          <div className="flex-1 max-w-[340px] w-full mx-auto lg:mx-0">
            <div
              className="rounded-[16px] p-6 border border-white/[0.08]"
              style={{
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
              }}
            >
              {/* Notification header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="w-8 h-8 bg-[#054FD5] rounded-xl flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1.5C4 1.5 1.5 4 1.5 7S4 12.5 7 12.5 12.5 10 12.5 7 10 1.5 7 1.5zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 3.5c1.1 0 2 .9 2 2v2H5v-2c0-1.1.9-2 2-2z" fill="white" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium uppercase tracking-wide" style={{ fontFamily: sfPro }}>
                    SMART PIN
                  </p>
                  <p className="text-white/60 text-xs" style={{ fontFamily: dmSans }}>1 min ago</p>
                </div>
              </div>
              <p className="text-white text-sm font-medium mb-1" style={{ fontFamily: sfPro }}>
                Attendance Marked
              </p>
              <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: dmSans }}>
                Your child has entered school today at 9:15 AM
              </p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/50 text-xs" style={{ fontFamily: dmSans }}>3 more notifications</p>
              </div>
            </div>

            <div
              className="mt-4 rounded-[16px] p-4 border border-white/[0.06]"
              style={{
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="white" strokeOpacity="0.6" />
                  </svg>
                </div>
                <p className="text-white/50 text-xs" style={{ fontFamily: dmSans }}>App Name · 1h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
