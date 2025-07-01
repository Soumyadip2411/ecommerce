// src/pages/Home.jsx
import React from 'react';
import bannerMobile from '../assets/banner-mobile.jpg';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import { motion } from 'framer-motion';

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub =>
      sub.category.some(c => c._id === id)
    );
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
    navigate(url);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const bannerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <>
      {/* Remaining homepage content */}
      <motion.section
        className="relative z-10 bg-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      >
        {/* Mobile banner */}
        <div className="container mx-auto lg:hidden">
          <motion.div
            className={`w-full h-full min-h-48 bg-gradient-to-r from-primary-100/10 to-accent-200/10 rounded-lg overflow-hidden ${
              !bannerMobile && 'animate-pulse my-2'
            }`}
            variants={bannerVariants}
          >
            <img src={bannerMobile} className="w-full h-full" alt="banner" />
          </motion.div>
        </div>

        {/* Categories */}
        <motion.div
          className="container mx-auto px-4 my-6 lg:mt-12 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3"
          variants={containerVariants}
        >
          {loadingCategory ? (
            new Array(12).fill(null).map((_, index) => (
              <motion.div
                key={index + 'loadingcategory'}
                className="bg-white rounded-lg p-4 min-h-36 grid gap-2 shadow animate-pulse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-primary-100/20 min-h-24 rounded"></div>
                <div className="bg-primary-100/20 h-8 rounded"></div>
              </motion.div>
            ))
          ) : (
            categoryData.map((cat, index) => (
              <motion.div
                key={cat._id + 'displayCategory'}
                className="w-full h-full cursor-pointer"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                variants={categoryVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow"
                  variants={cardVariants}
                >
                  <img
                    src={cat.image}
                    className="w-full h-full object-scale-down"
                    alt={cat.name}
                  />
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Category-wise product sections */}
        {categoryData?.map((c, index) => (
          <motion.div
            key={c._id + 'CategorywiseProduct'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <CategoryWiseProductDisplay id={c._id} name={c.name} />
          </motion.div>
        ))}
      </motion.section>
    </>
  );
};

export default Home;
