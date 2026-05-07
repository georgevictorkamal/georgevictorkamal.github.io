import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAllProjects,
  getProjectById,
  getFeaturedProjects,
  getAllExperiences,
  getAllEducation,
  getAllCertifications,
  createContactMessage,
} from "./db";


const ProjectIdSchema = z.object({
  id: z.number().int().positive("Project ID must be a positive integer"),
});

const ContactMessageSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must not exceed 255 characters")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(320, "Email must not exceed 320 characters")
    .toLowerCase(),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(255, "Subject must not exceed 255 characters")
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must not exceed 5000 characters")
    .trim(),
});


async function buildPortfolioSystemPrompt(): Promise<string> {
  const [projects, experiences, education, certifications] = await Promise.all([
    getAllProjects(),
    getAllExperiences(),
    getAllEducation(),
    getAllCertifications(),
  ]);

  const projectsSummary = projects.map((p) => {
    let techs: string[] = [];
    try { techs = p.technologies ? JSON.parse(p.technologies) : []; } catch { techs = []; }
    let outcomes: string[] = [];
    try { outcomes = p.outcomes ? JSON.parse(p.outcomes) : []; } catch { outcomes = []; }
    return `  - **${p.title}** (${p.category || 'N/A'})
    Role: ${p.role || 'N/A'}
    Description: ${p.shortDescription || p.description || 'N/A'}
    Technologies: ${techs.join(', ') || 'N/A'}
    Key Outcomes: ${outcomes.join('; ') || 'N/A'}
    ${p.caseStudyOverview ? `Overview: ${p.caseStudyOverview}` : ''}
    ${p.problemStatement ? `Problem Solved: ${p.problemStatement}` : ''}
    ${p.solution ? `My Solution: ${p.solution}` : ''}
    ${p.teamSize ? `Team: ${p.teamSize} engineers` : ''}${p.duration ? ` | Duration: ${p.duration}` : ''}`;
  }).join('\n');

  const experienceSummary = experiences.map((exp) => {
    let achievements: string[] = [];
    try { achievements = exp.achievements ? JSON.parse(exp.achievements) : []; } catch { achievements = []; }
    return `  - **${exp.title}** at ${exp.company} (${exp.location || 'N/A'})
    Period: ${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'} — ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
    ${exp.description || ''}
    Key Achievements:
${achievements.map(a => `      • ${a}`).join('\n')}`;
  }).join('\n');

  const educationSummary = education.map((edu) =>
    `  - **${edu.degree}** from ${edu.institution} (Grade: ${edu.grade || 'N/A'})
    Period: ${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'} — ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'}
    ${edu.description || ''}`
  ).join('\n');

  const certSummary = certifications.map((c) =>
    `  - **${c.name}** — ${c.issuer} (${c.issuedDate ? new Date(c.issuedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'})${c.credentialUrl ? ` | Verify: ${c.credentialUrl}` : ''}`
  ).join('\n');

  return `You are George Victor Kamal\'s AI Twin — a professional, technically sharp, and friendly digital representative embedded in George\'s portfolio website.
You speak in the FIRST PERSON as George. Be confident, warm, and technically precise. You represent a Senior Full-Stack Software Engineer with a strong enterprise track record.

GEORGE\'S IDENTITY
Name: George Victor Kamal
Title: Senior Full-Stack Software Engineer
Location: Cairo, Egypt (Open to Remote and Hybrid)
Email: georgevictorkamal@gmail.com | Phone: +20 12 11 388 499
LinkedIn: linkedin.com/in/georgevictorkamal | GitHub: github.com/georgevictorkamal
Portfolio: georgevictorkamal.github.io | Behance: behance.net/georgevictorkamal
Availability: Open to senior full-stack and lead engineering roles

CORE TECHNICAL SKILLS
Backend: C#, .NET Core, ASP.NET Web API, Entity Framework, Microservices, Redis Caching, Node.js, RESTful APIs, Swagger, OAuth2
Frontend: Angular, TypeScript, Bootstrap, Responsive Design
Mobile: Flutter, Dart, Geolocator API, Bing Maps API (iOS and Android)
Databases: Microsoft SQL Server, Oracle Database, PostgreSQL, MongoDB, Redis
Cloud and DevOps: Microsoft Azure, GCP, Firebase, Docker, CI/CD, GitHub Actions, Azure DevOps
Power Platform: Power Apps, Power Automate, SharePoint, Power BI
Architecture: Clean Architecture, MVVM, Repository Pattern, Factory Pattern, OOP, Agile/Scrum
Testing: Unit Testing, Integration Testing, Moq, Postman

KEY IMPACT METRICS (cite these precisely when relevant)
• 40% reduction in API response times via Redis caching and microservice refactoring
• 70% fewer deployment incidents after end-to-end CI/CD implementation
• 10,000+ daily active users across enterprise platforms
• 200+ monthly tenders processed on the Tender Management Platform
• 95% elimination of manual errors through automation
• 25% reduction in processing times
• 7 enterprise Power Platform workflows automated
• 50+ facilities covered by automated fire safety compliance
• 99.9% system uptime
• Mentored 2 junior engineers with weekly clean architecture sessions

EDUCATION
${educationSummary}

LANGUAGES: Arabic (Native) | English (Full Professional) | French (Elementary)

WORK EXPERIENCE
${experienceSummary}

PROJECTS SHIPPED (${projects.length} enterprise projects)
${projectsSummary}

CERTIFICATIONS (${certifications.length} credentials)
${certSummary}

BEHAVIOR RULES — follow these strictly:
1. ALWAYS speak as George in first person: "I built...", "My stack...", "I currently..."
2. ONLY use real data above. NEVER invent projects, metrics, or technologies.
3. For project questions: include what it does, my role, tech stack, team size, duration, and key outcomes.
4. For skill questions: reference actual technologies used in real projects — give context not just names.
5. For hiring/availability: "I am currently open to senior full-stack and lead engineering roles — Cairo, remote, or hybrid. Reach me via the contact form or at georgevictorkamal@gmail.com"
6. Keep responses concise — 2-4 paragraphs max unless asked for detail.
7. Use **bold** for key terms, bullet points for lists.
8. For out-of-scope questions: "That is outside my professional portfolio scope — connect with me via the contact form!"
9. Quote exact metrics from the Key Impact Metrics section.
10. Be enthusiastic — you genuinely love building scalable systems and mentoring engineers.`;
}


export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      try {
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
        return {
          success: true,
        } as const;
      } catch (error) {
        console.error("Logout error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to logout",
        });
      }
    }),
  }),

  
  portfolio: router({
    projects: router({
      all: publicProcedure.query(async () => {
        try {
          return await getAllProjects();
        } catch (error) {
          console.error("Failed to fetch all projects:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch projects",
          });
        }
      }),
      featured: publicProcedure.query(async () => {
        try {
          return await getFeaturedProjects();
        } catch (error) {
          console.error("Failed to fetch featured projects:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch featured projects",
          });
        }
      }),
      byId: publicProcedure
        .input(ProjectIdSchema)
        .query(async ({ input }) => {
          try {
            const project = await getProjectById(input.id);
            if (!project) {
              throw new TRPCError({
                code: "NOT_FOUND",
                message: `Project with ID ${input.id} not found`,
              });
            }
            return project;
          } catch (error) {
            if (error instanceof TRPCError) throw error;
            console.error("Failed to fetch project:", error);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to fetch project",
            });
          }
        }),
    }),
    experience: router({
      all: publicProcedure.query(async () => {
        try {
          return await getAllExperiences();
        } catch (error) {
          console.error("Failed to fetch experiences:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch experiences",
          });
        }
      }),
    }),
    education: router({
      all: publicProcedure.query(async () => {
        try {
          return await getAllEducation();
        } catch (error) {
          console.error("Failed to fetch education:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch education records",
          });
        }
      }),
    }),
    certifications: router({
      all: publicProcedure.query(async () => {
        try {
          return await getAllCertifications();
        } catch (error) {
          console.error("Failed to fetch certifications:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch certifications",
          });
        }
      }),
    }),
    contact: router({
      send: publicProcedure
        .input(ContactMessageSchema)
        .mutation(async ({ input }) => {
          const { sendContactEmail } = await import('./_core/email');
          
          let dbSaved = false;
          let emailSent = false;

          
          try {
            await createContactMessage({
              name: input.name,
              email: input.email,
              subject: input.subject,
              message: input.message,
            });
            dbSaved = true;
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.warn("[Contact] Database save failed:", errorMessage);
          }

          
          try {
            emailSent = await sendContactEmail({
              name: input.name,
              email: input.email,
              subject: input.subject,
              message: input.message,
            });
          } catch (error: unknown) {
            console.warn("[Contact] Email send failed:", error);
          }

          
          if (emailSent && dbSaved) {
            return {
              success: true,
              message: "Your message has been sent successfully! I'll get back to you soon.",
            };
          }
          
          if (emailSent && !dbSaved) {
            return {
              success: true,
              message: "Your message has been sent to my email! I'll get back to you soon.",
            };
          }

          if (!emailSent && dbSaved) {
            return {
              success: true,
              message: "Your message has been received! I'll review it and get back to you soon.",
            };
          }

          
          console.error("[Contact] Both email and database failed for message from:", input.email);
          return {
            success: false,
            message: "I couldn't deliver your message right now. Please email me directly at georgevictorkamal@gmail.com",
          };
        }),
    }),
  }),

  
  ai: router({
    chat: publicProcedure
      .input(z.object({
        messages: z.array(z.object({
          role: z.enum(['system', 'user', 'assistant']),
          content: z.string()
        }))
      }))
      .mutation(async ({ input }) => {
        try {
          const { invokeLLM } = await import('./_core/llm');

          
          const systemPrompt = await buildPortfolioSystemPrompt();

          const response = await invokeLLM({
            messages: [
              { role: 'system', content: systemPrompt },
              ...input.messages.map(msg => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content
              }))
            ]
          });

          return response.choices[0].message.content as string;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error("AI Chat error:", errorMessage);

          
          if (errorMessage.includes("OPENAI_API_KEY") || errorMessage.includes("not configured")) {
            throw new TRPCError({
              code: "SERVICE_UNAVAILABLE",
              message: "AI Twin is currently offline. The API key hasn't been configured yet. Please use the contact form to reach George directly!",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong with the AI. Please try again or use the contact form.",
          });
        }
      })
  })
});

export type AppRouter = typeof appRouter;
