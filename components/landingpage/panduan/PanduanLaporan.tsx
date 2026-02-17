'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PanduanLaporan() {
  useEffect(() => {
    const pinCards = gsap.utils.toArray<HTMLElement>('.pin-card');

    pinCards.forEach((card, index) => {
      if (index < pinCards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: pinCards[pinCards.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });

        ScrollTrigger.create({
          trigger: pinCards[index + 1],
          start: 'top bottom',
          end: 'top top',
          onUpdate: (self) => {
            const progress = self.progress;

            gsap.set(card, {
              scale: 1 - progress * 0.25,
              rotation: index % 2 === 0 ? progress * 5 : -progress * 5,
              rotationX: index % 2 === 0 ? progress * 40 : -progress * 40,
            });

            gsap.set(card.querySelector('.overlay'), {
              opacity: progress * 0.4,
            });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="w-full overflow-x-hidden bg-white text-slate-900">

      {/* INTRO */}
      {/* INTRO */}
<div className="relative h-screen flex flex-col justify-center items-center text-center px-[8vw] overflow-hidden">

  <Image
    src="/svg/Desktop.svg"
    alt="Hero Background"
    fill
    priority
    className="object-cover"
  />

  <div className="relative z-10">
    <h2 className="text-white text-[26px] md:text-[38px] lg:text-[42px] font-semibold leading-[1.25] mb-6">
      Langkah Awal
      <br />
      Mengubah Sudut Kota
    </h2>

    <p className="text-white/80 max-w-3xl text-[16px] md:text-[18px]">
      Aduanku hadir sebagai jembatan antara masyarakat dan pemerintah.
    </p>
  </div>

</div>


      {/* STEP 01 */}
      <section className="pin-card relative flex justify-between gap-8 px-[8vw] py-[10vh] bg-white border-b border-slate-200 perspective-[1000px]">
        <div className="overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
        <span className="text-[10vw] md:text-[6vw] font-semibold text-[#023E8A]/20">(01)</span>

        <div className="w-[60%]">
          <h3 className="font-semibold tracking-[-0.02em] text-[22px] md:text-[28px] mb-4">
            Buka Website Aduanku
          </h3>
          <p className="text-slate-600 leading-relaxed text-[16px] md:text-[18px] max-w-[70%]">
            Akses website Aduanku melalui browser favorit Anda di perangkat
            apapun. Pastikan koneksi internet stabil agar proses pelaporan
            berjalan lancar.
          </p>
        </div>
      </section>

      {/* STEP 02 */}
      <section className="pin-card relative flex justify-between gap-8 px-[8vw] py-[10vh] bg-white border-b border-slate-200 perspective-[1000px]">
        <div className="overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
        <span className="text-[10vw] md:text-[6vw] font-semibold text-[#023E8A]/20">(02)</span>

        <div className="w-[60%]">
          <h3 className="font-semibold tracking-[-0.02em] text-[22px] md:text-[28px] mb-4">
            Masuk ke Halaman Laporan
          </h3>
          <p className="text-slate-600 leading-relaxed text-[16px] md:text-[18px] max-w-[70%]">
            Pilih menu laporan dan tuliskan aduan atau permasalahan yang Anda
            temui secara jelas dan detail agar mudah diproses.
          </p>
        </div>
      </section>

      {/* STEP 03 */}
      <section className="pin-card relative flex justify-between gap-8 px-[8vw] py-[10vh] bg-white border-b border-slate-200 perspective-[1000px]">
        <div className="overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
        <span className="text-[10vw] md:text-[6vw] font-semibold text-[#023E8A]/20">(03)</span>

        <div className="w-[60%]">
          <h3 className="font-semibold tracking-[-0.02em] text-[22px] md:text-[28px] mb-4">
            Dapatkan Kode Aduan
          </h3>
          <p className="text-slate-600 leading-relaxed text-[16px] md:text-[18px] max-w-[70%]">
            Setelah laporan dikirim, sistem akan memberikan kode aduan unik
            yang dapat digunakan untuk melacak status laporan Anda.
          </p>
        </div>
      </section>

      {/* STEP 04 */}
      <section className="pin-card relative flex justify-between gap-8 px-[8vw] py-[10vh] bg-white border-b border-slate-200 perspective-[1000px]">
        <div className="overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
        <span className="text-[10vw] md:text-[6vw] font-semibold text-[#023E8A]/20">(04)</span>

        <div className="w-[60%]">
          <h3 className="font-semibold tracking-[-0.02em] text-[22px] md:text-[28px] mb-4">
            Pantau Status Aduan
          </h3>
          <p className="text-slate-600 leading-relaxed text-[16px] md:text-[18px] max-w-[70%]">
            Pantau perkembangan laporan Anda mulai dari status dikirim,
            diterima, hingga sedang diproses oleh instansi terkait.
          </p>
        </div>
      </section>

      {/* STEP 05 */}
      <section className="pin-card relative flex justify-between gap-8 px-[8vw] py-[10vh] bg-white perspective-[1000px]">
        <div className="overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
        <span className="text-[10vw] md:text-[6vw] font-semibold text-[#023E8A]/20">(05)</span>

        <div className="w-[60%]">
          <h3 className="font-semibold tracking-[-0.02em] text-[22px] md:text-[28px] mb-4">
            Proses & Tindak Lanjut
          </h3>
          <p className="text-slate-600 leading-relaxed text-[16px] md:text-[18px] max-w-[70%]">
            Tim kami bersama instansi terkait akan menindaklanjuti aduan Anda
            secara profesional dan transparan hingga selesai.
          </p>
        </div>
      </section>

    </section>
  );
}
