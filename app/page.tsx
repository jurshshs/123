"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Clock3, MapPin, Menu, Phone, Scissors, Sparkles, UsersRound, X } from "lucide-react";

const tel = "tel:+375445934615";
const number = "+375 44 593-46-15";
const nav = [["Услуги", "services"], ["О нас", "about"], ["Отзывы", "reviews"], ["Контакты", "contacts"]];
const services = [
  ["Женские стрижки", "Современные и классические формы с учётом длины и текстуры волос."],
  ["Мужские стрижки", "Аккуратные линии и форма, с которой удобно каждый день."],
  ["Окрашивание", "От мягкого обновления оттенка до смены образа."],
  ["Укладка", "Лёгкая текстура на каждый день или укладка для особого случая."],
  ["Уход за волосами", "Уход с учётом состояния волос и ваших пожеланий."],
];
const gallery = [
  ["gallery-1", "Пространство"], ["gallery-2", "Уход"], ["gallery-3", "Детали"],
];
function Label({n, children}: {n: string; children: React.ReactNode}) {
  return <div className="label"><span>{n}</span><i/>{children}</div>;
}
function Photo({name, alt, hero = false}: {name: string; alt: string; hero?: boolean}) {
  return <img className="photo" src={'/photos/' + name + '.webp'} alt={alt} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : "auto"} onError={event => { event.currentTarget.style.visibility = "hidden"; }}/>;
}
function Brand() { return <a href="#top" className="brand"><Scissors aria-hidden="true"/>Парикмахерская</a>; }
function Call({children, className = ""}: {children: React.ReactNode; className?: string}) {
  return <a href={tel} className={'button ' + className}>{children}<ArrowUpRight size={17}/></a>;
}
export default function Page() {
  const [menu, setMenu] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    function escape(event: KeyboardEvent) { if (event.key === "Escape" && menu) {setMenu(false); toggle.current?.focus();} }
    const desktop = window.matchMedia("(min-width: 761px)");
    const close = () => setMenu(false);
    document.addEventListener("keydown", escape); desktop.addEventListener("change", close);
    return () => {document.removeEventListener("keydown", escape); desktop.removeEventListener("change", close);};
  }, [menu]);
  return <main id="top">
    <header><div className="bar wrap"><Brand/><nav className="desktop" aria-label="Главная навигация">{nav.map(([label,id]) => <a key={id} href={'#'+id}>{label}</a>)}</nav><div className="flex items-center gap-3"><Call className="header-call">Записаться</Call><button ref={toggle} className="toggle" aria-expanded={menu} aria-controls="mobile-nav" aria-label={menu ? "Закрыть меню" : "Открыть меню"} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></div></div>
    {menu && <nav id="mobile-nav" className="mobile-nav" aria-label="Мобильная навигация">{nav.map(([label,id]) => <a key={id} href={'#'+id} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}</header>
    <section className="hero" aria-labelledby="hero-title"><Photo name="hero" hero alt="Мастер укладывает волосы — иллюстрация концепта"/><div className="shade"/>
      <div className="hero-inner wrap"><div className="location"><b/>МИНСК <i/> УЛ. ПОНОМАРЁВА, 7</div>
      <h1 id="hero-title">Стрижка,<br/>которая подходит<br/><em>именно вам.</em></h1>
      <p>Аккуратные стрижки, уход и комфортная<br className="wide-break"/> атмосфера рядом с домом.</p>
      <div className="hero-actions"><Call>Записаться</Call><a className="underlink" href="#services">Наши услуги <ArrowDown size={15}/></a></div>
      <div className="hero-foot"><a href="#reviews" className="trust"><span className="score">★ 5,0</span><span>253 оценки на Яндекс Картах</span></a><span className="plate">01 <i/> 05</span></div></div>
    </section>
    <section id="services" className="section wrap"><Label n="01">Услуги</Label><div className="section-title"><h2>Ваша форма. <em>Ваш стиль.</em></h2><span className="side-note">ПЯТЬ НАПРАВЛЕНИЙ</span></div>
    <div className="service-list">{services.map(([name,desc],i) => <details key={name} name="services"><summary><span className="index">0{i+1}</span><h3>{name}</h3><span className="plus" aria-hidden="true"/></summary><div className="detail"><p>{desc}</p><a href={tel}>Уточнить стоимость <ArrowUpRight size={15}/></a></div></details>)}</div></section>
    <section id="about" className="about"><div className="about-grid wrap"><figure className="about-image"><Photo name="about" alt="Деталь парикмахерского процесса, иллюстративная фотография"/></figure><div><Label n="02">О парикмахерской</Label><h2>Место, куда<br/>хочется <em>возвращаться.</em></h2><p>Парикмахерская на Пономарёва, 7 — для тех, кто ценит аккуратную работу, комфорт и хороший результат без лишнего пафоса.</p><ul className="benefits"><li><Sparkles/>Внимание к деталям и вашим пожеланиям</li><li><UsersRound/>Для женщин и мужчин</li><li><MapPin/>Рядом с домом, на Пономарёва, 7</li></ul></div></div></section>
    <section className="section wrap"><Label n="03">Фотогалерея</Label><div className="section-title"><h2>Стиль <em>в деталях.</em></h2></div><div className="gallery">{gallery.map(([name,label],i) => <motion.figure key={name} initial={false} whileInView={reduced ? undefined : {y:[6,0]}} viewport={{once:true}} transition={{duration:.6}}><div><Photo name={name} alt={label + " — иллюстрация концепта"}/></div><figcaption><span>0{i+1} /</span>{label}</figcaption></motion.figure>)}</div><p className="caption">Подборка фотографий для демонстрационного концепта.</p></section>
    <section id="reviews" className="review wrap"><div><Label n="04">Отзывы</Label><h2>Оценка <em>посетителей.</em></h2><p>253 оценки на Яндекс Картах</p></div><div className="rating" aria-label="5,0 из 5"><div>5,0<small> / 5</small></div><span aria-hidden="true">★★★★★</span></div></section>
    <section className="cta"><div className="wrap cta-inner"><div><h2>Пора обновить <em>образ?</em></h2><p>Позвоните — подскажем по услугам и подберём удобное время.</p></div><Call>Позвонить</Call></div></section>
    <section id="contacts" className="section wrap"><Label n="05">Контакты</Label><div className="section-title"><h2>Ждём вас <em>в Минске.</em></h2></div><div className="contact-grid">
    <div><MapPin/><span>Адрес</span><strong>ул. Пономарёва, 7</strong><a href="https://yandex.by/maps/157/minsk/?text=Минск%2C%20улица%20Пономарёва%2C%207" target="_blank" rel="noreferrer">Открыть на карте <ArrowUpRight size={14}/></a></div>
    <div><Clock3/><span>Время работы</span><strong>09:00–20:00</strong></div><div><Phone/><span>Телефон</span><strong>{number}</strong><a href={tel}>Позвонить <ArrowRight size={15}/></a></div></div></section>
    <footer><div className="wrap"><div className="footer-main"><Brand/><p>Минск · ул. Пономарёва, 7</p><a href={tel}>{number}</a></div><div className="footer-end"><span>Демонстрационный концепт сайта</span><a href="#top">Наверх <ArrowUp size={13}/></a></div></div></footer>
  </main>;
}

