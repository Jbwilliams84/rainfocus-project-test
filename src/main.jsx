import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import logo from '../Logo.png';
import navLogo from '../Nav Logo.png';
import avatar from '../Group 1.png';
import attendee from '../Person Portal.png';
import arrow from '../logic-arrow.png';
import computer from '../computer.png';
import modules from './modules.json';
import './styles.scss';

const description = 'Description that explains the value goes here. Description that explains the value goes here.';

function Sidebar() {
  const [activeItem, setActiveItem] = useState('module:#guide');
  const [menuOpen, setMenuOpen] = useState(false);

  function selectItem(event, item) {
    event.preventDefault();
    setActiveItem(item);
  }

  return (
    <aside className={menuOpen ? 'sidebar menu-open' : 'sidebar'} aria-label="Event sidebar">
      <div className="mobile-bar">
        <strong>RainFocus Summit</strong>
        <button
          className="nav-mobile-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="event-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span aria-hidden="true" />
        </button>
      </div>
      <div className="rail">
        <img className="brand" src={navLogo} alt="RainFocus" />
        <img className="event-thumb" src={logo} alt="" />
        <img className="avatar" src={avatar} alt="FL" />
      </div>
      <div className="menu" id="event-menu">
        <strong>RainFocus Summit</strong>
        <p className="menu-meta">Lehi, UT <span>•</span> December 15th</p>
        <label className="search">
          <span aria-hidden="true" />
          <input type="search" aria-label="Search" placeholder="Search" />
        </label>
        <nav aria-label="Event modules">
          <ul>
            {modules.map(({ label, href, children }) => (
              <li key={href}>
                <a
                  className={activeItem === `module:${href}` ? 'module selected' : 'module'}
                  href={href}
                  onClick={event => selectItem(event, `module:${href}`)}
                  aria-current={activeItem === `module:${href}` ? 'true' : undefined}
                >
                  {label}
                </a>
                {children?.length > 0 && (
                  <ul className="subnav">
                    {children.map(({ label, href }) => (
                      <li key={href}>
                        <a
                          href={href}
                          onClick={event => selectItem(event, `submenu:${href}`)}
                          aria-current={activeItem === `submenu:${href}` ? 'true' : undefined}
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

function Step({ number, description, children }) {
  return (
    <section className="step">
      <h3><strong>Step {number}:</strong> {description}</h3>
      {children}
    </section>
  );
}

function Card({ icon, title, children }) {
  return (
    <article className="card">
      <h4>{icon && <img src={icon} alt="" />}{title}</h4>
      <p>{children}</p>
    </article>
  );
}

function App() {
  return (
    <>
      <Sidebar />
      <main>
        <header className="event-header">
          <img className="event-logo" src={logo} alt="" />
          <div>
            <h1>RainFocus Summit</h1>
            <p>December 15th<br />Lehi, Utah</p>
          </div>
          <button className="edit" type="button">Edit event</button>
        </header>
        <section className="guide" id="guide">
          <h2>Event setup guide</h2>
          <p>See the available list of modules below. We suggest that you start with the attendee module.</p>
        </section>
        <section id="attendee" aria-labelledby="attendee-title">
          <h2 id="attendee-title"><img src={attendee} alt="" />Attendee</h2>
          <Step number={1} description="Base settings.">
            <div className="settings">
              <Card title="General">Define Attendee types &amp; attributes</Card>
              <Card title="Title">{description}</Card>
              <Card title="Title">{description}</Card>
            </div>
          </Step>
          <Step number={2} description="Build registration workflows.">
            <div className="cards">
              {[1, 2, 3].map(number => (
                <Card key={number} icon={arrow} title="Attendee Registration">
                  Start by creating a general registration workflow
                </Card>
              ))}
              <button className="card add" type="button">
                <span className="plus" aria-hidden="true">+</span>
                Add Registration Workflow
              </button>
            </div>
          </Step>
          <Step number={3} description="Design post-registration experiences.">
            <div className="cards">
              <Card icon={computer} title="Attendee Portal">
                Manage the portal that attendees will see after they’ve register for your event.
              </Card>
            </div>
          </Step>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
