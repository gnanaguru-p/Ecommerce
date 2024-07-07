import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures animation triggers only once
    threshold: 0.5, // Defines when to trigger the animation (50% visibility)
  });

  return (
    <motion.footer
      className="py-1 bg-dark"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-center text-white mt-1">
        Gnanaguru Ecommerce Website - 2023-2024, All Rights Reserved
      </p>
    </motion.footer>
  );
}
