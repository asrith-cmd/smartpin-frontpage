const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Rounded', 'Helvetica Neue', sans-serif";
const dmSans = "'DM Sans', sans-serif";

const testimonials = [
  {
    quote:
      "Smart Pin has completely transformed how we manage attendance. Parents love the instant notifications — it's given our whole school community peace of mind.",
    name: "Sarah Chen",
    role: "Principal, Westfield Academy",
    initials: "SC",
  },
  {
    quote:
      "As a parent, knowing exactly when my child arrives at school changed everything. The app is simple, the alerts are instant, and I feel connected every school day.",
    name: "Marcus Johnson",
    role: "Parent of two students",
    initials: "MJ",
  },
  {
    quote:
      "We eliminated manual attendance registers entirely and reduced administrative time by over 80%. The data accuracy has been flawless since day one.",
    name: "Dr. Emily Torres",
    role: "IT Director, Oakwood School District",
    initials: "ET",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#161617] py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-4"
            style={{ fontFamily: sfPro }}
          >
            What people are saying
          </p>
          <h2
            className="text-[#E8E8EF] text-3xl md:text-5xl leading-[1.1] font-medium"
            style={{ fontFamily: sfPro }}
          >
            Trusted by Parents &amp; Schools
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col justify-between p-6 md:p-8 rounded-[20px] border border-white/[0.08]"
              style={{
                background: "rgba(255,255,255,0.03)",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Quote */}
              <p
                className="text-[#858589] text-base md:text-lg leading-relaxed mb-8"
                style={{ fontFamily: dmSans }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-[#054FD5] flex items-center justify-center text-white text-sm font-medium shrink-0"
                  style={{ fontFamily: sfPro }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="text-[#E8E8EF] text-sm font-medium"
                    style={{ fontFamily: sfPro }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[#858589] text-xs"
                    style={{ fontFamily: dmSans }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
