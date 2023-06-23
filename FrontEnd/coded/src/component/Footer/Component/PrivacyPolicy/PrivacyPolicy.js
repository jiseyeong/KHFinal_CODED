import React from 'react';
import './PrivacyPolicy.scss';
import { PolicyContent } from './PolicyContent';
import { motion, useScroll, useSpring } from 'framer-motion';

const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
});

function PrivacyPolicy() {
  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <h1>
        <code>useScroll</code>
      </h1>
      <PolicyContent />
    </>
  );
}

export default PrivacyPolicy;
