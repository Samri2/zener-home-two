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

export const BENTO_COLLECTIONS: BentoCollectionItem[] = [
  {
    id: 'outdoor-lounge-chair',
    title: 'Outdoor Lounge Chair',
    subtitle: 'Bespoke Weather-Resistant Teak & Woven Cord',
    category: 'Outdoor Living',
    image: '/images/collections/outdoor-lounge-chair.png',
    badge: 'Trending Now',
    colSpanDesktop: 'col-span-12 lg:col-span-7',
    bgGradient: 'from-[#D6571D] via-[#CC4C0F] to-[#A83705]',
    textPosition: 'top-left',
    buttonText: 'Explore more »',
    priceNote: 'Custom Fabric & Finish Options',
    description: 'Sculptural curved timber framing paired with high-resilience outdoor memory cushions, engineered to resist seasonal weather while providing salon-grade comfort.'
  },
  {
    id: 'tall-botanical-accent',
    title: 'Architectural Planters & Flora Accents',
    subtitle: 'Ceramic & Solid Timber Living Room Accents',
    category: 'Home Finishing',
    image: '/images/collections/tall-plant.png',
    badge: 'Boutique Collection',
    colSpanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-5',
    bgGradient: 'from-[#E06B33] via-[#CC4C0F] to-[#9E3203]',
    textPosition: 'top-right',
    buttonText: 'Explore more »',
    priceNote: 'Indoor Botanical Styling',
    description: 'Handcrafted ceramic planters with architectural oak stands that ground your interior design in natural serenity and biophilic elegance.'
  },
  {
    id: 'modern-couches',
    title: 'Modern Couches & Salon Seating',
    subtitle: 'Artisan Curved Bouclé & Memory Foam Silhouettes',
    category: 'Living Room',
    image: '/images/collections/modern-couch.png',
    badge: 'Signature Masterpiece',
    colSpanDesktop: 'col-span-12 lg:col-span-12',
    bgGradient: 'from-[#DB5F25] via-[#CC4C0F] to-[#942D02]',
    textPosition: 'left-center',
    buttonText: 'Explore more »',
    priceNote: 'Available in 2-Seater, 3-Seater & Sectionals',
    description: 'Designed for effortless contemporary luxury, featuring reinforced kiln-dried hardwood frames, stain-resistant textured fabrics, and deep ergonomic seating.'
  },
  {
    id: 'modern-chair',
    title: 'Modern Chairs',
    subtitle: 'Minimalist Dining & Accent Seating',
    category: 'Dining & Accent',
    image: '/images/collections/modern-chair.png',
    badge: 'Popular',
    colSpanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
    bgGradient: 'from-[#D45318] via-[#CC4C0F] to-[#9C3404]',
    textPosition: 'bottom-left',
    buttonText: 'Explore more »',
    priceNote: 'Single / 6-Chair Set',
    description: 'Ergonomic sculptured backrests with tapered brass-accented legs, harmonizing aesthetic beauty with sturdy daily functional use.'
  },
  {
    id: 'bamboo-swing-chairs',
    title: 'Bamboo Swing Chairs',
    subtitle: 'Handwoven Natural Rattan Egg Hammocks',
    category: 'Balcony & Patio',
    image: '/images/collections/bamboo-swing.png',
    badge: 'Handcrafted',
    colSpanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
    bgGradient: 'from-[#DE652B] via-[#CC4C0F] to-[#A13706]',
    textPosition: 'bottom-left',
    buttonText: 'Explore more »',
    priceNote: 'Heavy-Duty Reinforced Suspension',
    description: 'Handcrafted organic rattan cocoon swing chairs equipped with plush weather-proof cushions for serene balcony retreats and bedroom reading nooks.'
  },
  {
    id: 'hanging-light',
    title: 'Hanging Light & Pendants',
    subtitle: 'Warm 3000K Architectural Ambient Fixtures',
    category: 'Lighting & Decor',
    image: '/images/collections/hanging-light.png',
    badge: 'Designer Pick',
    colSpanDesktop: 'col-span-12 sm:col-span-6 lg:col-span-4',
    bgGradient: 'from-[#E3723B] via-[#CC4C0F] to-[#963002]',
    textPosition: 'bottom-left',
    buttonText: 'Explore more »',
    priceNote: 'Integrated LED Dimmable Arrays',
    description: 'Artisanal blown glass and brushed bronze pendant lighting casting warm ambient illumination across dining islands and salon foyers.'
  }
];

