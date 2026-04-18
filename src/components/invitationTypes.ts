export type InvitationDetails = {
    recipientName: string
    hostName: string
    degree: string
    dateText: string
    timeText: string
    venue: string
    note: string
}

export type RsvpFormData = {
    guestName: string
    guestEmail: string
    guestPhone: string
    attendance: string
    guestCount: string
    message: string
}

export type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export type RsvpOutcome = 'attending' | 'declined' | null
