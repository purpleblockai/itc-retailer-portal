import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#6a1b9a] relative overflow-hidden">
      {/* Background curved lines - updated to match the image better */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute border border-[#8e24aa]/30 rounded-full"
            style={{
              width: `${(i + 1) * 15}%`,
              height: `${(i + 1) * 30}%`,
              left: "-5%",
              bottom: "-10%",
              borderWidth: "1px",
              borderTopWidth: "0",
              borderRightWidth: "0",
              borderRadius: "0 0 0 100%",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col justify-between min-h-screen">
        {/* Header - updated styling to match image more precisely */}
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">Spiel</h1>
          <h1 className="text-5xl font-bold text-[#3a0e5e] tracking-wider leading-tight">Portal</h1>
        </div>

        {/* Footer with registration text and button - updated line color */}
        <div className="flex justify-between items-center pb-8">
          <div className="border-l-4 border-[#3a0e5e] pl-4 py-2">
            <h2 className="text-2xl font-medium text-white">
              Retailer
              <br />
              Registration
              <br />& Verification
            </h2>
          </div>

          {/* Fixed the navigation by using a direct href instead of Link component */}
          <a href="/verification" className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors inline-flex">
            <ArrowRight className="h-6 w-6 text-[#6a1b9a]" />
          </a>
        </div>
      </div>
    </main>
  )
}
