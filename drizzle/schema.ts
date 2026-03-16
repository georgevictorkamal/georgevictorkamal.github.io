import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Projects table for portfolio showcase
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  shortDescription: varchar("shortDescription", { length: 500 }),
  imageUrl: text("imageUrl"),
  role: varchar("role", { length: 255 }),
  contribution: text("contribution"),
  technologies: text("technologies"), // JSON array as string
  outcomes: text("outcomes"), // JSON array as string
  demoUrl: text("demoUrl"),
  sourceUrl: text("sourceUrl"),
  category: varchar("category", { length: 100 }),
  featured: int("featured").default(0),
  order: int("order").default(0),
  // Case study fields
  caseStudyOverview: text("caseStudyOverview"),
  problemStatement: text("problemStatement"),
  solution: text("solution"),
  architecture: text("architecture"), // JSON object as string
  challenges: text("challenges"), // JSON array as string
  measurableOutcomes: text("measurableOutcomes"), // JSON array as string
  teamSize: int("teamSize"),
  duration: varchar("duration", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

// Experience table
export const experiences = mysqlTable("experiences", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  description: text("description"),
  achievements: text("achievements"), // JSON array as string
  current: int("current").default(0),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = typeof experiences.$inferInsert;

// Education table
export const education = mysqlTable("education", {
  id: int("id").autoincrement().primaryKey(),
  degree: varchar("degree", { length: 255 }).notNull(),
  institution: varchar("institution", { length: 255 }).notNull(),
  field: varchar("field", { length: 255 }),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  grade: varchar("grade", { length: 100 }),
  description: text("description"),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Education = typeof education.$inferSelect;
export type InsertEducation = typeof education.$inferInsert;

// Certifications table
export const certifications = mysqlTable("certifications", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  issuer: varchar("issuer", { length: 255 }).notNull(),
  issuedDate: timestamp("issuedDate").notNull(),
  credentialUrl: text("credentialUrl"),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Certification = typeof certifications.$inferSelect;
export type InsertCertification = typeof certifications.$inferInsert;

// Contact messages table
export const contactMessages = mysqlTable("contactMessages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: int("read").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
