import { 
  users, type User, type InsertUser,
  plantTypes, type PlantType, type InsertPlantType,
  plantParts, type PlantPart, type InsertPlantPart,
  industries, type Industry, type InsertIndustry,
  subIndustries, type SubIndustry, type InsertSubIndustry,
  hempProducts, type HempProduct, type InsertHempProduct
} from "@shared/schema";
import { DatabaseStorage } from "./storage-db";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Plant type methods
  getAllPlantTypes(): Promise<PlantType[]>;
  getPlantType(id: number): Promise<PlantType | undefined>;
  createPlantType(plantType: InsertPlantType): Promise<PlantType>;

  // Plant part methods
  getAllPlantParts(): Promise<PlantPart[]>;
  getPlantPartsByType(plantTypeId: number): Promise<PlantPart[]>;
  getPlantPart(id: number): Promise<PlantPart | undefined>;
  createPlantPart(plantPart: InsertPlantPart): Promise<PlantPart>;

  // Industry methods
  getAllIndustries(): Promise<Industry[]>;
  getIndustry(id: number): Promise<Industry | undefined>;
  createIndustry(industry: InsertIndustry): Promise<Industry>;

  // Sub-industry methods
  getAllSubIndustries(): Promise<SubIndustry[]>;
  getSubIndustriesByIndustry(industryId: number): Promise<SubIndustry[]>;
  getSubIndustry(id: number): Promise<SubIndustry | undefined>;
  createSubIndustry(subIndustry: InsertSubIndustry): Promise<SubIndustry>;

  // Hemp product methods
  getAllHempProducts(): Promise<HempProduct[]>;
  getHempProduct(id: number): Promise<HempProduct | undefined>;
  getHempProductsByPart(plantPartId: number): Promise<HempProduct[]>;
  getHempProductsByIndustry(industryId: number): Promise<HempProduct[]>;
  getHempProductsBySubIndustry(subIndustryId: number): Promise<HempProduct[]>;
  getHempProductsByPartAndIndustry(plantPartId: number, industryId: number): Promise<HempProduct[]>;
  createHempProduct(hempProduct: InsertHempProduct): Promise<HempProduct>;
  searchHempProducts(query: string): Promise<HempProduct[]>;
  getPaginatedHempProducts(page: number, limit: number, plantPartId?: number, industryId?: number): Promise<{products: HempProduct[], total: number}>;
  countTotalHempProducts(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private plantTypes: Map<number, PlantType>;
  private plantParts: Map<number, PlantPart>;
  private industries: Map<number, Industry>;
  private subIndustries: Map<number, SubIndustry>;
  private hempProducts: Map<number, HempProduct>;
  
  private userCurrentId: number;
  private plantTypeCurrentId: number;
  private plantPartCurrentId: number;
  private industryCurrentId: number;
  private subIndustryCurrentId: number;
  private hempProductCurrentId: number;

  constructor() {
    this.users = new Map();
    this.plantTypes = new Map();
    this.plantParts = new Map();
    this.industries = new Map();
    this.subIndustries = new Map();
    this.hempProducts = new Map();
    
    this.userCurrentId = 1;
    this.plantTypeCurrentId = 1;
    this.plantPartCurrentId = 1;
    this.industryCurrentId = 1;
    this.subIndustryCurrentId = 1;
    this.hempProductCurrentId = 1;
    
    this.initializeData();
  }

  // Initialize with some sample data
  private initializeData() {
    // Sample plant types
    const fiberHemp = this.createPlantType({
      name: "Fiber Hemp",
      description: "Cultivated for long, strong fibers with high plant density",
      imageUrl: "https://pixabay.com/get/g6e1d4bc9fc259ef3f35285a72b1996cc3991ffd29e0f9fee3cd67f3cbcfe192df0d3392e0c14e7108c73cf233e35d288967a8644c85f90a98486bf7848d4ff51_1280.jpg",
      plantingDensity: "800,000+ plants/acre",
      characteristics: "Tall stalks with minimal branching, optimized for fiber production"
    });
    
    const grainHemp = this.createPlantType({
      name: "Grain/Seed Hemp",
      description: "Grown for nutritious seeds with moderate plant density",
      imageUrl: "https://images.unsplash.com/photo-1589187307467-03d53e90eebf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      plantingDensity: "Moderate density",
      characteristics: "Plants with good seed head development, higher branching"
    });
    
    const cannabinoidHemp = this.createPlantType({
      name: "Cannabinoid Hemp",
      description: "Cultivated for CBD-rich flowers with low plant density",
      imageUrl: "https://images.unsplash.com/photo-1603909223429-69858a6513bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      plantingDensity: "1,600 plants/acre",
      characteristics: "Widely spaced plants with extensive flower development"
    });
    
    // Sample plant parts for Fiber Hemp
    const stalk = this.createPlantPart({
      name: "Stalk",
      description: "The main stem of the hemp plant, consisting of bast fiber and hurd",
      imageUrl: "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      plantTypeId: fiberHemp.id
    });
    
    const leaves = this.createPlantPart({
      name: "Leaves",
      description: "Fan and sugar leaves from the hemp plant",
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      plantTypeId: fiberHemp.id
    });
    
    const seeds = this.createPlantPart({
      name: "Seeds",
      description: "Whole and dehulled seeds from the hemp plant",
      imageUrl: "https://images.unsplash.com/photo-1531684051069-6431885272eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      plantTypeId: fiberHemp.id
    });
    
    const flowers = this.createPlantPart({
      name: "Flowers",
      description: "Male and female flowers from the hemp plant",
      imageUrl: "https://images.unsplash.com/photo-1458049775681-3882d46265f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      plantTypeId: fiberHemp.id
    });
    
    const roots = this.createPlantPart({
      name: "Roots",
      description: "Taproot and fibrous roots of the hemp plant",
      imageUrl: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      plantTypeId: fiberHemp.id
    });
    
    // Sample industries
    const textiles = this.createIndustry({
      name: "Textiles",
      description: "Fabric and textile-related applications of hemp",
      iconName: "Shirt"
    });
    
    const construction = this.createIndustry({
      name: "Construction",
      description: "Building materials and construction applications of hemp",
      iconName: "Building2"
    });
    
    const paper = this.createIndustry({
      name: "Paper",
      description: "Paper and pulp products made from hemp",
      iconName: "FileText"
    });
    
    const automotive = this.createIndustry({
      name: "Automotive",
      description: "Hemp applications in the automotive industry",
      iconName: "Car"
    });
    
    const animalCare = this.createIndustry({
      name: "Animal Care",
      description: "Hemp products for animal care and welfare",
      iconName: "Paw"
    });
    
    // Sample sub-industries
    const clothing = this.createSubIndustry({
      name: "Clothing & Apparel",
      description: "Hemp-based clothing and wearable items",
      industryId: textiles.id
    });
    
    const hempcrete = this.createSubIndustry({
      name: "Hempcrete",
      description: "Hemp-based building material",
      industryId: construction.id
    });
    
    const specialtyPaper = this.createSubIndustry({
      name: "Specialty Paper",
      description: "High-quality hemp paper products",
      industryId: paper.id
    });
    
    const biocomposites = this.createSubIndustry({
      name: "Biocomposites",
      description: "Hemp-based composite materials for automotive parts",
      industryId: automotive.id
    });
    
    const animalBedding = this.createSubIndustry({
      name: "Animal Bedding",
      description: "Hemp bedding for animals",
      industryId: animalCare.id
    });
    
    // Sample hemp products
    this.createHempProduct({
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
    
    this.createHempProduct({
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
    
    this.createHempProduct({
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
    
    this.createHempProduct({
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
    
    this.createHempProduct({
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

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Plant type methods
  async getAllPlantTypes(): Promise<PlantType[]> {
    return Array.from(this.plantTypes.values());
  }

  async getPlantType(id: number): Promise<PlantType | undefined> {
    return this.plantTypes.get(id);
  }

  async createPlantType(insertPlantType: InsertPlantType): Promise<PlantType> {
    const id = this.plantTypeCurrentId++;
    const now = new Date();
    const plantType: PlantType = { ...insertPlantType, id, createdAt: now };
    this.plantTypes.set(id, plantType);
    return plantType;
  }

  // Plant part methods
  async getAllPlantParts(): Promise<PlantPart[]> {
    return Array.from(this.plantParts.values());
  }

  async getPlantPartsByType(plantTypeId: number): Promise<PlantPart[]> {
    return Array.from(this.plantParts.values()).filter(
      (part) => part.plantTypeId === plantTypeId
    );
  }

  async getPlantPart(id: number): Promise<PlantPart | undefined> {
    return this.plantParts.get(id);
  }

  async createPlantPart(insertPlantPart: InsertPlantPart): Promise<PlantPart> {
    const id = this.plantPartCurrentId++;
    const now = new Date();
    const plantPart: PlantPart = { ...insertPlantPart, id, createdAt: now };
    this.plantParts.set(id, plantPart);
    return plantPart;
  }

  // Industry methods
  async getAllIndustries(): Promise<Industry[]> {
    return Array.from(this.industries.values());
  }

  async getIndustry(id: number): Promise<Industry | undefined> {
    return this.industries.get(id);
  }

  async createIndustry(insertIndustry: InsertIndustry): Promise<Industry> {
    const id = this.industryCurrentId++;
    const now = new Date();
    const industry: Industry = { ...insertIndustry, id, createdAt: now };
    this.industries.set(id, industry);
    return industry;
  }

  // Sub-industry methods
  async getAllSubIndustries(): Promise<SubIndustry[]> {
    return Array.from(this.subIndustries.values());
  }

  async getSubIndustriesByIndustry(industryId: number): Promise<SubIndustry[]> {
    return Array.from(this.subIndustries.values()).filter(
      (subIndustry) => subIndustry.industryId === industryId
    );
  }

  async getSubIndustry(id: number): Promise<SubIndustry | undefined> {
    return this.subIndustries.get(id);
  }

  async createSubIndustry(insertSubIndustry: InsertSubIndustry): Promise<SubIndustry> {
    const id = this.subIndustryCurrentId++;
    const now = new Date();
    const subIndustry: SubIndustry = { ...insertSubIndustry, id, createdAt: now };
    this.subIndustries.set(id, subIndustry);
    return subIndustry;
  }

  // Hemp product methods
  async getAllHempProducts(): Promise<HempProduct[]> {
    return Array.from(this.hempProducts.values());
  }

  async getHempProduct(id: number): Promise<HempProduct | undefined> {
    return this.hempProducts.get(id);
  }

  async getHempProductsByPart(plantPartId: number): Promise<HempProduct[]> {
    return Array.from(this.hempProducts.values()).filter(
      (product) => product.plantPartId === plantPartId
    );
  }

  async getHempProductsByIndustry(industryId: number): Promise<HempProduct[]> {
    return Array.from(this.hempProducts.values()).filter(
      (product) => product.industryId === industryId
    );
  }

  async getHempProductsBySubIndustry(subIndustryId: number): Promise<HempProduct[]> {
    return Array.from(this.hempProducts.values()).filter(
      (product) => product.subIndustryId === subIndustryId
    );
  }

  async getHempProductsByPartAndIndustry(plantPartId: number, industryId: number): Promise<HempProduct[]> {
    return Array.from(this.hempProducts.values()).filter(
      (product) => product.plantPartId === plantPartId && product.industryId === industryId
    );
  }

  async createHempProduct(insertHempProduct: InsertHempProduct): Promise<HempProduct> {
    const id = this.hempProductCurrentId++;
    const now = new Date();
    const hempProduct: HempProduct = { ...insertHempProduct, id, createdAt: now };
    this.hempProducts.set(id, hempProduct);
    return hempProduct;
  }

  async searchHempProducts(query: string): Promise<HempProduct[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.hempProducts.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getPaginatedHempProducts(
    page: number = 1, 
    limit: number = 5, 
    plantPartId?: number, 
    industryId?: number
  ): Promise<{products: HempProduct[], total: number}> {
    let allProducts = Array.from(this.hempProducts.values());
    
    if (plantPartId) {
      allProducts = allProducts.filter(product => product.plantPartId === plantPartId);
    }
    
    if (industryId) {
      allProducts = allProducts.filter(product => product.industryId === industryId);
    }
    
    const total = allProducts.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const products = allProducts.slice(start, end);
    
    return { products, total };
  }

  async countTotalHempProducts(): Promise<number> {
    return this.hempProducts.size;
  }
}

// Use DatabaseStorage for production
import { DatabaseStorage } from "./storage-db";

// Use DatabaseStorage for production
export const storage = new DatabaseStorage();
