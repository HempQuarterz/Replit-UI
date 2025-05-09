import { pgTable, text, serial, integer, boolean, jsonb, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table for potential future authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Hemp plant types table
export const plantTypes = pgTable("plant_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  plantingDensity: text("planting_density"),
  characteristics: text("characteristics"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPlantTypeSchema = createInsertSchema(plantTypes).pick({
  name: true,
  description: true,
  imageUrl: true,
  plantingDensity: true,
  characteristics: true,
});

// Plant parts table
export const plantParts = pgTable("plant_parts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  plantTypeId: integer("plant_type_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPlantPartSchema = createInsertSchema(plantParts).pick({
  name: true,
  description: true,
  imageUrl: true,
  plantTypeId: true,
});

// Industries table
export const industries = pgTable("industries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  iconName: text("icon_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertIndustrySchema = createInsertSchema(industries).pick({
  name: true,
  description: true,
  iconName: true,
});

// Sub-industries/categories table
export const subIndustries = pgTable("sub_industries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  industryId: integer("industry_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubIndustrySchema = createInsertSchema(subIndustries).pick({
  name: true,
  description: true,
  industryId: true,
});

// Hemp products/uses table
export const hempProducts = pgTable("hemp_products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  plantPartId: integer("plant_part_id").notNull(),
  industryId: integer("industry_id").notNull(),
  subIndustryId: integer("sub_industry_id"),
  properties: jsonb("properties"),
  facts: jsonb("facts"),
  sustainabilityImpact: text("sustainability_impact"),
  affiliateLinks: jsonb("affiliate_links"),
  relatedProductIds: jsonb("related_product_ids"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHempProductSchema = createInsertSchema(hempProducts).pick({
  name: true,
  description: true,
  imageUrl: true,
  plantPartId: true,
  industryId: true,
  subIndustryId: true,
  properties: true,
  facts: true,
  sustainabilityImpact: true,
  affiliateLinks: true,
  relatedProductIds: true,
});

// Types
export type PlantType = typeof plantTypes.$inferSelect;
export type InsertPlantType = z.infer<typeof insertPlantTypeSchema>;

export type PlantPart = typeof plantParts.$inferSelect;
export type InsertPlantPart = z.infer<typeof insertPlantPartSchema>;

export type Industry = typeof industries.$inferSelect;
export type InsertIndustry = z.infer<typeof insertIndustrySchema>;

export type SubIndustry = typeof subIndustries.$inferSelect;
export type InsertSubIndustry = z.infer<typeof insertSubIndustrySchema>;

export type HempProduct = typeof hempProducts.$inferSelect;
export type InsertHempProduct = z.infer<typeof insertHempProductSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
