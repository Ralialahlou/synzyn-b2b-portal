import type { Client } from '../types';

export const clients: Client[] = [
  {
    id: 'c001',
    clientCode: 'MAR-2024-001',
    companyName: 'Marjane Holding',
    contactName: 'Karim Bennani',
    email: 'k.bennani@marjane.ma',
    phone: '+212 522 000 001',
    whatsapp: '+212 661 000 001',
    type: 'retail',
    ice: '001234567000058',
    rc: '45123 Casablanca',
    address: 'Route de Rabat, Km 12, Ain Sebaa',
    city: 'Casablanca',
    deliveryAddresses: [
      {
        id: 'da001',
        label: 'Marjane Ain Sebaa',
        street: 'Route de Rabat, Km 12',
        city: 'Casablanca',
        isDefault: true,
      },
      {
        id: 'da002',
        label: 'Marjane Hay Riad',
        street: 'Avenue An-Nasr, Hay Riad',
        city: 'Rabat',
        isDefault: false,
      },
    ],
    assignedRep: {
      name: 'Sofia Alaoui',
      role: 'Commercial Manager',
      email: 's.alaoui@synzyn.ma',
      whatsapp: '+212 661 100 200',
      phone: '+212 522 100 200',
    },
    contractProducts: [
      {
        productId: 'p001',
        price: { unit: 85, box: 480, carton: 900, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '5-7 business days',
        documents: [
          { name: 'Hydra Boost Serum - Product Sheet', type: 'product-sheet', url: '#' },
          { name: 'Protocol Guide - Hydration Range', type: 'protocol', url: '#' },
        ],
      },
      {
        productId: 'p002',
        price: { unit: 75, box: 420, carton: 780, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '5-7 business days',
        documents: [
          { name: 'Radiance Moisturizer - Product Sheet', type: 'product-sheet', url: '#' },
        ],
      },
      {
        productId: 'p005',
        price: { unit: 95, box: 540, carton: 1020, boxUnits: 6, cartonUnits: 12 },
        moq: 12,
        moqUnit: 'unit',
        deliveryLeadTime: '5-7 business days',
        documents: [
          { name: 'Matte Foundation - Product Sheet', type: 'product-sheet', url: '#' },
          { name: 'Foundation Shade Guide', type: 'training', url: '#' },
        ],
      },
      {
        productId: 'p007',
        price: { unit: 55, box: 300, carton: 560, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '5-7 business days',
        documents: [
          { name: 'Velvet Lip Color - Product Sheet', type: 'product-sheet', url: '#' },
        ],
      },
      {
        productId: 'p009',
        price: { unit: 45, box: 252, carton: 480, boxUnits: 6, cartonUnits: 12 },
        moq: 12,
        moqUnit: 'unit',
        deliveryLeadTime: '3-5 business days',
        documents: [
          { name: 'Body Lotion - Product Sheet', type: 'product-sheet', url: '#' },
        ],
      },
      {
        productId: 'p011',
        price: { unit: 68, box: 384, carton: 720, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '3-5 business days',
        documents: [
          { name: 'Repair Shampoo - Product Sheet', type: 'product-sheet', url: '#' },
        ],
      },
    ],
    paymentTerms: {
      allowedMethods: ['bank-transfer', 'card', 'credit-terms'],
      paymentDays: 60,
      creditLimit: 200000,
      minOrderValue: 20000,
    },
    joinedDate: '2024-03-15',
  },
  {
    id: 'c002',
    clientCode: 'CAR-2024-002',
    companyName: 'Carrefour Maroc',
    contactName: 'Nadia El Fassi',
    email: 'n.elfassi@carrefour.ma',
    phone: '+212 522 000 002',
    type: 'retail',
    ice: '002345678000059',
    rc: '67890 Casablanca',
    address: 'Morocco Mall, Boulevard de la Corniche',
    city: 'Casablanca',
    deliveryAddresses: [
      {
        id: 'da003',
        label: 'Morocco Mall',
        street: 'Boulevard de la Corniche',
        city: 'Casablanca',
        isDefault: true,
      },
    ],
    assignedRep: {
      name: 'Sofia Alaoui',
      role: 'Commercial Manager',
      email: 's.alaoui@synzyn.ma',
      whatsapp: '+212 661 100 200',
      phone: '+212 522 100 200',
    },
    contractProducts: [
      {
        productId: 'p003',
        price: { unit: 55, box: 312, carton: 588, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '5-7 business days',
        documents: [{ name: 'Gentle Foam Cleanser - Product Sheet', type: 'product-sheet', url: '#' }],
      },
      {
        productId: 'p009',
        price: { unit: 42, box: 240, carton: 456, boxUnits: 6, cartonUnits: 12 },
        moq: 12,
        moqUnit: 'unit',
        deliveryLeadTime: '3-5 business days',
        documents: [{ name: 'Body Lotion - Product Sheet', type: 'product-sheet', url: '#' }],
      },
      {
        productId: 'p010',
        price: { unit: 38, box: 216, carton: 408, boxUnits: 6, cartonUnits: 12 },
        moq: 12,
        moqUnit: 'unit',
        deliveryLeadTime: '3-5 business days',
        documents: [{ name: 'Shower Gel Cedar - Product Sheet', type: 'product-sheet', url: '#' }],
      },
      {
        productId: 'p011',
        price: { unit: 65, box: 372, carton: 696, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '3-5 business days',
        documents: [{ name: 'Repair Shampoo - Product Sheet', type: 'product-sheet', url: '#' }],
      },
    ],
    paymentTerms: {
      allowedMethods: ['bank-transfer', 'credit-terms'],
      paymentDays: 90,
      creditLimit: 300000,
      minOrderValue: 20000,
    },
    joinedDate: '2024-05-20',
  },
  {
    id: 'c003',
    clientCode: 'DEMO-2024-003',
    companyName: 'Pharma Plus Casablanca',
    contactName: 'Dr. Hassan Ouali',
    email: 'h.ouali@pharmaplus.ma',
    phone: '+212 522 000 003',
    whatsapp: '+212 661 000 003',
    type: 'pharmacy',
    ice: '003456789000060',
    rc: '12345 Casablanca',
    address: '45 Boulevard Mohammed V',
    city: 'Casablanca',
    deliveryAddresses: [
      {
        id: 'da004',
        label: 'Pharmacie principale',
        street: '45 Boulevard Mohammed V',
        city: 'Casablanca',
        isDefault: true,
      },
    ],
    assignedRep: {
      name: 'Youssef Benali',
      role: 'Key Account Manager',
      email: 'y.benali@synzyn.ma',
      whatsapp: '+212 661 100 300',
      phone: '+212 522 100 300',
    },
    contractProducts: [
      {
        productId: 'p001',
        price: { unit: 90, box: 510, carton: 960, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '5-7 business days',
        documents: [
          { name: 'Hydra Boost Serum - Fiche Produit', type: 'product-sheet', url: '#' },
          { name: 'Protocole Hydratation', type: 'protocol', url: '#' },
          { name: 'Formation Skincare Pro', type: 'training', url: '#' },
        ],
      },
      {
        productId: 'p002',
        price: { unit: 80, box: 456, carton: 852, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '5-7 business days',
        documents: [
          { name: 'Radiance Moisturizer SPF30 - Fiche Produit', type: 'product-sheet', url: '#' },
        ],
      },
      {
        productId: 'p003',
        price: { unit: 58, box: 330, carton: 624, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '5-7 business days',
        documents: [
          { name: 'Gentle Foam Cleanser - Fiche Produit', type: 'product-sheet', url: '#' },
        ],
      },
      {
        productId: 'p013',
        price: { unit: 320, box: 1800, carton: 3360, boxUnits: 6, cartonUnits: 12 },
        moq: 3,
        moqUnit: 'unit',
        deliveryLeadTime: '7-10 business days',
        documents: [
          { name: 'PRO Peel 30% - Fiche Produit', type: 'product-sheet', url: '#' },
          { name: 'Protocole Peeling Professionnel', type: 'protocol', url: '#' },
          { name: 'Formation Peeling PRO', type: 'training', url: '#' },
        ],
      },
      {
        productId: 'p014',
        price: { unit: 72, box: 408, carton: 768, boxUnits: 6, cartonUnits: 12 },
        moq: 6,
        moqUnit: 'unit',
        deliveryLeadTime: '5-7 business days',
        documents: [
          { name: 'SPF50+ Crème - Fiche Produit', type: 'product-sheet', url: '#' },
        ],
      },
    ],
    paymentTerms: {
      allowedMethods: ['bank-transfer', 'card', 'cod-check', 'cod-cash'],
      minOrderValue: 20000,
    },
    joinedDate: '2024-08-10',
  },
];

export const DEMO_CLIENT = clients[2];

export const getClientByCode = (code: string, password: string) => {
  const client = clients.find((c) => c.clientCode === code);
  if (client && password === 'demo123') return client;
  return null;
};
