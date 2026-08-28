export interface VideoItem {
  id: string;
  title: string;
  titleAm: string;
  category: string;
  categoryAm: string;
  location: string;
  thumbnail: string;
  duration: string;
  videoSrc: string;
  fbVideoUrl: string;
  description: string;
  descriptionAm: string;
}

export const videoList: VideoItem[] = [
  {
    id: 'vid-site-01',
    title: 'Project Site 1 - Villa False Ceiling & Ambient Light Walkthrough',
    titleAm: 'ፕሮጀክት ሳይት 1 - የቪላ ጂፕሰም ጣሪያ እና መብራቶች ቪዲዮ',
    category: 'Residential Villa',
    categoryAm: 'የመኖሪያ ቪላ',
    location: 'Addis Ababa Site 1',
    thumbnail: '/images/projects/site-01/photo-01.jpg',
    duration: 'Reel / 0:58',
    videoSrc: '/videos/site-video-01.mp4',
    fbVideoUrl: 'https://web.facebook.com/zenerfinishing',
    description: 'On-site walkthrough of multi-tier gypsum false ceilings, concealed 3000K warm LED channels, and solid wood door fittings.',
    descriptionAm: 'የተሟላ የጂፕሰም ጣሪያ፣ የኤሌክትሪክ መብራቶችና ዘመናዊ በሮች አሰራር ከስራ ቦታ።'
  },
  {
    id: 'vid-site-02',
    title: 'Project Site 2 - Contemporary Villa Living & TV Slat Wall',
    titleAm: 'ፕሮጀክት ሳይት 2 - የሳሎን ቲቪ ግድግዳ እና የጣሪያ ስራ',
    category: 'Living & Media Wall',
    categoryAm: 'የሳሎን ቲቪ ግድግዳ',
    location: 'Addis Ababa Site 2',
    thumbnail: '/images/projects/site-02/photo-01.jpg',
    duration: 'Video / 1:15',
    videoSrc: '/videos/site-video-02.mp4',
    fbVideoUrl: 'https://web.facebook.com/zenerfinishing',
    description: 'Living room acoustic timber slat wall installation with floating media console and polished large-format porcelain floors.',
    descriptionAm: 'የሳሎን ቲቪ ግድግዳ የእንጨት ስራ ከተንሳፋፊ ካቢኔት እና የሚያብረቀርቁ ወለሎች ጋር።'
  },
  {
    id: 'vid-site-03',
    title: 'Project Site 3 - Luxury Duplex Floating Stairs & Glass Railing',
    titleAm: 'ፕሮጀክት ሳይት 3 - የቅንጦት ዱፕሌክስ ተንሳፋፊ ደረጃ እና መስታወት',
    category: 'Duplex Villa',
    categoryAm: 'ባለ ሁለት ፎቅ ቪላ',
    location: 'Bole Bulbula Site 3',
    thumbnail: '/images/projects/site-03/photo-01.jpg',
    duration: 'Reel / 1:12',
    videoSrc: '/videos/site-video-03.mp4',
    fbVideoUrl: 'https://web.facebook.com/zenerfinishing',
    description: 'Cantilevered solid wood floating steps with 12mm frameless tempered glass balustrades and custom kitchen island.',
    descriptionAm: 'ተንሳፋፊ የእንጨት ደረጃዎች፣ የጸና የመስታወት መከላከያ እና ዘመናዊ የወጥ ቤት ካቢኔት።'
  },
  {
    id: 'vid-site-06',
    title: 'Project Site 6 - Grand Multi-Level Villa Facade & Magnetic Lights',
    titleAm: 'ፕሮጀክት ሳይት 6 - ባለብዙ ፎቅ ቪላ እና መግነጢሳዊ መብራቶች',
    category: 'Grand Residence',
    categoryAm: 'ታላቅ የመኖሪያ ቪላ',
    location: 'Lebu Site 6',
    thumbnail: '/images/projects/site-06/photo-01.jpg',
    duration: 'Video / 1:30',
    videoSrc: '/videos/site-video-04.mp4',
    fbVideoUrl: 'https://web.facebook.com/zenerfinishing',
    description: 'Facade stone cladding walkthrough, magnetic track lighting rail integration, and living room millwork.',
    descriptionAm: 'የውጪ ግድግዳ ፊኒሺንግ፣ ዘመናዊ መግነጢሳዊ የትራክ መብራቶች እና የሳሎን ካቢኔቶች።'
  },
  {
    id: 'vid-site-08',
    title: 'Project Site 8 - Flagship Villa Complex Turnkey Handover',
    titleAm: 'ፕሮጀክት ሳይት 8 - ዋና የቅንጦት ቪላ ኮምፕሌክስ የተሟላ ርክክብ',
    category: 'Flagship Villa',
    categoryAm: 'ዋና የቅንጦት ቪላ',
    location: 'Addis Ababa Site 8',
    thumbnail: '/images/projects/site-08/photo-01.jpg',
    duration: 'Video / 2:10',
    videoSrc: '/videos/site-video-05.mp4',
    fbVideoUrl: 'https://web.facebook.com/zenerfinishing',
    description: 'Flagship multi-unit turnkey handover showcasing bespoke kitchens, timber pergolas, and coffered ceilings.',
    descriptionAm: 'የተሟላ የቪላ ፊኒሺንግ ርክክብ፤ ዘመናዊ ኩሽና፣ የቴራስ ፐርጎላ እና የጣሪያ ጌጦች።'
  },
  {
    id: 'vid-ebc-atrium',
    title: 'Ethiopian Broadcasting Corporation (EBC) - Grand Lobby & Columns',
    titleAm: 'የኢትዮጵያ ብሮድካስቲንግ ኮርፖሬሽን (ኢቢሲ) - ሎቢ እና አትሪየም',
    category: 'Institutional / Commercial',
    categoryAm: 'መንግስታዊ / የንግድ ህንፃ',
    location: 'EBC Headquarters, Addis Ababa',
    thumbnail: '/images/projects/ebc/photo-01.jpg',
    duration: 'Reel / 1:45',
    videoSrc: '/videos/site-video-06.mp4',
    fbVideoUrl: 'https://web.facebook.com/zenerfinishing',
    description: 'Grand lobby atrium with circular column wood cladding, corporate reception counters, and acoustic linear baffles.',
    descriptionAm: 'የኢቢሲ ዋና ሎቢ፤ በእንጨት የተዋቡ አምዶች፣ የኮርፖሬት ሪሴፕሽን እና የጣሪያ አኮስቲክ ባፍሎች።'
  }
];
