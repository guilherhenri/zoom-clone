'use client'

import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useGetCalls } from '@/hooks/useGetCalls'

import { Loader } from './Loader'
import { MeetingCard } from './MeetingCard'
import { useToast } from './ui/use-toast'

interface CallListProps {
  type: 'upcoming' | 'ended' | 'recordings'
}

export function CallList({ type }: CallListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { endedCalls, callsRecordings, upcomingCalls, isLoading } =
    useGetCalls()
  const [recordings, setRecordings] = useState<CallRecording[]>([])

  const getCalls = () => {
    switch (type) {
      case 'recordings':
        return recordings
      case 'upcoming':
        return upcomingCalls
      case 'ended':
        return endedCalls
      default:
        return []
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case 'recordings':
        return 'No Recordings'
      case 'upcoming':
        return 'No Upcoming Calls'
      case 'ended':
        return 'No Previous Calls'
      default:
        return ''
    }
  }

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callsRecordings.map((meeting) => meeting.queryRecordings()),
        )

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings)

        setRecordings(recordings)
      } catch (error) {
        toast({ title: 'Try again later' })
      }
    }

    if (type === 'recordings') {
      fetchRecordings()
    }
  }, [type, callsRecordings, toast])

  const calls = getCalls()
  const noCallsMessage = getNoCallsMessage()

  if (isLoading) return <Loader />

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
            }
            title={
              meeting.state?.custom?.description?.substring(0, 26) ||
              meeting.filename?.substring(0, 20) ||
              'Personal Meeting'
            }
            date={
              meeting.state?.startsAt?.toLocaleString() ??
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(meeting.url)
                : () => router.push(`/meeting/${meeting.id}`)
            }
            link={
              type === 'recordings'
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  )
}
