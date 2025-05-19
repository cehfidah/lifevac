import { Tag } from "lucide-react";

export default function LifetimeReplacementBanner() {
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {/* Message */}
      <p className="text-sm font-semibold text-gray-800 mb-2">
        Congrats! You get{" "}
        <span className="text-black font-bold">
          FREE lifetime replacement!!
        </span>{" "}
        🎉
      </p>

      {/* Progress bar container with positioned tag */}
      <div className="relative">
        {/* Tag above the right end */}
        <div className="absolute -top-2 -right-3 bg-white border rounded-full p-1 shadow-md border-black">
          <Tag className="w-4 h-4 text-gray-500" />
        </div>

        {/* Progress bar */}
        <div className="h-3 w-full bg-gray-200 rounded-md overflow-hidden">
          <div className="animated-stripes h-full w-full" />
        </div>
      </div>
    </div>
  );
}
