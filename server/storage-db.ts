import { 
  users, type User, type InsertUser,
  plantTypes, type PlantType, type InsertPlantType,
  plantParts, type PlantPart, type InsertPlantPart,
  industries, type Industry, type InsertIndustry,
  subIndustries, type SubIndustry, type InsertSubIndustry,
  hempProducts, type HempProduct, type InsertHempProduct
} from "@shared/schema";
import { db } from "./db";
import { eq, sql, and, like, ilike, or } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const users_result = await db.select().from(users).where(eq(users.id, id));
    return users_result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users_result = await db.select().from(users).where(eq(users.username, username));
    return users_result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const results = await db.insert(users).values(insertUser).returning();
    return results[0];
  }

  // Plant type methods
  async getAllPlantTypes(): Promise<PlantType[]> {
    return await db.select().from(plantTypes);
  }

  async getPlantType(id: number): Promise<PlantType | undefined> {
    const results = await db.select().from(plantTypes).where(eq(plantTypes.id, id));
    return results[0];
  }

  async createPlantType(insertPlantType: InsertPlantType): Promise<PlantType> {
    const results = await db.insert(plantTypes).values(insertPlantType).returning();
    return results[0];
  }

  // Plant part methods
  async getAllPlantParts(): Promise<PlantPart[]> {
    return await db.select().from(plantParts);
  }

  async getPlantPartsByType(plantTypeId: number): Promise<PlantPart[]> {
    return await db.select().from(plantParts).where(eq(plantParts.plantTypeId, plantTypeId));
  }

  async getPlantPart(id: number): Promise<PlantPart | undefined> {
    const results = await db.select().from(plantParts).where(eq(plantParts.id, id));
    return results[0];
  }

  async createPlantPart(insertPlantPart: InsertPlantPart): Promise<PlantPart> {
    const results = await db.insert(plantParts).values(insertPlantPart).returning();
    return results[0];
  }

  // Industry methods
  async getAllIndustries(): Promise<Industry[]> {
    return await db.select().from(industries);
  }

  async getIndustry(id: number): Promise<Industry | undefined> {
    const results = await db.select().from(industries).where(eq(industries.id, id));
    return results[0];
  }

  async createIndustry(insertIndustry: InsertIndustry): Promise<Industry> {
    const results = await db.insert(industries).values(insertIndustry).returning();
    return results[0];
  }

  // Sub-industry methods
  async getAllSubIndustries(): Promise<SubIndustry[]> {
    return await db.select().from(subIndustries);
  }

  async getSubIndustriesByIndustry(industryId: number): Promise<SubIndustry[]> {
    return await db.select().from(subIndustries).where(eq(subIndustries.industryId, industryId));
  }

  async getSubIndustry(id: number): Promise<SubIndustry | undefined> {
    const results = await db.select().from(subIndustries).where(eq(subIndustries.id, id));
    return results[0];
  }

  async createSubIndustry(insertSubIndustry: InsertSubIndustry): Promise<SubIndustry> {
    const results = await db.insert(subIndustries).values(insertSubIndustry).returning();
    return results[0];
  }

  // Hemp product methods
  async getAllHempProducts(): Promise<HempProduct[]> {
    return await db.select().from(hempProducts);
  }

  async getHempProduct(id: number): Promise<HempProduct | undefined> {
    const results = await db.select().from(hempProducts).where(eq(hempProducts.id, id));
    return results[0];
  }

  async getHempProductsByPart(plantPartId: number): Promise<HempProduct[]> {
    return await db.select().from(hempProducts).where(eq(hempProducts.plantPartId, plantPartId));
  }

  async getHempProductsByIndustry(industryId: number): Promise<HempProduct[]> {
    return await db.select().from(hempProducts).where(eq(hempProducts.industryId, industryId));
  }

  async getHempProductsBySubIndustry(subIndustryId: number): Promise<HempProduct[]> {
    return await db.select().from(hempProducts).where(eq(hempProducts.subIndustryId, subIndustryId));
  }

  async getHempProductsByPartAndIndustry(plantPartId: number, industryId: number): Promise<HempProduct[]> {
    return await db.select().from(hempProducts).where(
      and(
        eq(hempProducts.plantPartId, plantPartId),
        eq(hempProducts.industryId, industryId)
      )
    );
  }

  async createHempProduct(insertHempProduct: InsertHempProduct): Promise<HempProduct> {
    const results = await db.insert(hempProducts).values(insertHempProduct).returning();
    return results[0];
  }

  async searchHempProducts(query: string): Promise<HempProduct[]> {
    return await db.select().from(hempProducts).where(
      or(
        ilike(hempProducts.name, `%${query}%`),
        ilike(hempProducts.description, `%${query}%`)
      )
    );
  }

  async getPaginatedHempProducts(
    page: number = 1, 
    limit: number = 5, 
    plantPartId?: number, 
    industryId?: number
  ): Promise<{products: HempProduct[], total: number}> {
    const offset = (page - 1) * limit;
    
    let whereClause = undefined;
    
    if (plantPartId && industryId) {
      whereClause = and(
        eq(hempProducts.plantPartId, plantPartId),
        eq(hempProducts.industryId, industryId)
      );
    } else if (plantPartId) {
      whereClause = eq(hempProducts.plantPartId, plantPartId);
    } else if (industryId) {
      whereClause = eq(hempProducts.industryId, industryId);
    }
    
    let query = db.select().from(hempProducts);
    
    if (whereClause) {
      query = query.where(whereClause);
    }
    
    const products = await query.limit(limit).offset(offset);
    
    const countQuery = db.select({ count: sql<number>`count(*)` }).from(hempProducts);
    
    if (whereClause) {
      countQuery.where(whereClause);
    }
    
    const countResult = await countQuery;
    const total = countResult[0].count;
    
    return { products, total };
  }

  async countTotalHempProducts(): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` }).from(hempProducts);
    return result[0].count;
  }

  // Initialize the database with sample data
  async initializeData() {
    try {
      // Count tables to check if data needs to be initialized
      const plantTypesCount = await db.select({ count: sql<number>`count(*)` }).from(plantTypes);
      const industriesCount = await db.select({ count: sql<number>`count(*)` }).from(industries);
      const plantPartsCount = await db.select({ count: sql<number>`count(*)` }).from(plantParts);
      
      console.log(`Current data counts - Plant Types: ${plantTypesCount[0].count}, Industries: ${industriesCount[0].count}, Plant Parts: ${plantPartsCount[0].count}`);
      
      // Only initialize if empty (excluding test data)
      if (plantTypesCount[0].count <= 1) {
        console.log("Initializing plant types data...");
        
        // Sample plant types
        const fiberHempResult = await db.execute(sql`
          INSERT INTO plant_types (name, description, image_url, planting_density, characteristics)
          VALUES ('Fiber Hemp', 'Cultivated for long, strong fibers with high plant density', 
                 'https://images.unsplash.com/photo-1535704882196-765e5fc62a53',
                 '800,000+ plants/acre', 'Tall stalks with minimal branching, optimized for fiber production')
          RETURNING id;
        `);
        
        const grainHempResult = await db.execute(sql`
          INSERT INTO plant_types (name, description, image_url, planting_density, characteristics)
          VALUES ('Grain/Seed Hemp', 'Grown for nutritious seeds with moderate plant density', 
                 'https://images.unsplash.com/photo-1589187307467-03d53e90eebf',
                 'Moderate density', 'Plants with good seed head development, higher branching')
          RETURNING id;
        `);
        
        const cbdHempResult = await db.execute(sql`
          INSERT INTO plant_types (name, description, image_url, planting_density, characteristics)
          VALUES ('Cannabinoid Hemp', 'Cultivated for CBD-rich flowers with low plant density', 
                 'https://images.unsplash.com/photo-1603909223429-69858a6513bb',
                 '1,600 plants/acre', 'Widely spaced plants with extensive flower development')
          RETURNING id;
        `);
        
        // Get the first plant type ID for creating plant parts
        if (fiberHempResult.rows && fiberHempResult.rows.length > 0) {
          const fiberHempId = fiberHempResult.rows[0].id;
          
          // Add plant parts if none exist
          if (plantPartsCount[0].count === 0) {
            console.log("Initializing plant parts data...");
            
            await db.execute(sql`
              INSERT INTO plant_parts (name, description, image_url, plant_type_id)
              VALUES ('Stalk', 'The main stem of the hemp plant, consisting of bast fiber and hurd', 
                    'https://images.unsplash.com/photo-1535704882196-765e5fc62a53', 
                    ${fiberHempId})
              RETURNING id;
            `);
            
            await db.execute(sql`
              INSERT INTO plant_parts (name, description, image_url, plant_type_id)
              VALUES ('Leaves', 'Fan and sugar leaves from the hemp plant', 
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef', 
                    ${fiberHempId})
              RETURNING id;
            `);
            
            await db.execute(sql`
              INSERT INTO plant_parts (name, description, image_url, plant_type_id)
              VALUES ('Seeds', 'Whole and dehulled seeds from the hemp plant', 
                    'https://images.unsplash.com/photo-1531684051069-6431885272eb', 
                    ${fiberHempId})
              RETURNING id;
            `);
          }
        }
        
        // Add industries if none exist
        if (industriesCount[0].count === 0) {
          console.log("Initializing industries data...");
          
          const textilesResult = await db.execute(sql`
            INSERT INTO industries (name, description, icon_name)
            VALUES ('Textiles', 'Fabric and textile-related applications of hemp', 'Shirt')
            RETURNING id;
          `);
          
          const constructionResult = await db.execute(sql`
            INSERT INTO industries (name, description, icon_name)
            VALUES ('Construction', 'Building materials and construction applications of hemp', 'Building2')
            RETURNING id;
          `);
          
          const paperResult = await db.execute(sql`
            INSERT INTO industries (name, description, icon_name)
            VALUES ('Paper', 'Paper and pulp products made from hemp', 'FileText')
            RETURNING id;
          `);
        }
      }
      
      console.log("Database initialization completed successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }
}

export const storage = new DatabaseStorage();