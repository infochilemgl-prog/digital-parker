// @ts-nocheck
"use client";
// @ts-nocheck
// @ts-nocheck
import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Gauge,
  Instagram,
  LayoutGrid,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const problems = [
  "Publicas sin estrategia",
  "Inviertes sin sistema",
  "No conviertes clientes",
  "No tienes estructura",
];

const diagnosticAreas = [
  "Contenido",
  "Anuncios",
  "Captación",
  "Redes",
  "Posicionamiento",
  "Ventas",
];

const comparisonRows = [
  ["Contenido", "Improvisado", "Estratégico"],
  ["Anuncios", "Sin retorno", "Optimizados"],
  ["Captación", "Inexistente", "Automatizada"],
  ["Seguimiento", "Nulo", "Sistema activo"],
  ["Estructura", "Caótica", "Ordenada"],
  ["Escalabilidad", "Limitada", "Predecible"],
];

const channels = ["Facebook", "Instagram", "TikTok", "Google Ads", "Meta Ads"];
const outcomes = ["Seguidores", "Leads", "Mensajes", "Ventas"];

const plans = [
  {
    name: "Plan Base",
    price: "$80.000",
    oldPrice: "$117.000",
    cta: "Comenzar diagnóstico",
    result: "Resultados notorios entre la primera y segunda semana",
    features: [
      "Diagnóstico completo",
      "Estructura inicial",
      "Plan claro desde el día 1",
      "Sistema básico de crecimiento",
    ],
    highlighted: false,
    checkoutLink: "https://tudominio.com/checkout/plan-base",
  },
  {
    name: "Plan Crecimiento",
    price: "$125.000",
    oldPrice: "$170.000",
    cta: "Trabajar con Digital Parker",
    result: "Trabajamos contigo y evaluamos si continuar, escalar o delegar el sistema a tu empresa.",
    features: [
      "Todo el plan base",
      "Optimización de contenido",
      "Optimización de captación",
      "Enfoque en ventas",
      "Más seguidores",
      "Más formularios abiertos",
      "Más ventas por WhatsApp",
      "Más ventas por Instagram",
    ],
    highlighted: true,
    checkoutLink: "https://tudominio.com/checkout/plan-crecimiento",
  },
];

const faqs = [
  {
    q: "¿Esto es una agencia de marketing?",
    a: "No. Digital Parker diagnostica tu negocio, detecta lo que falta y construye el sistema digital necesario para generar resultados en corto plazo.",
  },
  {
    q: "¿En cuánto tiempo se ven resultados?",
    a: "Los primeros cambios suelen verse entre la primera y segunda semana, dependiendo del punto de partida, la rapidez de implementación y el presupuesto disponible.",
  },
  {
    q: "¿Trabajan con cualquier negocio?",
    a: "No necesariamente. Primero evaluamos si existe compatibilidad entre tu necesidad, tu nivel de urgencia y el sistema que más te conviene implementar.",
  },
  {
    q: "¿Qué pasa después de pagar?",
    a: "Se activa un onboarding automático con correo, WhatsApp, formulario inicial y acceso al sistema de trabajo para empezar rápido.",
  },
];
function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
function GradientButton({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Button
      {...props}
      className={`h-12 rounded-2xl bg-green-600 px-6 text-sm font-semibold ${className}`}
    >
      {children}
    </Button>
  );
}

function SecondaryButton({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Button
      variant="outline"
      {...props}
      className={`h-12 rounded-2xl border-neutral-300 px-6 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50 ${className}`}
    >
      {children}
    </Button>
  );
}

const partnerLogos = [
  { name: "Digital Parker", src: "/digital-parker-logo.png", className: "h-10 w-auto object-contain" },
  { name: "Meta Ads", src: "/meta-logo.png", className: "h-12 w-auto object-contain" },
  { name: "Google Ads", src: "/google-ads-logo.png", className: "h-10 w-auto object-contain" },
  { name: "Instagram", src: "/instagram-logo.png", className: "h-12 w-auto object-contain" },
  { name: "TikTok Ads", src: "/tiktok-ads-logo.png", className: "h-10 w-auto object-contain" },
];

export default function DigitalParkerLanding() {
  const [form, setForm] = useState({
    nombre: "",
    negocio: "",
    redes: "",
    problema: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const plansRef = useRef<HTMLDivElement | null>(null);

  const whatsappUrl = useMemo(() => {
    const base = "https://wa.me/56900000000";
    const text = encodeURIComponent(
      "Hola Digital Parker. Quiero solicitar un diagnóstico."
    );
    return `${base}?text=${text}`;
  }, [form]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    window.open(whatsappUrl, "_blank");
  };

  const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const scrollPlans = (direction: "left" | "right") => {
  const container = plansRef.current;
  if (!container) return;

  const amount = Math.min(420, container.clientWidth * 0.92);

  container.scrollBy({
    left: direction === "left" ? -amount : amount,
    behavior: "smooth",
  });
};

  return (
    <div className="min-h-screen bg-white text-neutral-950 antialiased selection:bg-green-100 selection:text-green-900">
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-2xl border border-neutral-200 bg-white px-3 py-2 shadow-sm">
              <img src="/digital-parker-logo.png" alt="Digital Parker" className="h-8 w-auto object-contain" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold tracking-[0.18em] text-neutral-500">DIGITAL PARKER</p>
              <p className="text-xs text-neutral-500">Sistemas digitales que generan resultados</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <button onClick={() => scrollTo("como-funciona")} className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950">
              Cómo funciona
            </button>
            <button onClick={() => scrollTo("planes")} className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950">
              Planes
            </button>
            <button onClick={() => scrollTo("diagnostico")} className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950">
              Diagnóstico
            </button>
          </nav>

          <GradientButton onClick={() => scrollTo("diagnostico")}>
            Solicitar diagnóstico
          </GradientButton>
        </div>
      </header>

      <main>
        <Section id="hero" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(22,163,74,0.12),transparent_28%),radial-gradient(circle_at_left,rgba(0,0,0,0.05),transparent_22%)]" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
              <Badge className="mb-5 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-50">
                VELOCIDAD DE RESULTADOS
              </Badge>
              <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight text-neutral-950 sm:text-5xl lg:text-7xl">
                Detectamos qué le falta a tu negocio y construimos el <span className="text-green-600">sistema</span> para que empieces a generar resultados en semanas.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl">
                Digital Parker analiza tu negocio y, si calificas, trabajamos contigo entre <span className="font-bold text-neutral-900">30 y 90 días</span> para reconstruir tu sistema digital.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GradientButton onClick={() => scrollTo("diagnostico")} className="group">
                  Solicitar diagnóstico
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                </GradientButton>
                <SecondaryButton onClick={() => scrollTo("como-funciona")}>
                  Ver cómo funciona
                </SecondaryButton>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["1-2 semanas", "Primeros resultados visibles"],
                  ["30-90 días", "Implementación del sistema"],
                  ["100% enfocado", "En leads, ventas y estructura"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                    <p className="text-lg font-bold text-neutral-950">{title}</p>
                    <p className="mt-1 text-sm text-neutral-600">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[26px] border border-neutral-200 bg-white/90 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Ecosistema que activamos</p>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {partnerLogos.map((logo) => (
                    <div key={logo.name} className="flex h-20 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 px-4">
                      <img src={logo.src} alt={logo.name} className={logo.className} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative">
              <Card className="overflow-hidden rounded-[28px] border-neutral-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
                <div className="border-b border-neutral-200 bg-neutral-950 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] text-neutral-400">ANÁLISIS EJECUTIVO</p>
                      <h3 className="mt-2 text-2xl font-bold">Tu negocio no necesita más marketing.</h3>
                    </div>
                    <div className="rounded-2xl bg-green-600/15 p-3 text-green-400">
                      <Gauge className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-6 text-neutral-300">Necesita una estructura que convierta tráfico, contenido y atención en ventas y crecimiento medible.</p>
                </div>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {[
                      { icon: Search, title: "Diagnóstico real", desc: "Detectamos fallas en contenido, captación, anuncios y ventas." },
                      { icon: LayoutGrid, title: "Sistema implementado", desc: "Construimos la estructura digital y el flujo de adquisición." },
                      { icon: TrendingUp, title: "Velocidad de ejecución", desc: "Movemos rápido para generar señales de resultado en semanas." },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-neutral-200 p-4">
                        <div className="rounded-2xl bg-green-50 p-3 text-green-700">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-950">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-neutral-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => scrollTo("problema")}
              className="group flex items-center gap-2 text-sm font-semibold text-neutral-500 transition hover:text-neutral-900"
            >
              Desliza para ver el sistema
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        </Section>

        <Section id="problema" className="py-16 sm:py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Problema</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                Lo que te frena no es la falta de esfuerzo. Es la falta de <span className="text-green-600">estructura</span>.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {problems.map((item) => (
                <Card key={item} className="rounded-[24px] border-neutral-200 shadow-sm">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="rounded-2xl bg-red-50 p-3 text-red-600">
                      <X className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-neutral-950">{item}</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Esto genera ruido, pérdida de tiempo y acciones que no escalan.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 rounded-[32px] border border-neutral-200 bg-neutral-950 px-6 py-8 text-center text-white shadow-[0_20px_70px_rgba(0,0,0,0.12)] sm:px-10">
              <p className="text-2xl font-black tracking-tight sm:text-4xl">
                Tu negocio no necesita más marketing. <span className="text-green-400">Necesita un sistema.</span>
              </p>
            </div>
          </motion.div>
        </Section>

        <Section id="como-funciona" className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Diagnóstico</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                Analizamos el negocio completo antes de mover una sola pieza.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
                Dependiendo de qué tan deficiente esté tu empresa y cuál sea tu presupuesto, ajustamos el nivel de trabajo para construir la solución correcta.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {diagnosticAreas.map((area) => (
                  <div key={area} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                    <div className="rounded-full bg-green-50 p-2 text-green-700">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-neutral-900">{area}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
              <Card className="rounded-[28px] border-neutral-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-black text-neutral-950">Cómo funciona Digital Parker</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-2">
                  {[
                    ["01", "Diagnóstico", "Revisamos tu situación actual, tus canales y tus cuellos de botella."],
                    ["02", "Estructura", "Diseñamos el sistema mínimo necesario para empezar a producir resultados."],
                    ["03", "Implementación", "Activamos contenido, captación, automatización y seguimiento."],
                    ["04", "Optimización", "Ajustamos según señales reales de mercado, respuesta y ventas."],
                  ].map(([step, title, desc]) => (
                    <div key={step} className="flex gap-4 rounded-2xl border border-neutral-200 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-black text-white">
                        {step}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-neutral-950">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-neutral-600">{desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Section>

        <Section id="resultados" className="py-16 sm:py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="rounded-[32px] border border-green-200 bg-green-50 p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Resultados</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                  Los primeros resultados se ven entre la <span className="text-green-700">primera y segunda semana</span>.
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-neutral-700">
                  La prioridad es la velocidad: detectar, corregir e implementar antes de que tu negocio siga perdiendo tiempo y oportunidades.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  ["Día 1", "Diagnóstico"],
                  ["Día 3", "Ajustes"],
                  ["Semana 1", "Primeros leads"],
                  ["Semana 2", "Resultados visibles"],
                ].map(([a, b], i) => (
                  <div key={a} className="relative rounded-3xl border border-green-200 bg-white p-5 shadow-sm">
                    {i < 3 && <div className="absolute right-[-10px] top-1/2 hidden h-[2px] w-5 -translate-y-1/2 bg-green-300 sm:block" />}
                    <p className="text-sm font-semibold text-green-700">{a}</p>
                    <p className="mt-2 text-xl font-black text-neutral-950">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Section>

        <Section id="comparativa" className="py-16 sm:py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Comparativa</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                La diferencia entre improvisar y construir un sistema real.
              </h2>
            </div>
            <div className="mt-10 overflow-hidden rounded-[28px] border border-neutral-200 shadow-sm">
              <div className="grid grid-cols-3 bg-neutral-950 text-white">
                {['Área', 'Negocio promedio', 'Sistema Digital Parker'].map((head, idx) => (
                  <div key={head} className={`p-5 text-sm font-bold uppercase tracking-[0.16em] ${idx === 2 ? 'bg-green-700 text-white' : ''}`}>
                    {head}
                  </div>
                ))}
              </div>
              {comparisonRows.map(([area, average, system], idx) => (
                <div key={area} className={`grid grid-cols-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                  <div className="border-t border-neutral-200 p-5 font-semibold text-neutral-950">{area}</div>
                  <div className="flex items-center gap-3 border-t border-neutral-200 p-5 text-neutral-700">
                    <span className="rounded-full bg-red-50 p-1.5 text-red-600"><X className="h-4 w-4" /></span>
                    {average}
                  </div>
                  <div className="flex items-center gap-3 border-t border-neutral-200 bg-green-50/50 p-5 font-semibold text-neutral-900">
                    <span className="rounded-full bg-green-100 p-1.5 text-green-700"><Check className="h-4 w-4" /></span>
                    {system}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Section id="plataformas" className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Multiplataforma</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                Construimos contenido y adquisición donde realmente está tu cliente.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
                Creamos contenido optimizado para seguidores, leads, mensajes y ventas, conectando orgánico, anuncios y seguimiento en un solo flujo.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {channels.map((channel) => (
                  <Badge key={channel} className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-white">
                    {channel}
                  </Badge>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {outcomes.map((item, idx) => (
                  <Card key={item} className="rounded-[26px] border-neutral-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                        {[Instagram, MessageCircle, Target, CircleDollarSign][idx] && React.createElement([Instagram, MessageCircle, Target, CircleDollarSign][idx], { className: 'h-5 w-5' })}
                      </div>
                      <p className="text-xl font-black text-neutral-950">{item}</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Arquitectura enfocada en transformar visibilidad en intención y luego en acción.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Plataformas integradas</p>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {partnerLogos.slice(1).map((logo) => (
                    <div key={logo.name} className="flex h-24 items-center justify-center rounded-2xl border border-neutral-200 bg-white px-4">
                      <img src={logo.src} alt={logo.name} className={logo.className} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section id="planes" className="py-16 sm:py-20 overflow-hidden">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Planes</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                Elige el nivel de trabajo que tu negocio necesita ahora.
              </h2>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                Presentados en cápsulas deslizables para comparar rápido y decidir con menos fricción.
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
              <div className="text-sm font-medium text-neutral-500">Desliza horizontalmente para ver los planes</div>
              <div className="hidden items-center gap-3 md:flex">
                <button
                  type="button"
                  onClick={() => scrollPlans("left")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-950"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollPlans("right")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-950"
                >
                  →
                </button>
              </div>
            </div>

            <div
              ref={plansRef}
              className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`min-w-[88%] snap-center rounded-[32px] border-2 shadow-sm sm:min-w-[560px] lg:min-w-[620px] 'border-green-600 bg-neutral-950 text-white shadow-[0_25px_60px_rgba(22,163,74,0.18)]'`}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        {plan.highlighted && (
                          <Badge className="mb-5 rounded-full bg-green-600 px-4 py-1.5 text-white hover:bg-green-600">Recomendado</Badge>
                        )}
                        <p className={`text-sm font-semibold uppercase tracking-[0.2em] 'text-green-300'`}>
                          {plan.name}
                        </p>
                        <div className="mt-4 flex items-end gap-3">
                          <p className="text-5xl font-black tracking-tight">{plan.price}</p>
                          <p className={`pb-1 text-sm line-through 'text-neutral-400'`}>Antes {plan.oldPrice}</p>
                        </div>
                        <p className={`mt-2 text-sm 'text-neutral-300'`}>CLP / mes</p>
                      </div>

                      <div className={`rounded-2xl px-4 py-3 text-sm font-semibold 'bg-white/5 text-green-300'`}>
                        Resultados notorios entre la primera y segunda semana
                      </div>
                    </div>

                    <Separator className={`my-6 ${plan.highlighted ? 'bg-neutral-800' : ''}`} />

                    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                      <div className="space-y-3">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <div className={`mt-0.5 rounded-full p-1 'bg-green-500/15 text-green-400'`}>
                              <Check className="h-4 w-4" />
                            </div>
                            <p className={`'text-neutral-100'`}>{feature}</p>
                          </div>
                        ))}
                      </div>

                      <div className={`rounded-[28px] p-5 'bg-white/5'`}>
                        <p className={`text-sm font-semibold 'text-green-300'`}>Resultado esperado</p>
                        <p className={`mt-2 text-sm leading-6 'text-neutral-200'`}>{plan.result}</p>
                        <div className="mt-6 flex flex-col gap-3">
                          <a href={plan.checkoutLink} className="w-full">
                            <GradientButton className="w-full">{plan.cta}</GradientButton>
                          </a>
                          <SecondaryButton onClick={() => scrollTo("diagnostico")} className="w-full">
                            Resolver dudas
                          </SecondaryButton>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </Section>

        <Section id="mensaje-final" className="py-16 sm:py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Mensaje final</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                  A medida que avanzamos y vemos resultados, definimos si seguimos trabajando juntos o si el sistema queda implementado en tu negocio.
                </h2>
              </div>
              <div className="rounded-3xl bg-neutral-950 p-6 text-white">
                <ShieldCheck className="h-8 w-8 text-green-400" />
                <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-300">
                  No vendemos dependencia. Vendemos estructura, velocidad y decisión.
                </p>
              </div>
            </div>
          </motion.div>
        </Section>

        <Section id="diagnostico" className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">CTA final</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                Si tu negocio quiere crecer rápido, empieza por entender qué le falta.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
                Completa el diagnóstico. Si hay encaje, activamos un sistema claro para captar, convertir y escalar con velocidad.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
  [ClipboardCheck, 'Diagnóstico', '...'],
  [Target, 'Plan', '...'],
  [TrendingUp, 'Ejecución', '...']
].map(([Icon, title, desc], index) => (
  <div key={index} className="rounded-3xl border border-neutral-200 p-5 shadow-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
      <Icon className="h-5 w-5" />
    </div>
    <p className="mt-4 text-lg font-black text-neutral-950">{String(title)}</p>
    <p className="mt-1 text-sm leading-6 text-neutral-600">{String(desc)}</p>
  </div>
))}
</div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
              <Card className="rounded-[32px] border-neutral-200 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-neutral-950">Solicitar diagnóstico</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" placeholder="Tu nombre" value={form.nombre} onChange={(e) => handleChange('nombre', e.target.value)} className="h-12 rounded-2xl" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="negocio">Negocio</Label>
                        <Input id="negocio" placeholder="Nombre o rubro" value={form.negocio} onChange={(e) => handleChange('negocio', e.target.value)} className="h-12 rounded-2xl" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="redes">Redes sociales</Label>
                      <Input id="redes" placeholder="Instagram, Facebook, TikTok o sitio web" value={form.redes} onChange={(e) => handleChange('redes', e.target.value)} className="h-12 rounded-2xl" required />
                    </div>

                    <div className="space-y-2">
                      <Label>Problema principal</Label>
                      <Select onValueChange={(value) => handleChange("problema", String(value))}>
                        <SelectTrigger className="h-12 rounded-2xl">
                          <SelectValue placeholder="Selecciona el problema principal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-vendo">No vendo</SelectItem>
                          <SelectItem value="no-tengo-clientes">No tengo clientes</SelectItem>
                          <SelectItem value="no-se-que-publicar">No sé qué publicar</SelectItem>
                          <SelectItem value="mis-anuncios-no-funcionan">Mis anuncios no funcionan</SelectItem>
                          <SelectItem value="no-tengo-estructura">No tengo estructura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Presupuesto</Label>
                      <Select onValueChange={(value) => handleChange('presupuesto', String(value))}>
                        <SelectTrigger className="h-12 rounded-2xl">
                          <SelectValue placeholder="Selecciona tu presupuesto mensual" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="menos-de-100000">Menos de $100.000</SelectItem>
                          <SelectItem value="100000-a-300000">$100.000 - $300.000</SelectItem>
                          <SelectItem value="300000-mas">$300.000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="detalle">Contexto adicional</Label>
                      <Textarea id="detalle" placeholder="Cuéntanos brevemente qué está pasando hoy en tu negocio" className="min-h-[120px] rounded-2xl" />
                    </div>

                    <GradientButton type="submit" className="w-full">
                      Solicitar diagnóstico por WhatsApp
                    </GradientButton>

                    <p className="text-center text-xs leading-5 text-neutral-500">
                      Al enviar, iniciamos el contacto, el onboarding y el flujo inicial de evaluación.
                    </p>

                    {submitted && (
                      <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                        Tu solicitud fue preparada. Redirigimos el mensaje a WhatsApp para acelerar el primer contacto.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Section>

        <Section id="automatizacion" className="py-16 sm:py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Automatización</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                Después de la compra, el sistema sigue trabajando sin fricción.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
                El sitio está pensado para conectar checkout, onboarding, contacto inicial y entrada al sistema de trabajo de forma automática.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                ["1", "Compra"],
                ["2", "Confirmación"],
                ["3", "Onboarding"],
                ["4", "Inicio"],
              ].map(([n, label]) => (
                <div key={n} className="rounded-3xl border border-neutral-200 p-5 shadow-sm">
                  <p className="text-sm font-semibold text-green-700">Paso {n}</p>
                  <p className="mt-2 text-xl font-black text-neutral-950">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Section id="faq" className="py-16 sm:py-20">
  <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={fadeUp}
  className="grid gap-10 lg:grid-cols-[0.85fr,1.15fr]"
>
    <div>
  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
    Preguntas frecuentes
  </p>

  <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl">
    Menos fricción. Más claridad para tomar la decisión.
  </h2>
</div>

    <div className="w-full space-y-4">
  {faqs.map((item, idx) => (
    <div
      key={idx}
      className="rounded-2xl border border-neutral-200 px-5 py-4"
    >
      <p className="text-left text-lg font-bold text-neutral-950">
        {item.q}
      </p>
      <p className="mt-2 text-sm leading-7 text-neutral-600">
        {item.a}
      </p>
    </div>
  ))}
</div>
</motion.div>
</Section>
</main>

      <footer className="border-t border-neutral-200 bg-neutral-950 px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-2xl border border-neutral-800 bg-white px-3 py-2">
                <img src="/digital-parker-logo.png" alt="Digital Parker" className="h-8 w-auto object-contain" />
              </div>
            </div>
            <p className="text-sm font-semibold tracking-[0.18em] text-neutral-400">DIGITAL PARKER</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
              No vendemos marketing. Construimos sistemas digitales para generar resultados con velocidad.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <GradientButton onClick={() => scrollTo("diagnostico")}>Solicitar diagnóstico</GradientButton>
            <p className="text-xs text-neutral-500">© {new Date().getFullYear()} Digital Parker. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
