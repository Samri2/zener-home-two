export interface BentoCollectionItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  badge?: string;
  colSpanDesktop: string;
  rowSpanDesktop?: string;
  bgGradient: string;
  textPosition: 'top-left' | 'left-center' | 'bottom-left' | 'top-right';
  buttonText: string;
  priceNote?: string;
  description: string;
}

export const bentoCollections: BentoCollectionItem[] = [
  {
    id: 'outdoor-lounge-chair',
    title: 'Outdoor Lounge & Terrace Seating',
    subtitle: 'Bespoke Weather-Resistant Pergola & Balcony Furniture',
    category: 'Outdoor Living',
    image: '/images/projects/site-02/photo-04.jpg',
    badge: 'Trending Villa Feature',
    colSpanDesktop: 'col-span-12 lg:col-span-7',
    bgGradient: 'from-[#D6571D] via-[#CC4C0F] to-[#A83705]',
    textPosition: 'top-left',
    buttonText: 'Explore Collection »',
    priceNote: 'Custom Sizing for Villa Terraces & Patios',
    description: 'Handcrafted outdoor lounge sets, weather-proof teak framing, and high-resilience memory cushions engineered for Addis Ababa and regional climate resilience.'
  },
  {
    id: 'tall-botanical-accent',
    title: 'Architectural Planters & Salon Woodcraft',
    subtitle: 'Solid Timber Shelving & Biophilic Living Accents',
    category: 'Home Finishing',
    image: '/images/furniture/furniture-13.jpg',
    badge: 'Boutique Collection',
    colSpanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-5',
    bgGradient: 'from-[#E06B33] via-[#CC4C0F] to-[#9E3203]',
    textPosition: 'top-right',
    buttonText: 'Explore Collection »',
    priceNote: 'Indoor Botanical & Spatial Styling',
    description: 'Handcrafted vertical timber screens, decorative wall shelving, and architectural planters grounding your luxury interior in natural warmth.'
  },
  {
    id: 'modern-couches',
    title: 'Modern Couches & Curved Bouclé Sofas',
    subtitle: 'Artisan Curved Silhouettes & 45D High-Density Comfort',
    category: 'Living Room',
    image: '/images/furniture/furniture-05.jpg',
    badge: 'Signature Masterpiece',
    colSpanDesktop: 'col-span-12 lg:col-span-12',
    bgGradient: 'from-[#DB5F25] via-[#CC4C0F] to-[#942D02]',
    textPosition: 'left-center',
    buttonText: 'Explore Sofas »',
    priceNote: 'Available in 2-Seater, 3-Seater, Sectionals & Custom Colors',
    description: 'Designed for effortless contemporary luxury, featuring reinforced kiln-dried hardwood frames, stain-resistant textured fabrics, and deep ergonomic seating.'
  },
  {
    id: 'modern-chair',
    title: 'Solid Hardwood Dining Sets & Chairs',
    subtitle: 'Kiln-Dried Wanza Timber & Ergonomic Seating',
    category: 'Dining & Accent',
    image: '/images/furniture/furniture-01.jpg',
    badge: 'Bestseller',
    colSpanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
    bgGradient: 'from-[#D45318] via-[#CC4C0F] to-[#9C3404]',
    textPosition: 'bottom-left',
    buttonText: 'Explore Dining »',
    priceNote: 'Sets of 6, 8, 10 or Custom Lengths',
    description: 'Solid natural Wanza hardwood dining tables with hand-rubbed organic finishes, matching ergonomic dining chairs, and matching salon buffets.'
  },
  {
    id: 'bamboo-swing-chairs',
    title: 'Balcony Hammocks & Cocoon Swing Chairs',
    subtitle: 'Handwoven Natural Rattan Egg Pods with Steel Stand',
    category: 'Balcony & Patio',
    image: '/images/collections/bamboo-swing.png',
    badge: 'Handcrafted',
    colSpanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
    bgGradient: 'from-[#DE652B] via-[#CC4C0F] to-[#A13706]',
    textPosition: 'bottom-left',
    buttonText: 'Explore Swings »',
    priceNote: 'Heavy-Duty Reinforced Suspension',
    description: 'Handcrafted cocoon swing chairs with plush weather-proof cushions, perfect for relaxing villa balconies and master bedroom reading nooks.'
  },
  {
    id: 'hanging-light',
    title: 'Architectural False Ceilings & Lighting',
    subtitle: 'Warm 3000K Multi-Tiered Recessed Illumination',
    category: 'Lighting & Decor',
    image: '/images/projects/site-07/photo-03.jpg',
    badge: 'Designer Pick',
    colSpanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
    bgGradient: 'from-[#E3723B] via-[#CC4C0F] to-[#963002]',
    textPosition: 'bottom-left',
    buttonText: 'Explore Lighting »',
    priceNote: 'Integrated LED Dimmable Arrays & Chandeliers',
    description: 'Artisanal geometric false ceilings, indirect warm cove lighting, and luxury central chandeliers casting ambient warmth across living halls.'
  }
];
