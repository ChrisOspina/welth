import React from 'react'
import DashboardPage from "./page";

const layout = () => {
  return (
     <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold tracking-tight gradient-title">
          Dashboard
        </h1>
      </div>
        <DashboardPage />
   </div>
  )
}

export default layout