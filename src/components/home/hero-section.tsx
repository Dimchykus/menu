"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current || !imageRef.current) return;

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Schedule the transform update
    rafRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } =
        heroRef.current!.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      const degree = 3;
      const tiltX = (y - 0.5) * degree;
      const tiltY = (x - 0.5) * -degree;

      imageRef.current!.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.1)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!imageRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    imageRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.1)";
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;

    if (!hero || !image) return;

    // Add will-change to optimize for animations
    image.style.willChange = "transform";

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      // Reset will-change
      if (image) {
        image.style.willChange = "auto";
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section
      ref={heroRef}
      className="relative h-[90vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <div
        ref={imageRef}
        className="absolute inset-0 transition-transform duration-300 ease-out"
      >
        <Image
          src={
            "https://www.lakelawnresort.com/wp-content/uploads/2016/05/LakeLawnResort_1878bar-1900x855-c-default.jpg"
          }
          width={1920}
          height={1080}
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mx-auto px-4 relative z-20">
        <div className="text-center backdrop-blur-md bg-white/10 p-12 rounded-2xl border border-white/20 shadow-lg">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Create Your Digital Menu
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Transform your restaurant&apos;s menu into an elegant digital
            experience. Easy to update, beautiful to look at.
          </p>
          <Link
            href="/signin"
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition duration-300 border border-white/30"
          >
            Create Menu Now
          </Link>
        </div>
      </div>
    </section>
  );
}
