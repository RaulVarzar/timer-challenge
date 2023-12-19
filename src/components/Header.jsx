import { motion } from "framer-motion"

export default function Header() {
    return(
        <motion.header
            initial={{y:"-100%", opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{ delay:0.3, duration:0.5}}
            className='p-3 mx-auto text-center md:p-8 h-fit'
        >
          <h1 className='text-2xl font-bold sm:text-4xl lg:text-6xl text-neutral-content'>THE FINAL COUNTDOWN</h1>
          <p className='text-sm font-light tracking-tighter lg:text-xl text-stone-400 opacity-70'>Stop the timer once you estimate that time is (almost) up</p>
        </motion.header>
    )
}