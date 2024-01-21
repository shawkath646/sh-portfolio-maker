"use client"
import { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedComponent = ({ children, ...props }) => {
    const controls = useAnimationControls();
    const [ref, inView] = useInView({
        threshold: 0.2,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedComponent;
