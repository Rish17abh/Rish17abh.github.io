import { ArrowUpRight, ArrowUp } from 'lucide-react';
export function Contact() {
  return <section className="contact-section" id="contact" tabIndex={-1} aria-labelledby="contact-title">
    <div className="shell"><div className="section-label"><span>06 / CONTACT</span><span>Good work starts with a conversation.</span></div>
      <div className="contact-grid" data-reveal><h2 id="contact-title">Let’s <em>connect.</em></h2><div><p>Have a data or AI problem in mind?<br/>I’d be glad to hear about it.</p><a className="button button-accent" href="mailto:rishabhramteke4017@gmail.com">Email Rishabh<ArrowUpRight size={19} aria-hidden="true"/></a></div></div>
      <footer className="site-footer"><span>Rishabh Ramteke<span className="footer-role">Business Intelligence Engineer | Data & AI</span></span><div><a href="https://www.linkedin.com/in/rishabh-ramteke" target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={14} aria-hidden="true"/></a><a href="https://github.com/Rish17abh" target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={14} aria-hidden="true"/></a><a href="#top" className="back-top" aria-label="Back to top"><ArrowUp size={18} aria-hidden="true"/></a></div></footer>
    </div>
  </section>;
}
