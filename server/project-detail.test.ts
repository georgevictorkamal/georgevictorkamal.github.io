import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("project detail endpoints", () => {
  it("fetches all projects successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const projects = await caller.portfolio.projects.all();

    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("fetches featured projects successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const projects = await caller.portfolio.projects.featured();

    expect(Array.isArray(projects)).toBe(true);
  });

  it("fetches project by id with case study data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    
    const allProjects = await caller.portfolio.projects.all();
    expect(allProjects.length).toBeGreaterThan(0);

    const projectId = allProjects[0]!.id;

    
    const project = await caller.portfolio.projects.byId({ id: projectId });

    expect(project).toBeDefined();
    expect(project?.id).toBe(projectId);
    expect(project?.title).toBeDefined();
    expect(project?.description).toBeDefined();
  });

  it("project contains case study fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const allProjects = await caller.portfolio.projects.all();
    const project = allProjects[0];

    expect(project).toBeDefined();

    
    if (project?.caseStudyOverview) {
      expect(typeof project.caseStudyOverview).toBe("string");
    }
    if (project?.problemStatement) {
      expect(typeof project.problemStatement).toBe("string");
    }
    if (project?.solution) {
      expect(typeof project.solution).toBe("string");
    }
    if (project?.architecture) {
      expect(typeof project.architecture).toBe("string");
      
      const arch = JSON.parse(project.architecture);
      expect(typeof arch).toBe("object");
    }
    if (project?.challenges) {
      expect(typeof project.challenges).toBe("string");
      
      const challenges = JSON.parse(project.challenges);
      expect(Array.isArray(challenges)).toBe(true);
    }
    if (project?.measurableOutcomes) {
      expect(typeof project.measurableOutcomes).toBe("string");
      
      const outcomes = JSON.parse(project.measurableOutcomes);
      expect(Array.isArray(outcomes)).toBe(true);
    }
  });

  it("project has team size and duration", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const allProjects = await caller.portfolio.projects.all();
    const project = allProjects[0];

    expect(project).toBeDefined();

    if (project?.teamSize !== null && project?.teamSize !== undefined) {
      expect(typeof project.teamSize).toBe("number");
      expect(project.teamSize).toBeGreaterThan(0);
    }
    if (project?.duration) {
      expect(typeof project.duration).toBe("string");
    }
  });

  it("throws NOT_FOUND error for non-existent project", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.portfolio.projects.byId({ id: 99999 })).rejects.toThrow("Project with ID 99999 not found");
  });

  it("grifols project has comprehensive case study data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const allProjects = await caller.portfolio.projects.all();
    const grifolsProject = allProjects.find(p => p.title === "Grifols-DonorHUB");

    expect(grifolsProject).toBeDefined();
    expect(grifolsProject?.caseStudyOverview).toContain("blood donor management");
    expect(grifolsProject?.problemStatement).toContain("HIPAA");
    expect(grifolsProject?.solution).toContain("Angular");
    expect(grifolsProject?.teamSize).toBe(5);
    expect(grifolsProject?.duration).toBe("8 months");
  });

  it("kaizen gym project has comprehensive case study data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const allProjects = await caller.portfolio.projects.all();
    const kaizenProject = allProjects.find(p => p.title === "Kaizen GYM Management System");

    expect(kaizenProject).toBeDefined();
    expect(kaizenProject?.caseStudyOverview).toContain("gym management");
    expect(kaizenProject?.problemStatement).toContain("spreadsheets");
    expect(kaizenProject?.teamSize).toBe(3);
    expect(kaizenProject?.duration).toBe("6 months");
  });

  it("tender management project has comprehensive case study data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const allProjects = await caller.portfolio.projects.all();
    const tenderProject = allProjects.find(p => p.title === "Tender Management Platform");

    expect(tenderProject).toBeDefined();
    expect(tenderProject?.caseStudyOverview).toContain("tender management");
    expect(tenderProject?.problemStatement).toContain("email");
    expect(tenderProject?.teamSize).toBe(4);
    expect(tenderProject?.duration).toBe("7 months");
  });

  it("location-based attendance project has comprehensive case study data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const allProjects = await caller.portfolio.projects.all();
    const attendanceProject = allProjects.find(p => p.title === "Location-Based Attendance System");

    expect(attendanceProject).toBeDefined();
    expect(attendanceProject?.caseStudyOverview).toContain("geofencing");
    expect(attendanceProject?.problemStatement).toContain("manual");
    expect(attendanceProject?.teamSize).toBe(2);
    expect(attendanceProject?.duration).toBe("4 months");
  });

  it("all projects have technologies array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const allProjects = await caller.portfolio.projects.all();

    allProjects.forEach(project => {
      if (project.technologies) {
        const techs = JSON.parse(project.technologies);
        expect(Array.isArray(techs)).toBe(true);
        expect(techs.length).toBeGreaterThan(0);
      }
    });
  });

  it("all projects have outcomes array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const allProjects = await caller.portfolio.projects.all();

    allProjects.forEach(project => {
      if (project.outcomes) {
        const outcomes = JSON.parse(project.outcomes);
        expect(Array.isArray(outcomes)).toBe(true);
      }
    });
  });
});
