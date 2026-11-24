import { Component, ElementRef, HostListener, afterNextRender, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  name: string;
  kind: string;
  summary: string;
  stack: string[];
  repo: string;
  demo?: string;
  newTab?: boolean;
  status?: string;
  facts?: string[];
  size: 'wide' | 'tall' | 'std';
  hue: number;
}

interface Skill {
  group: string;
  items: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly gh = 'https://github.com/MahmoudMekkawyX/';
  private readonly pages = 'https://mahmoudmekkawyx.github.io/';

  protected readonly menuOpen = signal(false);
  protected readonly photoOk = signal(true);
  protected readonly accent = signal(0);
  protected readonly progress = signal(0);
  protected readonly activeId = signal('top');
  protected readonly preview = signal<{ project: Project; url: SafeResourceUrl } | null>(null);
  protected readonly year = new Date().getFullYear();
  protected readonly nameLetters = 'Mahmoud'.split('');
  protected readonly nameLetters2 = 'Mekkawy'.split('');

  protected readonly accents = [
    { name: 'Lime', hue: 95 },
    { name: 'Cyan', hue: 190 },
    { name: 'Violet', hue: 270 },
    { name: 'Coral', hue: 15 },
  ];

  protected readonly links = {
    github: 'https://github.com/MahmoudMekkawyX',
    linkedin: 'https://www.linkedin.com/in/mahmoud-mekkawy-047819231',
    email: 'mailto:mahmoudmekkawy32@gmail.com',
  };

  protected readonly nav = [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'path', label: 'Path' },
    { id: 'contact', label: 'Contact' },
  ];

  protected readonly marquee = ['C#', 'ASP.NET Core MVC', 'Entity Framework Core', 'SQL Server', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git'];

  protected readonly skills: Skill[] = [
    { group: 'Back end (learning, used in my projects)', items: ['C#', 'ASP.NET Core MVC', 'Entity Framework Core', 'Repository and Unit of Work', 'AutoMapper', 'ASP.NET Core Identity (cookie login)', 'N-Tier architecture', 'ASP.NET Core Web API (started)'] },
    { group: 'Data', items: ['SQL Server', 'MySQL', 'SQLite'] },
    { group: 'Front end', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'] },
    { group: 'IT support (day job)', items: ['Windows', 'Active Directory', 'Network troubleshooting', 'Ticketing under SLAs', 'Office 365 end-user support'] },
    { group: 'Tools', items: ['Git and GitHub', 'Visual Studio', 'VS Code'] },
  ];

  protected readonly projects: Project[] = [
    {
      name: 'Company.PL',
      kind: 'Back end MVC',
      summary: 'Company management app I built while learning ASP.NET Core MVC: departments and employees with full CRUD, and a login. The live demo uses SQLite and made-up data so it can run on free hosting (the original uses SQL Server). Demo login: demo@example.com / Demo@123.',
      facts: [
        'N-Tier: Presentation (MVC), Business Logic, Data Access',
        'Generic and specific repositories, Unit of Work',
        'DTOs and AutoMapper between layers',
        'EF Core code-first migrations on SQL Server',
        'ASP.NET Core Identity login with cookies, controllers behind [Authorize]',
      ],
      stack: ['ASP.NET Core MVC', 'EF Core', 'SQL Server', 'Identity'],
      repo: this.gh + 'Company.PL',
      demo: 'https://companypl-demo-production.up.railway.app/',
      newTab: true,
      size: 'wide',
      hue: 160,
    },
    {
      name: 'KidsCode',
      kind: 'Graduation project',
      summary: 'Educational website that teaches kids math, chemistry and programming through interactive games. The live demo is a read-only snapshot with sample data (demo logins on the page).',
      stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP', 'MySQL'],
      repo: this.gh + 'KidsCode-Graduation-Project',
      demo: this.pages + 'KidsCode-Graduation-Project/demo/',
      size: 'std',
      hue: 15,
    },
    {
      name: 'Weather App',
      kind: 'Front end',
      summary: 'Shows weather data from a public weather API.',
      stack: ['JavaScript', 'REST API'],
      repo: this.gh + 'weather-app-api',
      demo: this.pages + 'weather-app-api/',
      size: 'std',
      hue: 190,
    },
    {
      name: 'IT Help Desk App',
      kind: 'Full stack tool',
      summary: 'Help desk for a support team: tickets with filters and CSV export, asset receiving log, user roles, and a searchable troubleshooting knowledge base with 15 problem, cause and fix guides. The live demo runs on sample data (demo logins on the page).',
      stack: ['Node.js', 'SQLite', 'JavaScript', 'HTML', 'CSS'],
      repo: this.gh + 'it-help-desk-demo',
      demo: this.pages + 'it-help-desk-demo/',
      size: 'std',
      hue: 220,
    },
    {
      name: 'Bookmark',
      kind: 'CRUD app',
      summary: 'Saves and manages bookmarks in the browser with localStorage.',
      stack: ['JavaScript', 'localStorage'],
      repo: this.gh + 'Bookmark',
      demo: this.pages + 'Bookmark/',
      size: 'std',
      hue: 95,
    },
    {
      name: 'Login System',
      kind: 'Forms',
      summary: 'Sign up and sign in with client-side validation and localStorage.',
      stack: ['JavaScript', 'HTML', 'CSS'],
      repo: this.gh + 'LoginSystem',
      demo: this.pages + 'LoginSystem/',
      size: 'std',
      hue: 330,
    },
    {
      name: 'Ecommerce.Solution',
      kind: 'Back end API',
      status: 'In progress',
      summary: 'My practice project for an e-commerce REST API with onion architecture. Early stage: the layers, the product entities and the first migration are in place. Authentication, validation and the API endpoints are still to build. Code only, no hosted demo.',
      facts: [
        'Onion layers: Domain, Services, Persistence, Presentation, Shared',
        'Entities: Product, ProductBrand, ProductType',
        'EF Core DbContext, entity configuration and a SQL Server migration',
        'Not built yet: JWT, roles, validation, pagination, tests',
      ],
      stack: ['ASP.NET Core Web API', 'EF Core', 'SQL Server'],
      repo: this.gh + 'Ecommerce.Solution',
      size: 'std',
      hue: 45,
    },
  ];

  constructor() {
    afterNextRender(() => {
      const root = this.host.nativeElement as HTMLElement;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12 },
      );
      root.querySelectorAll('.reveal').forEach((el) => io.observe(el));

      const spy = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.activeId.set(e.target.id);
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      root.querySelectorAll('main > section[id]').forEach((el) => spy.observe(el));
    });
  }

  protected setAccent(i: number): void {
    this.accent.set(i);
    (this.host.nativeElement as HTMLElement).style.setProperty('--ah', String(this.accents[i].hue));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    this.progress.set(max > 0 ? (h.scrollTop / max) * 100 : 0);
  }

  @HostListener('window:pointermove', ['$event'])
  onMove(e: PointerEvent): void {
    const el = this.host.nativeElement as HTMLElement;
    el.style.setProperty('--mx', e.clientX + 'px');
    el.style.setProperty('--my', e.clientY + 'px');
  }

  @HostListener('window:keydown.escape')
  onEsc(): void {
    this.preview.set(null);
  }

  protected tilt(e: PointerEvent, card: HTMLElement): void {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
    card.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
    card.style.setProperty('--gx', (x + 0.5) * 100 + '%');
    card.style.setProperty('--gy', (y + 0.5) * 100 + '%');
  }

  protected untilt(card: HTMLElement): void {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  }

  protected magnet(e: PointerEvent, btn: HTMLElement): void {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  }

  protected unmagnet(btn: HTMLElement): void {
    btn.style.transform = '';
  }

  protected parallax(e: PointerEvent, el: HTMLElement): void {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--px', x.toFixed(3));
    el.style.setProperty('--py', y.toFixed(3));
  }

  protected openPreview(p: Project): void {
    if (!p.demo) return;
    this.preview.set({ project: p, url: this.sanitizer.bypassSecurityTrustResourceUrl(p.demo) });
  }

  protected closePreview(): void {
    this.preview.set(null);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected go(id: string): void {
    this.menuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
