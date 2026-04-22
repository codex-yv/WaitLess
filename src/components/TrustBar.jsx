const brands = [
  "Northwind Bank",
  "MedCare Hospital",
  "CityGov Services",
  "Luxe Salon",
  "Swift Clinics",
  "PaxBank",
  "StyleCo",
];

export default function TrustBar() {
  return (
    <section
      data-testid="trust-bar"
      className="relative py-16 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-zinc-500">
          Trusted by modern businesses &amp; service providers
        </p>

        <div className="mt-8 overflow-hidden relative [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex gap-16 w-max">
            {[...brands, ...brands].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-zinc-500 hover:text-zinc-200 transition-colors"
                data-testid={`brand-${i}`}
              >
                <div className="w-8 h-8 rounded-md glass grid place-items-center font-mono text-[10px] text-zinc-400">
                  {b
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <span className="font-satoshi text-xl font-medium whitespace-nowrap">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
