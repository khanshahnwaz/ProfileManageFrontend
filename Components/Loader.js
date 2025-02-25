'use client';

import { motion } from 'framer-motion';

const Loader = ({open,setOpen}) => {
    if(open){
    return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-blue-800 rounded-full"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'loop',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}else return null;
};

export default Loader;
