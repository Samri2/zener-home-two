import { Injectable } from '@angular/core';
import { ProjectItem, projectsList } from '../data/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects: ProjectItem[] = projectsList;

  getProjects(): ProjectItem[] {
    return [...this.projects];
  }

  getFeaturedProjects(): ProjectItem[] {
    return this.projects.filter(p => p.featured);
  }

  getProjectById(id: string): ProjectItem | undefined {
    return this.projects.find(p => p.id === id);
  }

  getProjectsByCategory(category: string): ProjectItem[] {
    if (!category || category === 'all') return this.getProjects();
    return this.projects.filter(p => p.category === category);
  }
}

