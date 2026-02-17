
import React from 'react';
// @ts-ignore
import { motion as motionBase } from 'framer-motion';
import { Product } from '../types';

// Casting motion to any to fix environment-specific type errors
const motion = motionBase as any;

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'WOW Skin Science Apple Cider Vinegar Foaming Face Wash',
    mrp: '₹399',
    price: '₹299',
    savings: 'Save ₹100',
    description: 'Deep cleansing foaming face wash with apple cider vinegar for clear, radiant skin.',
    image: 'https://cdn.store.link/products/alhudacosme46545/979z9n-apple.jpeg?versionId=ZBitRV5U7CEj7uzuOk.qDQm0_3yDCfGN',
    url: 'https://alhudacosme46545.store.link/product/wow-skin-science-apple-cider-vinegar-foaming-face-wash-mrp-%E2%82%B9399-offer-%E2%82%B9299-you-save-%E2%82%B9100/'
  },
  {
    id: '2',
    name: 'PHY Vitamin C Skin Brightening Face Serum 30ml',
    mrp: '₹500',
    price: '₹375',
    savings: 'Save ₹125',
    description: 'Vitamin C enriched serum for brighter, more even-toned skin with enhanced radiance.',
    image: 'https://cdn.store.link/products/alhudacosme46545/v4id2w-phy%202.jpg?versionId=PGfE8ikn3rEFsJNMXaVcB7ftacphR1Wf',
    url: 'https://alhudacosme46545.store.link/product/phy-vitamin-c-skin-brightening-face-serum-30-ml-mrp-%E2%82%B9500-offer-price-%E2%82%B9375-you-save-%E2%82%B9125/'
  },
  {
    id: '3',
    name: 'Nykaa SkinRx Skin Renew 10% AHA Face Serum',
    mrp: '₹799',
    price: '₹559',
    savings: 'Save ₹240',
    description: '10% AHA formula for gentle exfoliation and skin renewal for a youthful glow.',
    image: 'https://cdn.store.link/products/alhudacosme46545/3ifiwm-nykaasr.jpeg?versionId=4KWc6BmG05D9l5AJ91CxKbh5Fh_UsNaI',
    url: 'https://alhudacosme46545.store.link/product/nykaa-skinrx-skin-renew-10-aha-face-serum-mrp-799-offer-559/'
  },
  {
    id: '4',
    name: 'mCaffeine Naked and Raw Cappuccino Coffee Face Mask',
    mrp: '₹575',
    price: '₹399',
    savings: 'Save ₹176',
    description: 'Coffee-infused face mask for deep cleansing and revitalizing tired skin.',
    image: 'https://cdn.store.link/products/alhudacosme46545/gxprhy-mccfm.jpeg?versionId=E30itN3MNRGXe6fbmOSAmuChzlTGlLEk',
    url: 'https://alhudacosme46545.store.link/product/mcaffeine-naked-and-raw-cappuccino-coffee-face-mask-mrp-575-offer-399-you-save-176/'
  },
  {
    id: '5',
    name: 'Plum Pro-Nex Bond Restore Shampoo',
    mrp: '₹650',
    price: '₹455',
    savings: 'Save ₹195',
    description: 'Bond restoration technology for stronger, healthier, and shinier hair.',
    image: 'https://cdn.store.link/products/alhudacosme46545/bijjbt-plum%20shampoo.jpg?versionId=TLj_pywAf.A9DtzUOfnr7zTcIY4WFdeZ',
    url: 'https://alhudacosme46545.store.link/product/plum-pro-nex-bond-restore-shampoo-mrp-650-offer-455-you-save-195/'
  },
  {
    id: '6',
    name: 'WOW Skin Science Amla Hair Oil',
    mrp: '₹499',
    price: '₹349',
    savings: 'Save ₹150',
    description: 'Natural amla-infused hair oil for nourishment, strength, and healthy hair growth.',
    image: 'https://cdn.store.link/products/alhudacosme46545/l6n3hj-whatsapp%20image%202025-11-27%20at%208.19.07%20am.jpeg?versionId=3FBRy3MiqtruQchMmvJYcgR5Mxb3HS..',
    url: 'https://alhudacosme46545.store.link/product/wow-skin-science-amla-hair-oil-mrp-499-offer-349-you-save-150/'
  }
];

export const Offers: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PRODUCTS.map((product, idx) => (
        <ProductCard key={product.id} product={product} index={idx} />
      ))}
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="glass-morphism rounded-2xl overflow-hidden group border-none shadow-xl"
  >
    <div className="relative h-64 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
      {product.savings && (
        <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full text-sm">
          {product.savings}
        </div>
      )}
    </div>

    <div className="p-6">
      <h3 className="text-xl font-cinzel text-white group-hover:text-amber-400 transition-colors mb-3 min-h-[3.5rem]">
        {product.name}
      </h3>

      <div className="flex items-center gap-3 mb-3">
        {product.mrp && (
          <span className="text-slate-500 line-through text-sm">{product.mrp}</span>
        )}
        <span className="text-amber-400 font-bold text-2xl">{product.price}</span>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 h-12 overflow-hidden text-ellipsis">
        {product.description}
      </p>

      <motion.a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="block w-full py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl font-semibold hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 text-center"
      >
        Shop Now
      </motion.a>
    </div>
  </motion.div>
);
