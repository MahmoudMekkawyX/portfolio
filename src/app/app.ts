import { Component, signal } from '@angular/core';

interface Project {
  name: string;
  summary: string;
  stack: string[];
  repo: string;
  demo?: string;
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
  protected readonly menuOpen = signal(false);
  protected readonly year = new Date().getFullYear();
  private readonly gh = 'https://github.com/MahmoudMekkawyX/';

  protected readonly links = {
    github: 'https://github.com/MahmoudMekkawyX',
    linkedin: 'https://www.linkedin.com/in/mahmoud-mekkawy-047819231',
    email: 'mailto:mahmoudmekkawy32@gmail.com',
  };

  protected readonly nav = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  protected readonly skills: Skill[] = [
    { group: 'Back end', items: ['C#', 'ASP.NET Core MVC', 'ASP.NET Core Web API', 'Entity Framework Core', 'REST APIs'] },
    { group: 'Front end', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Tailwind'] },
    { group: 'Data', items: ['SQL Server', 'MySQL'] },
    { group: 'Practices', items: ['OOP', 'N-Tier / Onion architecture', 'Git & GitHub'] },
    { group: 'IT support', items: ['Windows', 'Active Directory', 'Network troubleshooting', 'Ticketing under SLAs', 'Office 365 end-user support'] },
  ];

  protected readonly projects: Project[] = [
    {
      name: 'E-Commerce Full Stack App',
      summary: 'Full stack store with an Angular front end and an ASP.NET Core Web API, organized with onion architecture.',
      stack: ['Angular', 'ASP.NET Core Web API', 'EF Core', 'SQL Server'],
      repo: this.gh + 'Ecommerce.Solution',
    },
    {
      name: 'Company.PL',
      summary: 'Company management system built with ASP.NET Core MVC and a layered (N-Tier) structure.',
      stack: ['ASP.NET Core MVC', 'EF Core', 'SQL Server'],
      repo: this.gh + 'Company.PL',
    },
    {
      name: 'IT Help Desk App',
      summary: 'Internal tool built for my support team to handle help desk work.',
      stack: ['Internal tool'],
      repo: this.gh + 'IT-Help-Desk-App',
    },
    {
      name: 'Xceed Knowledge Hub',
      summary: 'Internal knowledge hub that documents fixes so repeat questions get answered faster.',
      stack: ['Internal tool'],
      repo: this.gh + 'xceed-knowledge-hub',
    },
    {
      name: 'Weather App',
      summary: 'Front end app that shows weather data from a public weather API.',
      stack: ['JavaScript', 'REST API'],
      repo: this.gh + 'weather-app-api',
    },
    {
      name: 'Bookmark',
      summary: 'Small CRUD app that saves bookmarks in the browser with localStorage.',
      stack: ['JavaScript', 'localStorage'],
      repo: this.gh + 'Bookmark',
    },
    {
      name: 'Login System',
      summary: 'Form validation and session handling with localStorage.',
      stack: ['JavaScript', 'HTML', 'CSS'],
      repo: this.gh + 'LoginSystem',
    },
    {
      name: 'KidsCode (graduation project)',
      summary: 'Educational website that teaches kids math, chemistry and programming through interactive games.',
      stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP', 'MySQL'],
      repo: this.gh + 'KidsCode-Graduation-Project',
    },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected go(id: string): void {
    this.menuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
