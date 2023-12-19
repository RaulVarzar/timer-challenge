import { LayoutGroup, motion } from "framer-motion"

export default function Toggler({difficulty, onChangeDifficulty}) {
    return(
        <LayoutGroup type="crossfade">
        <motion.div layout role="tablist" className="w-1/2 mx-auto tabs tabs-boxed">
          <motion.a 
            layout 
            role="tab" 
            className={"tab " + (difficulty === "beginner" && " tab-active")} 
            onClick={() => onChangeDifficulty("beginner")}
          >
                Beginner
          </motion.a>

          <motion.a 
            layout 
            role="tab" 
            className={"tab " + (difficulty === "easy" && " tab-active")} 
            onClick={() => onChangeDifficulty("easy")}
          >
            Easy
          </motion.a>

          <motion.a layout role="tab" className={"tab " + (difficulty === "medium" && " tab-active")} onClick={() => onChangeDifficulty("medium")}>Medium</motion.a>

          <motion.a layout role="tab" className={"tab " + (difficulty === "hard" && " tab-active")} onClick={() => onChangeDifficulty("hard")}>Hard</motion.a>
        </motion.div>
        </LayoutGroup>
    )
}