'use client'

import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useState } from 'react'

import { Loader } from '@/components/Loader'
import { MeetingRoom } from '@/components/MeetingRoom'
import { MeetingSetup } from '@/components/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'

interface MeetingProps {
  params: {
    id: string
  }
}

export default function Meeting({ params: { id } }: MeetingProps) {
  const { user, isLoaded } = useUser()
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallById(id)

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}
