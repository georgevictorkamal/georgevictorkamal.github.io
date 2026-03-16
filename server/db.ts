import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, projects, experiences, education, certifications, contactMessages } from "../drizzle/schema";
import { ENV } from './_core/env';
import { mockProjects, mockExperiences, mockEducation, mockCertifications } from '../shared/mockData';

let _db: ReturnType<typeof drizzle> | null = null;


export async function getDb() {
  if (!_db && ENV.databaseUrl) {
    try {
      _db = drizzle(ENV.databaseUrl);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}


export async function getAllProjects() {
  const db = await getDb();
  if (!db) return mockProjects;

  const result = await db.select().from(projects).orderBy(projects.order);
  return result.length > 0 ? result : mockProjects;
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return mockProjects.find(p => p.id === id) || null;

  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : (mockProjects.find(p => p.id === id) || null);
}

export async function getFeaturedProjects() {
  const db = await getDb();
  if (!db) return mockProjects.filter(p => p.featured === 1);

  const result = await db.select().from(projects).where(eq(projects.featured, 1)).orderBy(projects.order);
  return result.length > 0 ? result : mockProjects.filter(p => p.featured === 1);
}


export async function getAllExperiences() {
  const db = await getDb();
  if (!db) return mockExperiences;

  const result = await db.select().from(experiences).orderBy(experiences.order);
  return result.length > 0 ? result : mockExperiences;
}


export async function getAllEducation() {
  const db = await getDb();
  if (!db) return mockEducation;

  const result = await db.select().from(education).orderBy(education.order);
  return result.length > 0 ? result : mockEducation;
}


export async function getAllCertifications() {
  const db = await getDb();
  if (!db) return mockCertifications;

  const result = await db.select().from(certifications).orderBy(certifications.order);
  return result.length > 0 ? result : mockCertifications;
}


export async function createContactMessage(message: typeof contactMessages.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contactMessages).values(message);
  return result;
}
