// src/data/RespiratoryData.ts

//Local product images
import pic1 from "../assets/products/Amoxicillin.png";
import pic2 from "../assets/products/Azithromycin.png";
import pic3 from "../assets/products/Clarithromycin.png";
import pic4 from "../assets/products/Augmentin.png";
import pic5 from "../assets/products/Levofloxacin.png";
import pic6 from "../assets/products/Cefuroxime Axetil 500mg Tablets.png";
import pic7 from "../assets/products/Ceftriaxone.png";
import pic8 from "../assets/products/Erythromycin2.png";
import pic9 from "../assets/products/Ventolin.png";
import pic10 from "../assets/products/Symbicort-Inhaler.png";
import pic11 from "../assets/products/ambroxol.png";
import pic12 from "../assets/products/Bromhexine.png";
import pic13 from "../assets/products/Benylin-Dry-Cough.png";
import pic14 from "../assets/products/Cetirizine.png";
import pic15 from "../assets/products/Montelukast.png";


export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: string;
}

export const respiratoryProducts: Product[] = [
  { id: 1, name: "Amoxicillin 500mg Capsules (30’s)", image: pic1, price: 850, category: "Antibiotic", stock: "In Stock" },
  { id: 2, name: "Azithromycin 500mg Tablets (6’s)", image: pic2, price: 1240, category: "Antibiotic", stock: "In Stock" },
  { id: 3, name: "Clarithromycin 500mg Tablets (14’s)", image: pic3, price: 1680, category: "Antibiotic", stock: "In Stock" },
  { id: 4, name: "Augmentin 625mg Tabs (14’s)", image: pic4, price: 1950, category: "Antibiotic", stock: "In Stock" },
  { id: 5, name: "Levofloxacin 500mg Tablets (10’s)", image: pic5, price: 1820, category: "Antibiotic", stock: "In Stock" },
  { id: 6, name: "Cefuroxime Axetil 500mg Tablets (14’s)", image: pic6, price: 1720, category: "Antibiotic", stock: "In Stock" },
  { id: 7, name: "Ceftriaxone 1g Injection (Single Vial)", image: pic7, price: 640, category: "Injection", stock: "In Stock" },
  { id: 8, name: "Erythromycin 500mg Tablets (20’s)", image: pic8, price: 980, category: "Antibiotic", stock: "In Stock" },
  { id: 9, name: "Ventolin Inhaler (Salbutamol 100mcg)", image: pic9, price: 850, category: "Bronchodilator", stock: "In Stock" },
  { id: 10, name: "Symbicort Inhaler (Budesonide + Formoterol)", image: pic10, price: 2850, category: "Inhaler", stock: "In Stock" },
  { id: 11, name: "Ambroxol Syrup 100ml", image: pic11, price: 520, category: "Expectorant", stock: "In Stock" },
  { id: 12, name: "Bromhexine Syrup 100ml", image: pic12, price: 490, category: "Mucolytic", stock: "In Stock" },
  { id: 13, name: "Benylin Dry Cough Syrup 100ml", image: pic13, price: 720, category: "Cough Suppressant", stock: "In Stock" },
  { id: 14, name: "Cetirizine 10mg Tablets (30’s)", image: pic14, price: 650, category: "Antihistamine", stock: "In Stock" },
  { id: 15, name: "Montelukast 10mg Tablets (30’s)", image: pic15, price: 1180, category: "Respiratory Anti-inflammatory", stock: "In Stock" },
];
