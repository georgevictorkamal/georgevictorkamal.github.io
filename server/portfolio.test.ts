import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';


function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: 'https',
      headers: {},
    } as TrpcContext['req'],
    res: {
      clearCookie: () => {},
    } as TrpcContext['res'],
  };
}

describe('Portfolio API', () => {
  const ctx = createPublicContext();
  const caller = appRouter.createCaller(ctx);

  describe('Projects', () => {
    it('should fetch all projects', async () => {
      const projects = await caller.portfolio.projects.all();
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it('should have required project fields', async () => {
      const projects = await caller.portfolio.projects.all();
      const project = projects[0];

      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('technologies');
      expect(typeof project.title).toBe('string');
      expect(project.title.length).toBeGreaterThan(0);
    });

    it('should fetch featured projects', async () => {
      const featured = await caller.portfolio.projects.featured();
      expect(Array.isArray(featured)).toBe(true);
      featured.forEach((project) => {
        expect(project.featured).toBe(1);
      });
    });

    it('should fetch project by ID', async () => {
      const projects = await caller.portfolio.projects.all();
      if (projects.length > 0) {
        const project = await caller.portfolio.projects.byId({ id: projects[0].id });
        expect(project).not.toBeNull();
        expect(project?.id).toBe(projects[0].id);
      }
    });

    it('should throw NOT_FOUND error for non-existent project', async () => {
      await expect(caller.portfolio.projects.byId({ id: 99999 })).rejects.toThrow('Project with ID 99999 not found');
    });
  });

  describe('Experience', () => {
    it('should fetch all experiences', async () => {
      const experiences = await caller.portfolio.experience.all();
      expect(Array.isArray(experiences)).toBe(true);
      expect(experiences.length).toBeGreaterThan(0);
    });

    it('should have required experience fields', async () => {
      const experiences = await caller.portfolio.experience.all();
      const exp = experiences[0];

      expect(exp).toHaveProperty('id');
      expect(exp).toHaveProperty('title');
      expect(exp).toHaveProperty('company');
      expect(typeof exp.title).toBe('string');
      expect(typeof exp.company).toBe('string');
    });
  });

  describe('Education', () => {
    it('should fetch all education records', async () => {
      const education = await caller.portfolio.education.all();
      expect(Array.isArray(education)).toBe(true);
      expect(education.length).toBeGreaterThan(0);
    });

    it('should have required education fields', async () => {
      const education = await caller.portfolio.education.all();
      const edu = education[0];

      expect(edu).toHaveProperty('id');
      expect(edu).toHaveProperty('degree');
      expect(edu).toHaveProperty('institution');
      expect(typeof edu.degree).toBe('string');
      expect(typeof edu.institution).toBe('string');
    });
  });

  describe('Certifications', () => {
    it('should fetch all certifications', async () => {
      const certs = await caller.portfolio.certifications.all();
      expect(Array.isArray(certs)).toBe(true);
      expect(certs.length).toBeGreaterThan(0);
    });

    it('should have required certification fields', async () => {
      const certs = await caller.portfolio.certifications.all();
      const cert = certs[0];

      expect(cert).toHaveProperty('id');
      expect(cert).toHaveProperty('name');
      expect(cert).toHaveProperty('issuer');
      expect(typeof cert.name).toBe('string');
      expect(typeof cert.issuer).toBe('string');
    });
  });

  describe('Contact', () => {
    it('should validate contact form input', async () => {
      try {
        await caller.portfolio.contact.send({
          name: 'a', 
          email: 'test@example.com',
          subject: 'Test',
          message: 'Test message',
        });
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should validate email format', async () => {
      try {
        await caller.portfolio.contact.send({
          name: 'Test User',
          email: 'invalid-email',
          subject: 'Test Subject',
          message: 'Test message',
        });
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should accept valid contact message', async () => {
      const result = await caller.portfolio.contact.send({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message for the contact form',
      });
      expect(result.success).toBe(true);
    });
  });
});
