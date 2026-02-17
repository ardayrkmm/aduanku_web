'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      /* ======================================
         SPLIT TEXT MANUAL (WORD BASED)
      ====================================== */
  const splitText = (el: HTMLElement): HTMLElement[] => {
  if (!el) return [];

  const lines = el.innerHTML.split('<br>');

  el.innerHTML = lines
    .map((line) => {
      const words = line.trim().split(' ');
      const wrappedWords = words
        .map(
          (word) => `
            <span class="word-wrapper inline-block overflow-hidden">
              <span class="word inline-block will-change-transform">${word}</span>
            </span>
          `
        )
        .join(' ');

      return `<div class="block">${wrappedWords}</div>`;
    })
    .join('');

  return Array.from(el.querySelectorAll('.word')) as HTMLElement[];
};



      const headingWords = splitText(headingRef.current!);
      const descWords = splitText(descRef.current!);

      /* ======================================
         1️⃣ HEADING + DESCRIPTION ANIMATION
      ====================================== */
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      textTl
        .from(headingWords, {
          y: 40,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: 'power3.out',
        })
        .from(
          descWords,
          {
            y: 30,
            opacity: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        );

      /* ======================================
         2️⃣ PHONE ENTRANCE (NON PIN)
      ====================================== */
      gsap.fromTo(
        phoneRef.current,
        {
          y: 280,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phoneRef.current,
            start: 'top 85%',
          },
        }
      );

      /* ======================================
         3️⃣ PHONE SCROLL STORY (PIN + SCRUB)
      ====================================== */
      const phoneTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=800',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      phoneTl
        // hold / pause visual sebentar
        .to({}, { duration: 0.3 })
        // phone naik perlahan mengikuti scroll
        .to(phoneRef.current, {
          y: 0,
          ease: 'none',
          duration: 1,
        });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center text-center px-6 overflow-hidden pt-28 md:pt-32"
    >
      {/* Background Image */}
      <Image
        src="/svg/Desktop.svg"
        alt="Hero Background"
        fill
        priority
        className="object-cover -z-10"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6"
        >
          Satu Aduanmu
          <br />
          Merubah Sudut Kota
        </h1>

        {/* Subheading */}
        <p
          ref={descRef}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          Sampaikan aspirasi, keluhan, dan laporan Anda secara cepat, transparan,
          dan terintegrasi langsung dengan pemerintah Kota Tegal.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <button
                  className="
                    flex items-center gap-3
                    bg-white text-slate-900
                    font-semibold
                    px-6 py-3
                    rounded-full
                    shadow-lg
                    hover:scale-[1.03]
                    transition-all
                    duration-300
                  "
                >
                  <span>Cek Sekarang</span>

                  <span className="w-8 h-8 flex items-center justify-center bg-[#023E8A] rounded-full">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>
        </div>
      </div>

      {/* Phone Section */}
      <div
        ref={phoneRef}
        className="mt-10 w-[400px] aspect-square relative z-10"
      >
        <Image
          src="/svg/phone.svg"
          alt="Phone Preview"
          fill
          className="object-contain"
        />

        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[900px] h-[200px] bg-white rounded-t-[120px]" />
      </div>
    </section>
  );
}
