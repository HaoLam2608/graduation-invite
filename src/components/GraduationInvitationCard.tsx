import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import InvitationBackContent from './InvitationBackContent'
import type { InvitationDetails, RsvpFormData, RsvpOutcome, SubmitState } from './invitationTypes'

type GraduationInvitationCardProps = {
    details?: Partial<InvitationDetails>
    embedded?: boolean
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
    message: '',
}

function GraduationInvitationCard({
    details,
    embedded = false,
}: GraduationInvitationCardProps) {
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
                    className="relative overflow-hidden rounded-[2rem] border border-[#78a4dc]/80 bg-[linear-gradient(158deg,#dceaff_0%,#d0e4ff_48%,#c2dbfb_100%)] text-[#10284f] shadow-[0_30px_65px_rgba(11,39,84,0.32)] transition duration-500 hover:-translate-y-0.5"
                    aria-label="Thiệp mời lễ tốt nghiệp"
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(112,156,226,0.34),transparent_56%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,transparent_0%,rgba(43,92,170,0.18)_47%,transparent_100%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(115,160,227,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(115,160,227,0.22)_1px,transparent_1px)] [background-size:34px_34px]" />
                    <div className="tech-circuit-map opacity-20" />
                    <div className="tech-scanline opacity-60" />

                    <div className="relative p-5 sm:p-6 lg:p-7">
                        <div className="mb-5 border-b border-[#99b8e0] pb-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="tech-dot-pulse h-2 w-2 rounded-full bg-[#2f88df] shadow-[0_0_10px_rgba(47,136,223,0.62)]" />
                                    <span className="font-['Inter'] text-xs uppercase tracking-[0.35em] text-[#355f97]">
                                        Lễ Tốt Nghiệp 2026
                                    </span>
                                </div>
                                <span className="font-['Inter'] text-[0.7rem] uppercase tracking-[0.3em] text-[#4d73a8]">
                                    Thư mời chính thức
                                </span>
                            </div>
                            <p className="mt-3 font-['JetBrains_Mono','Consolas','Courier_New',monospace] text-[0.68rem] uppercase tracking-[0.18em] text-[#38679f]">
                                protocol://huit.graduation.invite | node: ui-hologram
                            </p>
                        </div>

                        <InvitationBackContent
                            isOpen
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
                </motion.article>
            </motion.div>
        </div>
    )
}

export default GraduationInvitationCard
