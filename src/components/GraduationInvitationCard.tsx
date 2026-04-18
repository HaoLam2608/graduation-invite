import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import InvitationBackContent from './InvitationBackContent'
import InvitationFrontCover from './InvitationFrontCover'
import type { InvitationDetails, RsvpFormData, RsvpOutcome, SubmitState } from './invitationTypes'

type GraduationInvitationCardProps = {
    details?: Partial<InvitationDetails>
    embedded?: boolean
    showToggleButton?: boolean
}

const PROFILE_IMAGE_SRC = '/images/lam-nguyen-anh-hao.jpg'

const defaultDetails: InvitationDetails = {
    recipientName: 'Quý vị khách quý',
    hostName: 'Lâm Nguyễn Anh Hào',
    degree: 'Cử nhân Công nghệ Thông tin',
    dateText: 'Ngày 23 tháng 4',
    timeText: '12:30 - 14:30',
    venue: 'Trường Đại học Công Thương TP. HCM',
    note: 'Sự hiện diện của anh/chị/em là niềm vinh hạnh và là niềm vui lớn đối với tôi.',
}

const contentVariants: Variants = {
    closed: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
    open: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.13,
        },
    },
}

const lineVariants: Variants = {
    closed: {
        opacity: 0,
        y: 14,
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.2, 0.65, 0.3, 0.95],
        },
    },
}

const initialFormData: RsvpFormData = {
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    attendance: 'Tham gia',
    guestCount: '1',
    message: '',
}

function GraduationInvitationCard({
    details,
    embedded = false,
    showToggleButton = true,
}: GraduationInvitationCardProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<RsvpFormData>(initialFormData)
    const [submitState, setSubmitState] = useState<SubmitState>('idle')
    const [submitMessage, setSubmitMessage] = useState('')
    const [rsvpOutcome, setRsvpOutcome] = useState<RsvpOutcome>(null)

    const invitation = useMemo(
        () => ({
            ...defaultDetails,
            ...details,
        }),
        [details],
    )

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmitRsvp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitState('loading')
        setSubmitMessage('Đang gửi xác nhận...')

        try {
            const payload = new FormData()
            payload.append('Họ và tên', formData.guestName)
            payload.append('Email', formData.guestEmail)
            payload.append('Số điện thoại', formData.guestPhone)
            payload.append('Trạng thái tham gia', formData.attendance)
            payload.append('Số lượng khách', formData.guestCount)
            payload.append('Lời nhắn', formData.message || '(Không có)')
            payload.append('Sự kiện', 'Lễ Tốt Nghiệp - Lâm Nguyễn Anh Hào')
            payload.append('Thời gian sự kiện', `${invitation.dateText} - ${invitation.timeText}`)
            payload.append('Địa điểm sự kiện', invitation.venue)
            payload.append('_subject', `RSVP mới cho lễ tốt nghiệp - ${formData.guestName}`)
            payload.append('_replyto', formData.guestEmail)
            payload.append('_captcha', 'false')
            payload.append('_template', 'table')

            const response = await fetch('https://formsubmit.co/ajax/haolam2684@gmail.com', {
                method: 'POST',
                body: payload,
                headers: {
                    Accept: 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Gửi thất bại')
            }

            const guestDisplayName = formData.guestName.trim() || 'anh/chị/em'
            const outcome: RsvpOutcome = formData.attendance === 'Tham gia' ? 'attending' : 'declined'
            const successMessage = formData.attendance === 'Tham gia'
                ? `${guestDisplayName} ơi, cảm ơn anh/chị/em đã xác nhận tham dự. Sự hiện diện của anh/chị/em là món quà tuyệt vời nhất trong ngày vui của mình. Hẹn gặp anh/chị/em sớm nhé!`
                : `${guestDisplayName} ơi, mình hoàn toàn hiểu lịch trình bận rộn của anh/chị/em và cảm ơn anh/chị/em đã báo trước. Chúc anh/chị/em luôn vui vẻ, hy vọng chúng ta sẽ sớm có dịp hội ngộ!`

            setSubmitState('success')
            setSubmitMessage(successMessage)
            setRsvpOutcome(outcome)
            setFormData(initialFormData)
        } catch {
            setSubmitState('error')
            setSubmitMessage('Không thể gửi xác nhận lúc này. Vui lòng thử lại sau vài phút.')
        }
    }

    const handleCloseResultPopup = () => {
        setSubmitState('idle')
        setSubmitMessage('')
        setRsvpOutcome(null)
        setIsOpen(false)
        setFormData(initialFormData)
    }

    return (
        <div className={embedded ? 'relative z-10 w-full px-1 py-2 sm:px-2' : 'relative z-10 w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-16'}>
            <motion.div
                initial={embedded ? false : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={embedded ? { duration: 0.35 } : { duration: 0.95, ease: [0.2, 0.8, 0.2, 1] }}
                className={`${embedded ? 'mx-auto w-full max-w-4xl' : 'navy-glow mx-auto w-full max-w-4xl'}`}
            >
                <motion.article
                    onClick={() => {
                        if (!isOpen) {
                            setIsOpen(true)
                        }
                    }}
                    className="relative overflow-hidden rounded-[2rem] border border-[#759fd8]/75 bg-[#e6f0ff]/90 text-[#10284f] shadow-[0_30px_65px_rgba(11,39,84,0.45)] transition duration-500 hover:-translate-y-0.5"
                    aria-label="Thiệp mời lễ tốt nghiệp"
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(112,156,226,0.32),transparent_56%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,transparent_0%,rgba(43,92,170,0.2)_47%,transparent_100%)]" />

                    <div className="relative p-5 sm:p-6 lg:p-7">
                        <div className="mb-5 flex items-center justify-between border-b border-[#99b8e0] pb-5">
                            <span className="font-['Inter'] text-xs uppercase tracking-[0.35em] text-[#355f97]">
                                Lễ Tốt Nghiệp 2026
                            </span>
                            <span className="font-['Inter'] text-[0.7rem] uppercase tracking-[0.3em] text-[#4d73a8]">
                                Thư mời chính thức
                            </span>
                        </div>

                        <InvitationBackContent
                            isOpen={isOpen}
                            invitation={invitation}
                            portraitSrc={PROFILE_IMAGE_SRC}
                            formData={formData}
                            submitState={submitState}
                            submitMessage={submitMessage}
                            rsvpOutcome={rsvpOutcome}
                            onCloseResultPopup={handleCloseResultPopup}
                            contentVariants={contentVariants}
                            lineVariants={lineVariants}
                            onInputChange={handleInputChange}
                            onSubmitRsvp={handleSubmitRsvp}
                        />
                    </div>

                    <InvitationFrontCover
                        isOpen={isOpen}
                        invitation={invitation}
                        portraitSrc={PROFILE_IMAGE_SRC}
                        onContinue={() => setIsOpen(true)}
                    />
                </motion.article>

                {showToggleButton && (
                    <div className="relative z-30 -mt-4 flex items-center justify-center sm:-mt-5">
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="group inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-[#8ab0e3] bg-[#123b77] px-8 py-4 font-['Inter'] text-sm uppercase tracking-[0.28em] text-[#eef5ff] shadow-[0_14px_32px_rgba(11,42,89,0.5)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1b4f93] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8cb2e4]"
                            aria-expanded={isOpen}
                            aria-label={isOpen ? 'Đóng thiệp' : 'Mở thiệp'}
                        >
                            {isOpen ? 'Đóng thiệp' : 'Mở thiệp'}
                            <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">{isOpen ? '−' : '+'}</span>
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default GraduationInvitationCard
