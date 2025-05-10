import { 
  users, type User, type InsertUser,
  plantTypes, type PlantType, type InsertPlantType,
  plantParts, type PlantPart, type InsertPlantPart,
  industries, type Industry, type InsertIndustry,
  subIndustries, type SubIndustry, type InsertSubIndustry,
  hempProducts, type HempProduct, type InsertHempProduct
} from "@shared/schema";
import { IStorage } from "./storage";
import { db } from "./db";
import { eq, and, like, or, sql } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Plant type methods
  async getAllPlantTypes(): Promise<PlantType[]> {
    return db.select().from(plantTypes);
  }

  async getPlantType(id: number): Promise<PlantType | undefined> {
    const [plantType] = await db.select().from(plantTypes).where(eq(plantTypes.id, id));
    return plantType;
  }

  async createPlantType(insertPlantType: InsertPlantType): Promise<PlantType> {
    const [plantType] = await db.insert(plantTypes).values(insertPlantType).returning();
    return plantType;
  }

  // Plant part methods
  async getAllPlantParts(): Promise<PlantPart[]> {
    return db.select().from(plantParts);
  }

  async getPlantPartsByType(plantTypeId: number): Promise<PlantPart[]> {
    return db.select().from(plantParts).where(eq(plantParts.plantTypeId, plantTypeId));
  }

  async getPlantPart(id: number): Promise<PlantPart | undefined> {
    const [plantPart] = await db.select().from(plantParts).where(eq(plantParts.id, id));
    return plantPart;
  }

  async createPlantPart(insertPlantPart: InsertPlantPart): Promise<PlantPart> {
    const [plantPart] = await db.insert(plantParts).values(insertPlantPart).returning();
    return plantPart;
  }

  // Industry methods
  async getAllIndustries(): Promise<Industry[]> {
    return db.select().from(industries);
  }

  async getIndustry(id: number): Promise<Industry | undefined> {
    const [industry] = await db.select().from(industries).where(eq(industries.id, id));
    return industry;
  }

  async createIndustry(insertIndustry: InsertIndustry): Promise<Industry> {
    const [industry] = await db.insert(industries).values(insertIndustry).returning();
    return industry;
  }

  // Sub-industry methods
  async getAllSubIndustries(): Promise<SubIndustry[]> {
    return db.select().from(subIndustries);
  }

  async getSubIndustriesByIndustry(industryId: number): Promise<SubIndustry[]> {
    return db.select().from(subIndustries).where(eq(subIndustries.industryId, industryId));
  }

  async getSubIndustry(id: number): Promise<SubIndustry | undefined> {
    const [subIndustry] = await db.select().from(subIndustries).where(eq(subIndustries.id, id));
    return subIndustry;
  }

  async createSubIndustry(insertSubIndustry: InsertSubIndustry): Promise<SubIndustry> {
    const [subIndustry] = await db.insert(subIndustries).values(insertSubIndustry).returning();
    return subIndustry;
  }

  // Hemp product methods
  async getAllHempProducts(): Promise<HempProduct[]> {
    return db.select().from(hempProducts);
  }

  async getHempProduct(id: number): Promise<HempProduct | undefined> {
    const [product] = await db.select().from(hempProducts).where(eq(hempProducts.id, id));
    return product;
  }

  async getHempProductsByPart(plantPartId: number): Promise<HempProduct[]> {
    return db.select().from(hempProducts).where(eq(hempProducts.plantPartId, plantPartId));
  }

  async getHempProductsByIndustry(industryId: number): Promise<HempProduct[]> {
    return db.select().from(hempProducts).where(eq(hempProducts.industryId, industryId));
  }

  async getHempProductsBySubIndustry(subIndustryId: number): Promise<HempProduct[]> {
    return db.select().from(hempProducts).where(eq(hempProducts.subIndustryId, subIndustryId));
  }

  async getHempProductsByPartAndIndustry(plantPartId: number, industryId: number): Promise<HempProduct[]> {
    return db.select().from(hempProducts).where(
      and(
        eq(hempProducts.plantPartId, plantPartId),
        eq(hempProducts.industryId, industryId)
      )
    );
  }

  async createHempProduct(insertHempProduct: InsertHempProduct): Promise<HempProduct> {
    const [product] = await db.insert(hempProducts).values(insertHempProduct).returning();
    return product;
  }

  async searchHempProducts(query: string): Promise<HempProduct[]> {
    const searchPattern = `%${query}%`;
    return db.select().from(hempProducts).where(
      or(
        like(hempProducts.name, searchPattern),
        like(hempProducts.description, searchPattern)
      )
    );
  }

  async getPaginatedHempProducts(
    page: number,
    limit: number,
    plantPartId?: number,
    industryId?: number
  ): Promise<{products: HempProduct[], total: number}> {
    let whereClause = undefined;
    
    if (plantPartId !== undefined && industryId !== undefined) {
      whereClause = and(
        eq(hempProducts.plantPartId, plantPartId),
        eq(hempProducts.industryId, industryId)
      );
    } else if (plantPartId !== undefined) {
      whereClause = eq(hempProducts.plantPartId, plantPartId);
    } else if (industryId !== undefined) {
      whereClause = eq(hempProducts.industryId, industryId);
    }
    
    // Get total count
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(hempProducts)
      .where(whereClause);
    
    const total = totalResult[0].count;
    
    // Get paginated results
    const offset = (page - 1) * limit;
    const products = await db
      .select()
      .from(hempProducts)
      .where(whereClause)
      .limit(limit)
      .offset(offset);
    
    return { products, total };
  }

  async countTotalHempProducts(): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(hempProducts);
    
    return result[0].count;
  }

  // Initialize the database with sample data
  async initializeData() {
    // Sample plant types
    const plantTypesCount = await db.select({ count: sql<number>`count(*)` }).from(plantTypes);
    
    if (plantTypesCount[0].count === 0) {
      // Sample plant types
      const [fiberHemp] = await db.insert(plantTypes).values({
        name: "Fiber Hemp",
        description: "Cultivated for long, strong fibers with high plant density",
        imageUrl: "https://pixabay.com/get/g6e1d4bc9fc259ef3f35285a72b1996cc3991ffd29e0f9fee3cd67f3cbcfe192df0d3392e0c14e7108c73cf233e35d288967a8644c85f90a98486bf7848d4ff51_1280.jpg",
        plantingDensity: "800,000+ plants/acre",
        characteristics: "Tall stalks with minimal branching, optimized for fiber production"
      }).returning();
      
      const [grainHemp] = await db.insert(plantTypes).values({
        name: "Grain/Seed Hemp",
        description: "Grown for nutritious seeds with moderate plant density",
        imageUrl: "https://images.unsplash.com/photo-1589187307467-03d53e90eebf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
        plantingDensity: "Moderate density",
        characteristics: "Plants with good seed head development, higher branching"
      }).returning();
      
      const [cannabinoidHemp] = await db.insert(plantTypes).values({
        name: "Cannabinoid Hemp",
        description: "Cultivated for CBD-rich flowers with low plant density",
        imageUrl: "https://images.unsplash.com/photo-1603909223429-69858a6513bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
        plantingDensity: "1,600 plants/acre",
        characteristics: "Widely spaced plants with extensive flower development"
      }).returning();
      
      // Sample plant parts for Fiber Hemp
      const [stalk] = await db.insert(plantParts).values({
        name: "Stalk",
        description: "The main stem of the hemp plant, consisting of bast fiber and hurd",
        imageUrl: "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        plantTypeId: fiberHemp.id
      }).returning();
      
      const [leaves] = await db.insert(plantParts).values({
        name: "Leaves",
        description: "Fan and sugar leaves from the hemp plant",
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        plantTypeId: fiberHemp.id
      }).returning();
      
      const [seeds] = await db.insert(plantParts).values({
        name: "Seeds",
        description: "Whole and dehulled seeds from the hemp plant",
        imageUrl: "https://images.unsplash.com/photo-1531684051069-6431885272eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        plantTypeId: fiberHemp.id
      }).returning();
      
      const [flowers] = await db.insert(plantParts).values({
        name: "Flowers",
        description: "Male and female flowers from the hemp plant",
        imageUrl: "https://images.unsplash.com/photo-1458049775681-3882d46265f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        plantTypeId: fiberHemp.id
      }).returning();
      
      const [roots] = await db.insert(plantParts).values({
        name: "Roots",
        description: "Taproot and fibrous roots of the hemp plant",
        imageUrl: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        plantTypeId: fiberHemp.id
      }).returning();
      
      // Sample industries
      const [textiles] = await db.insert(industries).values({
        name: "Textiles",
        description: "Fabric and textile-related applications of hemp",
        iconName: "Shirt"
      }).returning();
      
      const [construction] = await db.insert(industries).values({
        name: "Construction",
        description: "Building materials and construction applications of hemp",
        iconName: "Building2"
      }).returning();
      
      const [paper] = await db.insert(industries).values({
        name: "Paper",
        description: "Paper and pulp products made from hemp",
        iconName: "FileText"
      }).returning();
      
      const [automotive] = await db.insert(industries).values({
        name: "Automotive",
        description: "Hemp applications in the automotive industry",
        iconName: "Car"
      }).returning();
      
      const [animalCare] = await db.insert(industries).values({
        name: "Animal Care",
        description: "Hemp products for animal care and welfare",
        iconName: "Paw"
      }).returning();
      
      // Sample sub-industries
      const [clothing] = await db.insert(subIndustries).values({
        name: "Clothing & Apparel",
        description: "Hemp-based clothing and wearable items",
        industryId: textiles.id
      }).returning();
      
      const [hempcrete] = await db.insert(subIndustries).values({
        name: "Hempcrete",
        description: "Hemp-based building material",
        industryId: construction.id
      }).returning();
      
      const [specialtyPaper] = await db.insert(subIndustries).values({
        name: "Specialty Paper",
        description: "High-quality hemp paper products",
        industryId: paper.id
      }).returning();
      
      const [biocomposites] = await db.insert(subIndustries).values({
        name: "Biocomposites",
        description: "Hemp-based composite materials for automotive parts",
        industryId: automotive.id
      }).returning();
      
      const [animalBedding] = await db.insert(subIndustries).values({
        name: "Animal Bedding",
        description: "Hemp bedding for animals",
        industryId: animalCare.id
      }).returning();
      
      // Sample hemp products
      await db.insert(hempProducts).values({
        name: "Hemp Clothing & Apparel",
        description: "Hemp fiber can be processed into a versatile textile similar to linen that is durable, breathable, and antimicrobial. Used for clothing, the material becomes softer with each wash while maintaining its strength.",
        imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        plantPartId: stalk.id,
        industryId: textiles.id,
        subIndustryId: clothing.id,
        properties: ["Durable", "Breathable", "UV resistant", "Antimicrobial"],
        facts: [
          "Hemp fiber is 3-8 times stronger than cotton",
          "Naturally UV resistant",
          "Antimicrobial properties",
          "Highly breathable"
        ],
        sustainabilityImpact: "Hemp requires significantly less water than cotton (approximately 50% less), minimal pesticides, and naturally improves soil health through phytoremediation. It produces 250% more fiber per acre than cotton and captures substantial amounts of CO₂ during growth.",
        affiliateLinks: [
          { name: "EcoHemp", url: "https://example.com/ecohemp" },
          { name: "Hemp Traders", url: "https://example.com/hemptraders" },
          { name: "Patagonia Hemp", url: "https://example.com/patagonia" }
        ],
        relatedProductIds: [2, 3, 4]
      });
      
      await db.insert(hempProducts).values({
        name: "Hempcrete",
        description: "Hempcrete is a biocomposite building material made from hemp hurd mixed with lime and water. It creates a lightweight, insulating material with excellent thermal mass and carbon-negative properties.",
        imageUrl: "https://images.unsplash.com/photo-1518005068251-37900150dfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        plantPartId: stalk.id,
        industryId: construction.id,
        subIndustryId: hempcrete.id,
        properties: ["Insulating", "Fire-resistant", "Carbon-negative", "Moisture-regulating"],
        facts: [
          "Hempcrete is carbon-negative",
          "Provides excellent thermal insulation",
          "Naturally resists mold and pests",
          "Regulates humidity"
        ],
        sustainabilityImpact: "Hempcrete sequesters carbon throughout its lifecycle. One cubic meter of hempcrete can store approximately 110 kg of CO2, making it carbon-negative. It also reduces energy costs through its thermal properties.",
        affiliateLinks: [
          { name: "American Lime Technology", url: "https://example.com/americanlime" },
          { name: "Hemp Technologies", url: "https://example.com/hemptech" }
        ],
        relatedProductIds: [3, 5]
      });
      
      await db.insert(hempProducts).values({
        name: "Specialty Paper",
        description: "Hemp pulp creates high-quality paper that is stronger, more durable, and more environmentally sustainable than wood pulp. It's commonly used for specialty papers, art papers, filters, and banknotes.",
        imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        plantPartId: stalk.id,
        industryId: paper.id,
        subIndustryId: specialtyPaper.id,
        properties: ["Acid-free", "Long-lasting", "Recyclable", "Tree-saving"],
        facts: [
          "One acre of hemp produces as much paper as 4-10 acres of trees",
          "Hemp paper can be recycled up to 8 times (vs 3 for wood pulp)",
          "Hemp paper doesn't yellow with age",
          "Hemp paper doesn't require toxic bleaching chemicals"
        ],
        sustainabilityImpact: "Hemp grows to maturity in 3-4 months vs 20-50 years for trees, making it a far more sustainable source of paper. It also requires fewer chemicals for processing and is naturally acid-free.",
        affiliateLinks: [
          { name: "Green Field Paper Company", url: "https://example.com/greenfield" },
          { name: "Tree Free Hemp", url: "https://example.com/treefree" }
        ],
        relatedProductIds: [1, 4]
      });
      
      await db.insert(hempProducts).values({
        name: "Automotive Biocomposites",
        description: "Hemp fibers are used in biocomposite materials for automotive interior components, reducing weight while maintaining strength. These materials replace fiberglass in door panels, dashboards, and other parts.",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        plantPartId: stalk.id,
        industryId: automotive.id,
        subIndustryId: biocomposites.id,
        properties: ["Lightweight", "Impact-resistant", "Biodegradable", "Eco-friendly"],
        facts: [
          "Hemp composites can be 30% lighter than fiberglass",
          "Reduces vehicle weight and improves fuel economy",
          "Biodegradable at end of life",
          "Several major automakers now use hemp composites"
        ],
        sustainabilityImpact: "Hemp biocomposites reduce vehicle weight, improving fuel efficiency and reducing emissions. Unlike fiberglass, these materials can biodegrade at end-of-life, reducing landfill impact.",
        affiliateLinks: [
          { name: "FlexForm Technologies", url: "https://example.com/flexform" }
        ],
        relatedProductIds: [1, 5]
      });
      
      await db.insert(hempProducts).values({
        name: "Animal Bedding",
        description: "Hemp hurd makes excellent animal bedding due to its high absorbency, dust-free nature, and natural antimicrobial properties. It can absorb up to 4 times its weight in moisture while controlling odors.",
        imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        plantPartId: stalk.id,
        industryId: animalCare.id,
        subIndustryId: animalBedding.id,
        properties: ["Super-absorbent", "Low-dust", "Odor-control", "Compostable"],
        facts: [
          "Hemp bedding absorbs up to 4x its weight in moisture",
          "Virtually dust-free, reducing respiratory issues",
          "Natural antimicrobial properties reduce odor",
          "Fully compostable after use"
        ],
        sustainabilityImpact: "Hemp bedding is a sustainable alternative to wood shavings, straw, or paper bedding. It's renewable, biodegradable, and can be composted after use.",
        affiliateLinks: [
          { name: "HempFlax Bedding", url: "https://example.com/hempflax" },
          { name: "Aubiose", url: "https://example.com/aubiose" }
        ],
        relatedProductIds: [2]
      });
    }
  }
}