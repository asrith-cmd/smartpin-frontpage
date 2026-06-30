import phoneImg from "figma:asset/71a9459c05c9ed41cee73bfb3c7610ab52c0d626.png";
import blueDeviceImg from "figma:asset/f035ac52ccd7a4a9c36651b6710f77e7ee8b714e.png";
import { imgPlaceholder } from "../../imports/LandingPage-1/svg-os2gc";

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Rounded', 'Helvetica Neue', sans-serif";
const dmSans = "'DM Sans', sans-serif";

const steps = [
  {
    role: "School",
    title: "Smart Pin Assigned",
    desc: "Each student receives a unique Smart Pin ID at enrollment. The device syncs instantly with the school's attendance system.",
    color: "#054FD5",
  },
  {
    role: "System",
    title: "Auto Check-In",
    desc: "As the child enters school, the Smart Pin communicates via the campus network, logging precise arrival time automatically.",
    color: "#054FD5",
  },
  {
    role: "Parent",
    title: "Instant Notification",
    desc: "Parents receive an immediate push notification when their child arrives or departs, with full timestamped records.",
    color: "#054FD5",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-[#161617] py-20 md:py-32 overflow-hidden">
      {/* Top separator line glow */}
      <div
        className="absolute top-0 left-[39px] right-[39px] h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(to right, #161617, rgba(5,79,213,0.5), #161617)",
          filter: "blur(0)",
          boxShadow: "0 0 60px 15px rgba(5,79,213,0.15)",
        }}
      />

      {/* Decorative concentric ellipses */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1030px] h-[602px] pointer-events-none opacity-50">
        <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 1030 602">
          <ellipse cx="515" cy="301" rx="514.75" ry="300.75" stroke="#262626" strokeWidth="0.5" />
          <ellipse cx="515" cy="301" rx="397" ry="232" stroke="#353535" strokeWidth="0.5" />
          <ellipse cx="515" cy="301" rx="278.65" ry="162.34" stroke="#3A3A3A" strokeWidth="0.5" />
          <ellipse cx="515" cy="301" rx="197.35" ry="115.65" stroke="#626262" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Section header */}
        <div className="mb-12 md:mb-20">
          <p
            className="text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-6"
            style={{ fontFamily: sfPro }}
          >
            How it works?
          </p>
          <h2
            className="text-[#E8E8EF] text-4xl md:text-[70px] leading-[1.1] font-medium"
            style={{ fontFamily: sfPro }}
          >
            Smart pin work flow
          </h2>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: Tracking info + steps */}
          <div className="flex-1 max-w-[400px]">
            {/* Main info block */}
            <div className="mb-10 pb-10 border-b border-white/[0.08]">
              <h3
                className="text-[#E8E8EF] text-xl md:text-2xl font-medium leading-[1.33] mb-6"
                style={{ fontFamily: sfPro }}
              >
                Real-Time School Entry and Exit Tracking
              </h3>
              <h4
                className="text-[#858589] text-lg md:text-xl font-medium leading-[1.33] mb-3"
                style={{ fontFamily: sfPro }}
              >
                Automatic Attendance, No Manual Registers
              </h4>
              <p
                className="text-[#858589] text-base md:text-lg leading-relaxed"
                style={{ fontFamily: dmSans }}
              >
                Students are automatically marked present as they enter school premises. Attendance data is instantly available to teachers and parents.
              </p>
            </div>

            {/* Steps with vertical connector */}
            <div className="flex flex-col">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-5">
                  {/* Connector */}
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#E8E8EF] shrink-0" />
                    {i < steps.length - 1 && (
                      <div
                        className="w-px flex-1 min-h-[56px] mt-2"
                        style={{ background: "linear-gradient(to bottom, rgba(232,232,239,0.4), rgba(232,232,239,0.1))" }}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div className={i < steps.length - 1 ? "pb-8" : ""}>
                    <p
                      className="text-[#054FD5] text-xs tracking-[2px] uppercase font-medium mb-1"
                      style={{ fontFamily: sfPro }}
                    >
                      {step.role}
                    </p>
                    <h4
                      className="text-[#E8E8EF] text-base font-medium mb-2"
                      style={{ fontFamily: sfPro }}
                    >
                      {step.title}
                    </h4>
                    <p
                      className="text-[#858589] text-sm leading-relaxed"
                      style={{ fontFamily: dmSans }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: device + phone mockup */}
          <div className="flex-1 flex flex-col items-center gap-8 lg:pt-8">
            {/* Phone with gradient background */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-[24px] opacity-60"
                style={{
                  background: "linear-gradient(to bottom, #03296F, #054FD5)",
                  filter: "blur(32px)",
                  transform: "scale(0.85) translateY(10px)",
                }}
              />
              <div
                className="relative rounded-[24px] overflow-hidden"
                style={{ background: "linear-gradient(to bottom, #03296F, #054FD5)" }}
              >
                <img
                  src={phoneImg}
                  alt="Smart Pin app on phone"
                  className="relative w-[220px] md:w-[280px] object-contain"
                  style={{ maskImage: `url("${imgPlaceholder}")`, maskSize: "100% 100%" }}
                />
                <img
                  src={blueDeviceImg}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity"
                />
              </div>
            </div>

            {/* Notification cards stacked */}
            <div className="flex flex-col gap-3 w-full max-w-[300px]">
              {[
                { title: "Attendance Marked", body: "Aisha entered school at 8:47 AM", time: "now" },
                { title: "School Boundary Alert", body: "Exit recorded — 3:15 PM", time: "2h ago" },
              ].map((n, i) => (
                <div
                  key={i}
                  className="rounded-[12px] p-4 flex gap-3 items-start"
                  style={{
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="w-8 h-8 bg-[#054FD5] rounded-[8px] flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1zm-.5 3h1v4h-1V4zm.5 6a.75.75 0 1 1 0-1.5A.75.75 0 0 1 7 10z" fill="white" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="text-white text-xs font-medium" style={{ fontFamily: sfPro }}>{n.title}</p>
                      <p className="text-white/50 text-xs shrink-0" style={{ fontFamily: dmSans }}>{n.time}</p>
                    </div>
                    <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: dmSans }}>{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom separator line glow */}
      <div
        className="absolute bottom-0 left-[39px] right-[39px] h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(to right, #161617, rgba(5,79,213,0.5), #161617)",
          boxShadow: "0 0 60px 15px rgba(5,79,213,0.15)",
        }}
      />
    </section>
  );
}
