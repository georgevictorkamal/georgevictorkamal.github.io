import { TRPCClientError, TRPCLink } from "@trpc/client";
import { observable } from "@trpc/server/observable";
import { mockProjects, mockExperiences, mockEducation, mockCertifications } from "@shared/mockData";
import { type AppRouter } from "../../../server/routers";

export const staticLink: TRPCLink<AppRouter> = () => {
  return ({ op }) => {
    return observable((observer) => {
      const { path, input, type } = op;
      
      console.log(`[Static TRPC] ${type} ${path}`, input);

      // Simulate a small delay for realism
      const timer = setTimeout(() => {
        try {
          let data: any;

          if (path === "portfolio.projects.all") {
            data = mockProjects;
          } else if (path === "portfolio.projects.featured") {
            data = mockProjects.filter(p => p.featured === 1);
          } else if (path === "portfolio.projects.byId") {
            const id = (input as any).id;
            data = mockProjects.find(p => p.id === id);
            if (!data) throw new Error("Not found");
          } else if (path === "portfolio.experience.all") {
            data = mockExperiences;
          } else if (path === "portfolio.education.all") {
            data = mockEducation;
          } else if (path === "portfolio.certifications.all") {
            data = mockCertifications;
          } else if (path === "portfolio.contact.send") {
            data = { success: true, message: "Your message has been sent (simulated). I'll get back to you soon!" };
          } else if (path === "ai.chat") {
             const lastMessage = (input as any).messages?.at(-1)?.content?.toLowerCase() || "";
             if (lastMessage.includes("stack") || lastMessage.includes("technologies") || lastMessage.includes("skills")) {
                data = "George's core tech stack includes **.NET Core, ASP.NET Web API, Angular, TypeScript, and Flutter**. He also has extensive experience with SQL Server, Azure, and the Power Platform! You can see a detailed breakdown in the Skills section.";
             } else if (lastMessage.includes("grifols") || lastMessage.includes("donorhub")) {
                data = "The **Grifols-DonorHUB** is a comprehensive blood donor management system George built. It features a scalable Backend API, responsive Web Portal, and robust Mobile Application serving 10,000+ donors securely. He focused on HIPAA compliance and real-time tracking.";
             } else if (lastMessage.includes("kaizen") || lastMessage.includes("gym")) {
                data = "The **Kaizen GYM Management System** was engineered using Repository, Factory, and MVVM design patterns. It includes a responsive Angular dashboard and a .NET Core API, which helped improve member engagement by 40%.";
             } else if (lastMessage.includes("contact") || lastMessage.includes("hire") || lastMessage.includes("email")) {
                data = "You can reach George directly via the contact form on this page or email him at georgevictorkamal@gmail.com! He's always open to discussing interesting opportunities.";
             } else {
                data = "I'm currently running in static mode on GitHub Pages. My AI Twin features are limited here because they require a backend, but feel free to explore my background and projects!";
             }
          } else if (path === "auth.me") {
             data = null; // No authenticated user in static mode
          } else if (path === "system.health") {
             data = { ok: true };
          } else {
            console.warn(`[Static TRPC] Unhandled path: ${path}`);
            throw new Error(`Unhandled path: ${path}`);
          }

          observer.next({
            result: {
              type: "data",
              data,
            },
          });
          observer.complete();
        } catch (err: any) {
          observer.error(TRPCClientError.from(err));
        }
      }, 100);

      return () => clearTimeout(timer);
    });
  };
};
