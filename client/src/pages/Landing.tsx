import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, CheckCircle, BarChart3, Users, Shield, Zap, ArrowRight } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>
      <nav className="landing-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo(0,0)}>
          <BookOpen size={32} color="var(--accent)" />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Space Grotesk' }}>SkillForge</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features') }}>Funzionalità</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing') }}>Prezzi</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contatti</a>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>Accedi</button>
          <button className="btn btn-primary" onClick={() => navigate('/app')}>Inizia Gratis</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="badge" style={{ marginBottom: '24px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
          <Zap size={14} /> La piattaforma B2B per i tuoi corsi
        </div>
        <h1 className="hero-title animate-slide-up">
          Crea, vendi e gestisci i tuoi corsi online con facilità
        </h1>
        <p className="hero-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          SkillForge è la soluzione all-in-one per professionisti e aziende. Gestisci studenti, pagamenti, certificati e report in un'unica dashboard potente e intuitiva.
        </p>
        <div className="hero-actions animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }} onClick={() => navigate('/app')}>
            Apri la Dashboard <ArrowRight size={20} />
          </button>
          <button className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.125rem' }} onClick={() => scrollTo('features')}>
            Scopri di più
          </button>
        </div>
      </section>

      <section id="features" className="section">
        <h2 className="section-title">Tutto ciò che ti serve per crescere</h2>
        <p className="section-subtitle">Strumenti professionali pensati per scalare il tuo business formativo.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><BookOpen size={24} /></div>
            <h3 style={{ marginBottom: '12px' }}>Gestione Corsi Avanzata</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Crea moduli, lezioni, quiz e rilascia certificati automatici al completamento.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Users size={24} /></div>
            <h3 style={{ marginBottom: '12px' }}>CRM Integrato</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Gestisci i tuoi studenti, monitora i progressi e comunica direttamente dalla piattaforma.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><BarChart3 size={24} /></div>
            <h3 style={{ marginBottom: '12px' }}>Report e Analytics</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Dati in tempo reale su vendite, completamento corsi e performance finanziarie.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Shield size={24} /></div>
            <h3 style={{ marginBottom: '12px' }}>Fatturazione Automatica</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Integrazione nativa con Stripe per pagamenti sicuri e generazione automatica delle fatture.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <h2 className="section-title">Piani semplici e trasparenti</h2>
        <p className="section-subtitle">Scegli il piano perfetto per le tue esigenze.</p>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Basic</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Per chi sta iniziando</p>
            <div className="price">9€<span>/mese</span></div>
            <ul className="pricing-features">
              <li><CheckCircle size={20} color="var(--success)" /> Fino a 5 corsi</li>
              <li><CheckCircle size={20} color="var(--success)" /> 100 studenti attivi</li>
              <li><CheckCircle size={20} color="var(--success)" /> Pagamenti Stripe</li>
              <li><CheckCircle size={20} color="var(--success)" /> Supporto email</li>
            </ul>
            <button className="btn btn-secondary" style={{ width: '100%', padding: '12px' }} onClick={() => navigate('/app')}>
              Inizia con Basic
            </button>
          </div>

          <div className="pricing-card popular">
            <div className="popular-badge">PIÙ SCELTO</div>
            <h3>Pro</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Per professionisti e aziende</p>
            <div className="price">29€<span>/mese</span></div>
            <ul className="pricing-features">
              <li><CheckCircle size={20} color="var(--success)" /> Corsi illimitati</li>
              <li><CheckCircle size={20} color="var(--success)" /> Studenti illimitati</li>
              <li><CheckCircle size={20} color="var(--success)" /> Certificati personalizzati</li>
              <li><CheckCircle size={20} color="var(--success)" /> Report avanzati e BI</li>
              <li><CheckCircle size={20} color="var(--success)" /> Assistenza AI (Claude/Gemini)</li>
            </ul>
            <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }} onClick={() => navigate('/app')}>
              Inizia con Pro
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">Pronto a trasformare il tuo business?</h2>
          <p className="section-subtitle">Entra subito nella dashboard e scopri tutte le funzionalità in modalità demo.</p>
          <button className="btn btn-primary" style={{ padding: '16px 48px', fontSize: '1.25rem' }} onClick={() => navigate('/app')}>
            Apri l'App Ora
          </button>
        </div>
      </section>

      <footer style={{ padding: '48px 5%', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <BookOpen size={24} color="var(--accent)" />
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>SkillForge</span>
        </div>
        <p>© {new Date().getFullYear()} SkillForge. Tutti i diritti riservati.</p>
      </footer>
    </div>
  )
}