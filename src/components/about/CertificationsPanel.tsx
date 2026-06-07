import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "@/data/about";

export function CertificationsPanel() {
  return (
    <div className="flex flex-col gap-3">
      {CERTIFICATIONS.map((cert) => (
        <a
          key={cert.name}
          href={cert.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 sm:gap-5 p-4 rounded-xl bg-white/50 border border-white/70 shadow-sm hover:bg-white/70 hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="relative size-16 sm:size-20 shrink-0">
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <span className="font-poppins font-bold text-sm sm:text-base text-neutral-800 leading-snug">
              {cert.name}
            </span>
            <span className="text-xs text-neutral-400">{cert.issuer}</span>
            <span className="mt-1.5 inline-flex w-fit items-center gap-1 font-mono text-[10px] tracking-wide text-cyan-600/90 group-hover:text-cyan-700 transition-colors">
              資格を検証
              <ExternalLink size={11} />
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 shrink-0 self-start">
            {cert.issued}
          </span>
        </a>
      ))}
    </div>
  );
}
