import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 3001;

let dataBase = [
    {
      id: 1,
      img: "house1.jpeg",
      price: 2200,
      bedrooms: 7,
      bathRooms: 4,
      propertyType: "house",
      wifi: true,
      ac: true,
      smoking: false,
      washer: true,
      hostLanguage: "english",
      name: "The Metropolitan Manor",
    },
    {
      id: 2,
      img: "house2.webp",
      price: 2700,
      bedrooms: 9,
      bathRooms: 6,
      propertyType: "house",
      wifi: true,
      ac: true,
      smoking: true,
      washer: true,
      hostLanguage: "english",
      name: "The Loft Life",
    },
    {
      id: 3,
      img: "house3.jpeg",
      price: 1800,
      bedrooms: 5,
      bathRooms: 3,
      propertyType: "house",
      wifi: false,
      ac: false,
      smoking: true,
      washer: true,
      hostLanguage: "english",
      name: "The Contemporary Chambers",
    },
    {
      id: 4,
      img: "apart1.jpeg",
      price: 1350,
      bedrooms: 2,
      bathRooms: 1,
      propertyType: "apartment",
      wifi: true,
      ac: false,
      smoking: false,
      washer: true,
      hostLanguage: "english",
      name: "The Cozy Apartment",
    },
    {
      id: 5,
      img: "house5.jpg",
      price: 1500,
      bedrooms: 3,
      bathRooms: 3,
      propertyType: "house",
      wifi: false,
      ac: false,
      smoking: true,
      washer: false,
      hostLanguage: "spanish",
      name: "The Industrial Residence",
    },
    {
      id: 6,
      img: "house6.jpg",
      price: 1500,
      bedrooms: 2,
      bathRooms: 1,
      propertyType: "house",
      wifi: false,
      ac: false,
      smoking: false,
      washer: false,
      hostLanguage: "spanish",
      name: "The Modern Loft",
    },
    {
      id: 7,
      img: "house7.jpg",
      price: 1400,
      bedrooms: 3,
      bathRooms: 3,
      propertyType: "house",
      wifi: true,
      ac: true,
      smoking: true,
      washer: true,
      hostLanguage: "spanish",
      name: "The Highrise Hideaway",
    },
    {
      id: 8,
      img: "house8.jpeg",
      price: 1900,
      bedrooms: 3,
      bathRooms: 4,
      propertyType: "house",
      wifi: true,
      ac: true,
      smoking: true,
      washer: true,
      hostLanguage: "spanish",
      name: "The Velvet Vista",
    },
    {
      id: 9,
      img: "house9.jpg",
      price: 1850,
      bedrooms: 4,
      bathRooms: 4,
      propertyType: "house",
      wifi: true,
      ac: true,
      smoking: true,
      washer: true,
      hostLanguage: "french",
      name: "The Iris Indigo",
    },
    {
      id: 10,
      img: "house10.jpeg",
      price: 2650,
      bedrooms: 8,
      bathRooms: 5,
      propertyType: "house",
      wifi: true,
      ac: true,
      smoking: false,
      washer: true,
      hostLanguage: "french",
      name: "The Celestial Citadel",
    },
    {
      id: 11,
      img: "apart1.jpeg",
      price: 1350,
      bedrooms: 3,
      bathRooms: 2,
      propertyType: "apartment",
      wifi: true,
      ac: true,
      smoking: true,
      washer: false,
      hostLanguage: "french",
      name: "The Amethyst Arbour",
    },
    {
      id: 12,
      img: "apart2.webp",
      price: 1550,
      bedrooms: 2,
      bathRooms: 2,
      propertyType: "apartment",
      wifi: true,
      ac: true,
      smoking: false,
      washer: false,
      hostLanguage: "french",
      name: "The Radiant Retreat",
    },
    {
      id: 13,
      img: "apart3.jpg",
      price: 2200,
      bedrooms: 7,
      bathRooms: 4,
      propertyType: "apartment",
      wifi: true,
      ac: true,
      smoking: false,
      washer: true,
      hostLanguage: "french",
      name: "The Majestic Mile",
    },
    {
      id: 14,
      img: "apart3.jpeg",
      price: 1250,
      bedrooms: 2,
      bathRooms: 2,
      propertyType: "apartment",
      wifi: true,
      ac: true,
      smoking: false,
      washer: false,
      hostLanguage: "french",
      name: "The Regal Residency",
    },
    {
      id: 15,
      img: "apart5.jpeg",
      price: 850,
      bedrooms: 1,
      bathRooms: 1,
      propertyType: "apartment",
      wifi: false,
      ac: false,
      smoking: true,
      washer: false,
      hostLanguage: "russian",
      name: "The Signature Suite",
    },
    {
      id: 16,
      img: "apart6.jpeg",
      price: 700,
      bedrooms: 1,
      bathRooms: 1,
      propertyType: "apartment",
      wifi: false,
      ac: false,
      smoking: false,
      washer: false,
      hostLanguage: "russian",
      name: "The Prestige Palace",
    },
    {
      id: 17,
      img: "apart7.jpeg",
      price: 900,
      bedrooms: 1,
      bathRooms: 1,
      propertyType: "apartment",
      wifi: true,
      ac: true,
      smoking: false,
      washer: false,
      hostLanguage: "russian",
      name: "The Stylish Studio",
    },
    {
      id: 18,
      img: "apart8.jpeg",
      price: 1350,
      bedrooms: 2,
      bathRooms: 2,
      propertyType: "apartment",
      wifi: false,
      ac: false,
      smoking: true,
      washer: false,
      hostLanguage: "russian",
      name: "The Urban Utopia",
    },
    {
      id: 19,
      img: "apart9.jpeg",
      price: 1400,
      bedrooms: 4,
      bathRooms: 2,
      propertyType: "apartment",
      wifi: true,
      ac: true,
      smoking: false,
      washer: false,
      hostLanguage: "english",
      name: "Modern Heights",
    },
    {
      id: 20,
      img: "apart10.jpeg",
      price: 2400,
      bedrooms: 3,
      bathRooms: 2,
      propertyType: "apartment",
      wifi: true,
      ac: true,
      smoking: true,
      washer: false,
      hostLanguage: "english",
      name: "Riverwalk Commons",
    },
  ];
  

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-app-name.vercel.app'] 
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/public', express.static('public'));
app.use('/api', express.static('public'));

console.log('Static file serving enabled for /api/public');

// Properties endpoint with filters
app.get('/api/properties', (req, res) => {
  try {
    console.log('Received query params:', req.query);
    
    let filteredProperties = [...dataBase];
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    // Apply filters
    if (req.query.minPrice) {
      const minPrice = parseInt(req.query.minPrice);
      if (!isNaN(minPrice)) {
        filteredProperties = filteredProperties.filter(
          prop => prop.price >= minPrice
        );
      }
    }
    
    if (req.query.maxPrice) {
      const maxPrice = parseInt(req.query.maxPrice);
      if (!isNaN(maxPrice)) {
        filteredProperties = filteredProperties.filter(
          prop => prop.price <= maxPrice
        );
      }
    }
    
    if (req.query.bedrooms) {
      const bedrooms = parseInt(req.query.bedrooms);
      if (!isNaN(bedrooms)) {
        if (bedrooms !== -1) {
          filteredProperties = filteredProperties.filter(
            prop => prop.bedrooms >= bedrooms
          );
        }
      }
    }
    
    if (req.query.propertyType && req.query.propertyType !== '') {
      filteredProperties = filteredProperties.filter(
        prop => prop.propertyType === req.query.propertyType
      );
    }

    // Apply amenities filters
    if (req.query.wifi === 'true') {
      filteredProperties = filteredProperties.filter(prop => prop.wifi === true);
    }
    
    if (req.query.ac === 'true') {
      filteredProperties = filteredProperties.filter(prop => prop.ac === true);
    }
    
    if (req.query.washer === 'true') {
      filteredProperties = filteredProperties.filter(prop => prop.washer === true);
    }

    console.log('Filtered properties:', filteredProperties);

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalItems = filteredProperties.length;
    const totalPages = Math.ceil(totalItems / limit);

    // Get paginated results
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    // Prepare response
    const response = {
      properties: paginatedProperties,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: endIndex < totalItems,
        hasPrevPage: startIndex > 0
      }
    };

    console.log('Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});