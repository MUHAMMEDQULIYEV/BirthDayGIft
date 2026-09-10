import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Gift,
  Heart,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { giftConfig, type LoveCard } from '@/data/gift-config';

const queryClient = new QueryClient();
const totalSteps = 5;

const screenVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.38, ease: [0.4, 0, 1, 1] } },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FloatingAtmosphere() {
  const shapes = [
    { type: 'heart', left: '7%', top: '19%', delay: 0 },
    { type: 'sparkle', left: '87%', top: '14%', delay: 1.1 },
    { type: 'heart', left: '91%', top: '76%', delay: 2.4 },
    { type: 'sparkle', left: '12%', top: '82%', delay: 1.8 },
    { type: 'sparkle', left: '54%', top: '8%', delay: 0.5 },
    { type: 'heart', left: '3%', top: '56%', delay: 3 },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, index) => (
        <motion.div
          className="absolute text-rose-300/60"
          key={`${shape.type}-${index}`}
          style={{ left: shape.left, top: shape.top }}
          animate={{ y: [0, -16, 0], rotate: [0, 8, -4, 0], opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 5 + index * 0.4, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {shape.type === 'heart' ? <Heart size={index % 2 ? 17 : 12} strokeWidth={1.2} /> : <Sparkles size={index % 2 ? 14 : 19} strokeWidth={1.1} />}
        </motion.div>
      ))}
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-rose-200/70 bg-[#fff7ee]/75 px-3 py-2 backdrop-blur-md sm:bottom-7" aria-label={`Addım ${step} / ${totalSteps}`}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const active = index < step;
        return (
          <div
            key={index}
            data-testid={`progress-step-${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${active ? 'w-7 bg-rose-700' : 'w-1.5 bg-rose-200'}`}
          />
        );
      })}
      <span className="ml-1 font-mono text-[9px] tracking-[0.16em] text-rose-900/55">{String(step).padStart(2, '0')} / 05</span>
    </div>
  );
}

function Ornament() {
  return (
    <div className="ornament-line mx-auto flex w-full max-w-[240px] items-center gap-3 text-amber-700" aria-hidden="true">
      <span className="text-xs text-amber-700/80">✦</span>
      <span className="size-1 rounded-full bg-amber-700/60" />
      <span className="text-xs text-amber-700/80">✦</span>
    </div>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.section variants={screenVariants} initial="initial" animate="animate" exit="exit" className="relative flex min-h-[100dvh] items-center justify-center px-6 py-20 text-center">
      <div className="absolute left-1/2 top-1/2 size-[min(78vw,540px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-200/45 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 flex max-w-xl flex-col items-center">
        {giftConfig.entrance.eyebrow && (
          <motion.div custom={0} variants={itemVariants} initial="initial" animate="animate" className="mb-9 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-rose-800/65">
            <Sparkles size={13} strokeWidth={1.5} />
            {giftConfig.entrance.eyebrow}
            <Sparkles size={13} strokeWidth={1.5} />
          </motion.div>
        )}
        <motion.div custom={1} variants={itemVariants} initial="initial" animate="animate" className="mb-7">
          <div className="mx-auto grid size-16 place-items-center rounded-full border border-amber-700/25 bg-amber-100/40 text-amber-800 shadow-[0_8px_24px_rgba(160,110,40,0.09)]">
            <Heart size={24} strokeWidth={1.1} fill="currentColor" />
          </div>
        </motion.div>
        <motion.h1 custom={2} variants={itemVariants} initial="initial" animate="animate" className="font-display whitespace-pre-line text-6xl font-medium leading-[0.86] tracking-[-0.04em] text-rose-950 sm:text-8xl">
          {giftConfig.entrance.title}
        </motion.h1>
        <motion.p custom={3} variants={itemVariants} initial="initial" animate="animate" className="mt-8 max-w-xs text-sm leading-7 text-rose-900/65 sm:text-base">
          {giftConfig.entrance.note}
        </motion.p>
        <motion.button
          custom={4}
          variants={itemVariants}
          initial="initial"
          animate="animate"
          type="button"
          data-testid="button-start-gift"
          onClick={onStart}
          className="group mt-10 inline-flex items-center gap-4 rounded-full bg-rose-800 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-50 shadow-[0_12px_30px_rgba(124,42,67,0.2)] transition hover:-translate-y-0.5 hover:bg-rose-900 active:translate-y-0"
        >
          {giftConfig.entrance.button}
          <span className="grid size-7 place-items-center rounded-full bg-rose-50/15 transition group-hover:translate-x-1"><ArrowRight size={15} /></span>
        </motion.button>
        <motion.p custom={5} variants={itemVariants} initial="initial" animate="animate" className="mt-7 font-script text-lg text-rose-800/55">yalnız ikimiz üçün</motion.p>
      </div>
    </motion.section>
  );
}

function BirthdayScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.section variants={screenVariants} initial="initial" animate="animate" exit="exit" className="relative flex min-h-[100dvh] items-center justify-center px-6 py-24">
      <div className="relative z-10 grid w-full max-w-5xl items-center gap-14 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <motion.div initial={{ opacity: 0, rotate: -5, x: -25 }} animate={{ opacity: 1, rotate: -3, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative mx-auto w-full max-w-xs">
          <div className="absolute -inset-4 rounded-[10rem] border border-amber-700/20" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[10rem] border-[7px] border-[#fff7ee] bg-rose-100 shadow-[0_24px_60px_rgba(124,42,67,0.14)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,243,225,.95),transparent_28%),radial-gradient(circle_at_75%_72%,rgba(205,119,139,.5),transparent_32%),linear-gradient(145deg,#f6d9d3,#e5abb5_50%,#b95e78)]" />
            <div className="absolute -bottom-6 left-1/2 size-52 -translate-x-1/2 rounded-full border border-[#fff7ee]/60 bg-rose-900/15" />
            <div className="absolute left-9 top-12 font-display text-7xl text-cream/80">N</div>
            <div className="absolute bottom-12 right-6 h-28 w-24 rounded-t-full border border-[#fff7ee]/50 bg-rose-800/15" />
            <div className="absolute bottom-7 left-7 font-script text-xl text-cream/90">sənin günün</div>
          </div>
          <div className="absolute -bottom-7 -right-5 grid size-16 place-items-center rounded-full border border-amber-700/25 bg-amber-100 text-amber-800 shadow-lg"><span className="font-display text-2xl">24</span></div>
        </motion.div>
        <div className="max-w-xl">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.32em] text-rose-800/60">{giftConfig.birthday.eyebrow}</p>
          <h2 className="font-display whitespace-pre-line text-6xl font-medium leading-[.88] tracking-[-.04em] text-rose-950 sm:text-8xl">{giftConfig.birthday.title}</h2>
          <div className="my-8"><Ornament /></div>
          <p className="max-w-md whitespace-pre-line text-base leading-8 text-rose-900/70">{giftConfig.birthday.body}</p>
          <p className="mt-8 font-script text-2xl text-rose-800/70">{giftConfig.birthday.signature}</p>
          <button type="button" data-testid="button-next-birthday" onClick={onNext} className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-800 transition hover:gap-5">
            Başlayaq ♡ <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function LoveCardItem({ card, index, flipped, onFlip }: { card: LoveCard; index: number; flipped: boolean; onFlip: () => void }) {
  return (
    <motion.button
      type="button"
      data-testid={`card-love-${index + 1}`}
      custom={index}
      variants={itemVariants}
      initial="initial"
      animate="animate"
      onClick={onFlip}
      className="group relative min-h-[190px] w-full text-left [perspective:900px]"
      aria-pressed={flipped}
    >
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="relative h-full min-h-[190px] w-full [transform-style:preserve-3d]">
        <div className="absolute inset-0 flex min-h-[190px] flex-col justify-between rounded-[1.5rem] border border-rose-200/80 bg-rose-50/70 p-5 shadow-[0_12px_30px_rgba(124,42,67,0.06)] [backface-visibility:hidden] transition group-hover:-translate-y-1 group-hover:border-rose-300">
          <span className="font-mono text-[10px] tracking-[.2em] text-amber-700/70">{card.mark}</span>
          <div><Heart size={19} strokeWidth={1.2} className="mb-4 text-rose-700/70" /><h3 className="font-display text-3xl text-rose-950">{card.title}</h3></div>
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[.17em] text-rose-900/45">toxun <ChevronDown size={13} /></span>
        </div>
        <div className="absolute inset-0 flex min-h-[190px] rotate-y-180 flex-col justify-center rounded-[1.5rem] border border-amber-700/25 bg-amber-100/75 p-6 text-center [backface-visibility:hidden]">
          <Sparkles size={18} className="mx-auto mb-4 text-amber-800/70" />
          <p className="font-display text-2xl leading-tight text-rose-950">{card.detail}</p>
        </div>
      </motion.div>
    </motion.button>
  );
}

function LovesScreen({ onNext }: { onNext: () => void }) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const toggle = (index: number) => setFlipped((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  return (
    <motion.section variants={screenVariants} initial="initial" animate="animate" exit="exit" className="relative flex min-h-[100dvh] items-center justify-center px-6 py-24">
      <div className="relative z-10 w-full max-w-5xl">
        <div className="mb-10 max-w-xl">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-rose-800/60">{giftConfig.loves.eyebrow}</p>
          <h2 className="font-display whitespace-pre-line text-6xl font-medium leading-[.88] tracking-[-.04em] text-rose-950 sm:text-8xl">{giftConfig.loves.title}</h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-rose-900/60">{giftConfig.loves.hint}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {giftConfig.loves.cards.map((card, index) => <LoveCardItem key={card.mark} card={card} index={index} flipped={flipped.includes(index)} onFlip={() => toggle(index)} />)}
        </div>
        <div className="mt-10 flex items-center justify-between gap-6 border-t border-rose-200/80 pt-6">
          <span className="text-xs text-rose-900/50"><Check size={15} className="mr-2 inline text-amber-700" />{flipped.length} / {giftConfig.loves.cards.length} kəşf edildi</span>
          <button type="button" data-testid="button-next-loves" onClick={onNext} className="inline-flex items-center gap-3 rounded-full bg-rose-800 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.18em] text-rose-50 transition hover:bg-rose-900">Əsas hədiyyə <ArrowRight size={15} /></button>
        </div>
      </div>
    </motion.section>
  );
}

function GiftBox({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  return (
    <button type="button" data-testid="button-open-gift-box" onClick={onOpen} aria-label={opened ? 'Hədiyyə açıldı' : 'Hədiyyə qutusunu aç'} className="group relative mx-auto mt-12 block h-64 w-72 cursor-pointer sm:h-72 sm:w-80">
      <motion.div animate={opened ? { y: 12, rotate: -1 } : { y: 0, rotate: -1 }} className="absolute bottom-0 left-1/2 h-40 w-64 -translate-x-1/2 rounded-b-[1.8rem] border border-rose-900/10 bg-gradient-to-br from-rose-700 to-rose-900 shadow-[0_22px_35px_rgba(124,42,67,0.2)] sm:h-44 sm:w-72" />
      <div className="absolute bottom-0 left-1/2 h-40 w-10 -translate-x-1/2 bg-amber-200/55 sm:h-44" />
      <motion.div animate={opened ? { y: -86, rotate: -14, x: -6 } : { y: 0, rotate: -1, x: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} className="absolute bottom-[135px] left-1/2 z-10 h-16 w-72 -translate-x-1/2 rounded-xl border border-rose-900/10 bg-gradient-to-br from-rose-600 to-rose-800 shadow-[0_14px_25px_rgba(124,42,67,0.18)] sm:bottom-[148px] sm:w-80">
        <div className="absolute left-1/2 h-full w-9 -translate-x-1/2 bg-amber-200/60" />
        <div className="absolute -top-3 left-1/2 size-8 -translate-x-1/2 rounded-full border-4 border-amber-200/70 bg-amber-100" />
      </motion.div>
      <AnimatePresence>
        {opened && <motion.div initial={{ opacity: 0, y: 20, scale: .7 }} animate={{ opacity: 1, y: -72, scale: 1 }} className="absolute left-1/2 top-6 z-20 -translate-x-1/2 text-center"><Sparkles className="mx-auto text-amber-700" size={34} /><span className="mt-2 block whitespace-nowrap font-script text-xl text-rose-800">sənə olan sevgim</span></motion.div>}
      </AnimatePresence>
    </button>
  );
}

function CelebrationBurst({ active }: { active: boolean }) {
  const pieces = Array.from({ length: 18 }, (_, index) => ({
    left: `${8 + ((index * 47) % 84)}%`,
    delay: `${(index % 6) * 0.12}s`,
    duration: `${2.6 + (index % 4) * 0.35}s`,
    rotate: `${(index % 2 ? 1 : -1) * (18 + index * 7)}deg`,
  }));
  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
          {pieces.map((piece, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: '48vh', scale: 0.5, rotate: 0 }}
              animate={{ opacity: [0, 1, 0], y: ['48vh', '108vh'], scale: [0.5, 1, 0.8], rotate: piece.rotate }}
              transition={{ duration: Number(piece.duration.replace('s', '')), delay: Number(piece.delay.replace('s', '')), ease: 'easeOut' }}
              className="absolute top-0 h-3 w-2 rounded-full bg-rose-700/60"
              style={{ left: piece.left }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

function GiftScreen({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState(false);
  return (
    <motion.section variants={screenVariants} initial="initial" animate="animate" exit="exit" className="relative flex min-h-[100dvh] items-center justify-center px-6 py-24 text-center">
      <div className="relative z-10 w-full max-w-2xl">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-rose-800/60">{giftConfig.gift.eyebrow}</p>
        <h2 className="font-display whitespace-pre-line text-6xl font-medium leading-[.88] tracking-[-.04em] text-rose-950 sm:text-8xl">{giftConfig.gift.title}</h2>
        <p className="mt-6 text-sm text-rose-900/55">{opened ? giftConfig.gift.opened : giftConfig.gift.instruction}</p>
        <GiftBox opened={opened} onOpen={() => setOpened(true)} />
        <AnimatePresence>
          {opened && <motion.button type="button" data-testid="button-next-gift" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onClick={onNext} className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-rose-300 bg-rose-50 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.18em] text-rose-900 transition hover:bg-rose-100">{giftConfig.gift.button} <ArrowRight size={15} /></motion.button>}
        </AnimatePresence>
      </div>
      <CelebrationBurst active={opened} />
    </motion.section>
  );
}

function LetterScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.section variants={screenVariants} initial="initial" animate="animate" exit="exit" className="relative flex min-h-[100dvh] items-center justify-center px-6 py-24">
      <div className="relative z-10 grid w-full max-w-5xl gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-20">
        <div className="flex flex-col justify-center">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-rose-800/60">{giftConfig.letter.eyebrow}</p>
          <h2 className="font-display whitespace-pre-line text-6xl font-medium leading-[.88] tracking-[-.04em] text-rose-950 sm:text-8xl">{giftConfig.letter.title}</h2>
          <div className="mt-8 flex items-center gap-3 text-rose-800/60"><Heart size={16} fill="currentColor" /><span className="font-script text-xl">sözlər sənə çatsın</span></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 25, rotate: 1.2 }} animate={{ opacity: 1, y: 0, rotate: 1.2 }} transition={{ duration: .8, delay: .2 }} className="relative mx-auto w-full max-w-xl bg-[#fcf2e2] px-7 py-10 shadow-[0_22px_60px_rgba(124,42,67,0.13)] sm:px-12 sm:py-14">
          <div className="absolute inset-3 border border-amber-700/20" />
          <div className="relative space-y-5 font-display text-[1.35rem] leading-[1.25] text-rose-950/85 sm:text-[1.5rem]">
            {giftConfig.letter.paragraphs.map((paragraph, index) => <motion.p key={paragraph} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 + index * .16 }}>{paragraph}</motion.p>)}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }} className="pt-2 font-script text-3xl text-rose-800">{giftConfig.letter.signature}</motion.p>
          </div>
        </motion.div>
      </div>
      <button type="button" data-testid="button-next-letter" onClick={onNext} className="absolute bottom-24 right-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-rose-800 transition hover:gap-5 sm:right-12">Son bir şey <ArrowRight size={16} /></button>
    </motion.section>
  );
}

function FinalScreen({ onRestart }: { onRestart: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setCelebrating(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <motion.section variants={screenVariants} initial="initial" animate="animate" exit="exit" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-24 text-center">
      <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-1/2 top-1/2 size-[min(80vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-200/55 blur-3xl" />
      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', delay: .15 }} className="mb-9 grid size-20 place-items-center rounded-full border border-amber-700/25 bg-amber-100/70 text-amber-800 shadow-[0_12px_30px_rgba(160,110,40,.1)]"><Gift size={30} strokeWidth={1.1} /></motion.div>
        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.32em] text-rose-800/60">{giftConfig.final.eyebrow}</p>
        <h2 className="font-display whitespace-pre-line text-6xl font-medium leading-[.86] tracking-[-.04em] text-rose-950 sm:text-8xl">{giftConfig.final.title}<br />{giftConfig.name} ♡</h2>
        <div className="my-8"><Ornament /></div>
        <p className="max-w-md whitespace-pre-line text-base leading-8 text-rose-900/70">{giftConfig.final.body}</p>
        <p className="mt-8 font-script text-2xl text-rose-800/70">həmişə sənin,</p>
        <motion.button type="button" data-testid="button-restart-gift" whileTap={{ scale: .96 }} onClick={() => setConfirming(true)} className="mt-10 inline-flex items-center gap-3 rounded-full border border-rose-300 bg-rose-50 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[.18em] text-rose-900 transition hover:bg-rose-100"><RotateCcw size={14} /> {giftConfig.final.button}</motion.button>
        <p className="mt-8 text-[10px] uppercase tracking-[.18em] text-rose-900/35">{giftConfig.final.footer}</p>
      </div>
      <CelebrationBurst active={celebrating} />
      <AnimatePresence>
        {confirming && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 grid place-items-center bg-rose-950/20 px-6 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm rounded-3xl border border-rose-200 bg-[#fff7ee] p-7 text-center shadow-2xl">
            <Heart className="mx-auto mb-4 text-rose-700" fill="currentColor" size={22} />
            <h3 className="font-display text-3xl text-rose-950">Yenidən başlayaq?</h3>
            <p className="mt-3 text-sm leading-6 text-rose-900/60">Hər şeyi ilk dəfəki kimi yenidən kəşf edə bilərsən.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" data-testid="button-cancel-restart" onClick={() => setConfirming(false)} className="rounded-full border border-rose-200 px-5 py-2.5 text-xs font-semibold text-rose-900 transition hover:bg-rose-50">Hələ yox</button>
              <button type="button" data-testid="button-confirm-restart" onClick={onRestart} className="rounded-full bg-rose-800 px-5 py-2.5 text-xs font-semibold text-rose-50 transition hover:bg-rose-900">Bəli, başlayaq</button>
            </div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </motion.section>
  );
}

function Experience() {
  const [step, setStep] = useState(0);
  const next = () => setStep((current) => Math.min(totalSteps, current + 1));
  const restart = () => setStep(0);
  return (
    <main className="gift-noise relative min-h-[100dvh] overflow-hidden bg-[#f8eee9]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,rgba(238,189,194,.38),transparent_42%),radial-gradient(ellipse_at_bottom_right,rgba(240,212,170,.2),transparent_40%)]" />
      <FloatingAtmosphere />
      <AnimatePresence mode="wait">
        {step === 0 && <IntroScreen key="intro" onStart={next} />}
        {step === 1 && <BirthdayScreen key="birthday" onNext={next} />}
        {step === 2 && <LovesScreen key="loves" onNext={next} />}
        {step === 3 && <GiftScreen key="gift" onNext={next} />}
        {step === 4 && <LetterScreen key="letter" onNext={next} />}
        {step === 5 && <FinalScreen key="final" onRestart={restart} />}
      </AnimatePresence>
      {step > 0 && <Progress step={step} />}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Experience} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;