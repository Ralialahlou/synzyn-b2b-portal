export type ProductCategory =
  | 'skincare'
  | 'makeup'
  | 'body-care'
  | 'hair-care'
  | 'nails'
  | 'sun-care'
  | 'kids';

export type PackFormat = 'unit' | 'box' | 'carton';

export interface ProductPrice {
  unit: number;
  box: number;
  carton: number;
  boxUnits: number;
  cartonUnits: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  description: string;
  benefits: string[];
  indications: string[];
  activeIngredients: { name: string; concentration?: string; benefit: string }[];
  usageProtocol: string;
  clinicalPositioning: string;
  skinTypes: string[];
  imageUrl: string;
  imageColor: string;
  dlc: string;
  certifications: string[];
  inStock: boolean;
  restockDate?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPro?: boolean;
}

export interface ContractProduct {
  productId: string;
  price: ProductPrice;
  moq: number;
  moqUnit: PackFormat;
  deliveryLeadTime: string;
  documents: { name: string; type: 'product-sheet' | 'protocol' | 'training'; url: string }[];
}

export type ClientType = 'pharmacy' | 'retail' | 'spa' | 'clinic' | 'distributor';

export type PaymentMethod = 'bank-transfer' | 'card' | 'cod-check' | 'cod-cash' | 'credit-terms';

export interface ContractPaymentTerms {
  allowedMethods: PaymentMethod[];
  paymentDays?: number;
  creditLimit?: number;
  minOrderValue: number;
}

export interface Client {
  id: string;
  clientCode: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  type: ClientType;
  ice: string;
  rc: string;
  address: string;
  city: string;
  deliveryAddresses: DeliveryAddress[];
  assignedRep: SalesRep;
  contractProducts: ContractProduct[];
  paymentTerms: ContractPaymentTerms;
  joinedDate: string;
}

export interface DeliveryAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  isDefault: boolean;
}

export interface SalesRep {
  name: string;
  role: string;
  email: string;
  whatsapp: string;
  phone: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'partial' | 'overdue';

export interface OrderItem {
  productId: string;
  productName: string;
  packFormat: PackFormat;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  clientId: string;
  items: OrderItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  orderDate: string;
  deliveryDate?: string;
  estimatedDelivery?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: DeliveryAddress;
  notes?: string;
  invoiceId?: string;
  trackingNumber?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  clientId: string;
  amount: number;
  vatAmount: number;
  total: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface CartItem {
  product: Product;
  contractProduct: ContractProduct;
  packFormat: PackFormat;
  quantity: number;
}
