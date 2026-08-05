import SectionHeading from '../Shared/SectionHeading';
import NextChapter from '../Shared/NextChapter';
import { education } from '../../data/education';

export default function Journey() {
  return (
    <section className="act-container" id="journey" data-act-color="128, 10, 29">
      <SectionHeading icon="ticket" subtitle="Act II — Academic Genesis" title="Educational Stubs" />
      <div className="journey-tickets-container">
        {education.map(([degree, institution, num, tag]) => (
          <article className="vintage-ticket-card" key={num}>
            <div className="ticket-inner-border">
              {/* Left Stub */}
              <div className="ticket-stub ticket-stub-left">
                <div className="stub-vertical-num stub-num-left">0 1 2 3 4 5 6</div>
              </div>

              {/* Center Ticket Body */}
              <div className="ticket-body">
                <div className="ticket-stars-row" aria-hidden="true">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>

                <div className="ticket-main-content">
                  <span className="ticket-stub-code">{num} • {tag}</span>
                  <h3 className="ticket-vintage-title">{degree}</h3>
                  <p className="ticket-institution">{institution}</p>
                </div>

                <div className="ticket-stars-row" aria-hidden="true">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>

              {/* Right Stub (Inversed numbers & orientation) */}
              <div className="ticket-stub ticket-stub-right">
                <div className="stub-vertical-num stub-num-right">6 5 4 3 2 1 0</div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <NextChapter to="/experience" act="Act III" title="Professional Performances" icon="clapper" />
    </section>
  );
}


