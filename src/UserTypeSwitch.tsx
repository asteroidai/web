import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useContext } from "react"
import { UserContext } from "@/contexts/UserContext"

export const UserTypeSwitch: React.FC = React.memo(() => {
  const { userType, setUserType } = useContext(UserContext)

  const [isProductOwner, setIsProductOwner] = useState(userType === 'business')

  const toggleSwitch = () => {
    setIsProductOwner(!isProductOwner)
    setUserType(!isProductOwner ? 'business' : 'developer')
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  return (
    <motion.div
      className="w-72 h-12 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full p-1 cursor-pointer shadow-lg"
      onClick={toggleSwitch}
      animate={{
        background: isProductOwner
          ? "linear-gradient(to right, #E2E8F0, #F8FAFC)"
          : "linear-gradient(to right, #8B5CF6, #A78BFA)",
      }}
    >
      <motion.div
        className="w-full h-full bg-[#0A0A1F] rounded-full shadow-md relative flex items-center"
        animate={{
          x: isProductOwner ? "calc(100% - 100%)" : "0%",
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <span
            className={`text-sm font-medium transition-colors select-none ${!isProductOwner ? "text-purple-600" : "text-gray-600"}`}
          >
            I'm a developer
          </span>
          <span
            className={`text-sm font-medium transition-colors select-none ${isProductOwner ? "text-white" : "text-gray-500"}`}
          >
            I'm a product owner
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
})

