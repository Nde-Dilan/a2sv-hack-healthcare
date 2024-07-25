import React from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const Record = () => {
    return (
        <Card className="w-full max-w-xl mx-auto flex flex-col cursor-pointer">
        <CardHeader className="flex-none w-full ">
          <img
            src="/assets/placeholder.png"
            alt="Record"
            className="w-full h-auto object-cover"
          />
        </CardHeader>
        <CardContent className="flex-grow w-full p-4">
          <div className="">Saint-Doctor</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">2024-07-01</div>
        </CardContent>
      </Card>
    )
  }
  
export default Record;
