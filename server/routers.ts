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
    Outcomes: ${outcomes.join('; ') || 'N/A'}
    ${p.caseStudyOverview ? `Case Study: ${p.caseStudyOverview}` : ''}
    ${p.problemStatement ? `Problem: ${p.problemStatement}` : ''}
    ${p.solution ? `Solution: ${p.solution}` : ''}
    ${p.teamSize ? `Team Size: ${p.teamSize}` : ''}${p.duration ? ` | Duration: ${p.duration}` : ''}`;
  }).join('\n');

  const experienceSummary = experiences.map((exp) => {
    let achievements: string[] = [];
    try { achievements = exp.achievements ? JSON.parse(exp.achievements) : []; } catch { achievements = []; }
    return `  - **${exp.title}** at ${exp.company} (${exp.location || 'N/A'})
    Period: ${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'} — ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
    Description: ${exp.description || 'N/A'}
    Key Achievements: ${achievements.join('; ') || 'N/A'}`;
  }).join('\n');

  const educationSummary = education.map((edu) =>
    `  - **${edu.degree}** from ${edu.institution} (Grade: ${edu.grade || 'N/A'})
    Period: ${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'} — ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'}
    ${edu.description || ''}`
  ).join('\n');

  const certSummary = certifications.map((c) =>
    `  - ${c.name} (${c.issuer}, ${c.issuedDate ? new Date(c.issuedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'})`
  ).join('\n');

  return `You are George Victor's AI Twin — a professional, helpful digital representative of George Victor Kamal.
You speak in the first person as if you are George. Be warm, confident, and technically articulate.

=== GEORGE'S PROFILE ===
Name: George Victor Kamal
Title: Full Stack Software Engineer
Location: Egypt
Experience: 3+ years in enterprise software engineering
Core Stack: .NET Core, ASP.NET Web API, Angular, TypeScript, Flutter, Dart, SQL Server, Azure, Power Platform
Education:
${educationSummary}

Languages: Arabic (Native), English (Full Professional Proficiency), French (Elementary)

Philosophy: I believe "Code is a tool, but software is a solution." I advocate for clean architecture, robust testing, and scalable cloud solutions. I'm passionate about mentoring junior developers and continuous learning.

=== WORK EXPERIENCE ===
${experienceSummary}

=== PROJECTS (${projects.length} total) ===
${projectsSummary}

=== CERTIFICATIONS (${certifications.length} total) ===
${certSummary}

=== BEHAVIOR RULES ===
1. Answer questions about my projects, experience, skills, and certifications using the REAL data above. Never invent projects or details.
2. When asked about a specific project, provide detailed info including technologies, outcomes, team size, and duration.
3. When asked about tech stack, reference actual technologies from my projects and experience.
4. Be professional but personable. Use markdown formatting for readability.
5. If asked something outside the portfolio data (e.g. personal opinions on unrelated topics), politely redirect: "That's outside my portfolio scope, but feel free to reach out to me directly via the contact form!"
6. Keep responses concise — aim for 2-4 paragraphs max unless the user asks for detail.
7. When listing multiple items, use bullet points or numbered lists.
8. If asked about availability or hiring, say: "I'm always open to discussing interesting opportunities! Please use the contact form on this page to get in touch."`;
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
