import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ChangeEvent, FormEvent } from 'react'
import type { Variants } from 'framer-motion'
import type { InvitationDetails, RsvpFormData, RsvpOutcome, SubmitState } from './invitationTypes'
import RsvpResultNotice from './RsvpResultNotice'

type InvitationBackContentProps = {
    isOpen: boolean
    invitation: InvitationDetails
    portraitSrc: string
    formData: RsvpFormData
    submitState: SubmitState
    submitMessage: string
    rsvpOutcome: RsvpOutcome
    onCloseResultPopup: () => void
    contentVariants: Variants
    lineVariants: Variants
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    onSubmitRsvp: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

function InvitationBackContent({
    isOpen,
    invitation,
    portraitSrc,
    formData,
    submitState,
    submitMessage,
    rsvpOutcome,
    onCloseResultPopup,
    contentVariants,
    lineVariants,
    onInputChange,
    onSubmitRsvp,
}: InvitationBackContentProps) {
    const [imageError, setImageError] = useState(false)
    const showResultPage = submitState === 'success' && rsvpOutcome !== null

    return (
        <motion.div
            variants={contentVariants}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            className="space-y-4 sm:space-y-5"
        >
            <motion.p
                variants={lineVariants}
                className="font-['Inter'] text-sm uppercase tracking-[0.35em] text-[#355f96]"
            >
                Kính gửi: {invitation.recipientName}
            </motion.p>

            <motion.h1
                variants={lineVariants}
                className="font-['Playfair_Display'] text-3xl leading-tight text-transparent sm:text-4xl lg:text-5xl gold-text"
            >
                Thư mời dự Lễ Tốt Nghiệp
            </motion.h1>

            <motion.p
                variants={lineVariants}
                className="font-['Inter'] text-base leading-relaxed text-[#1f4579] sm:text-lg"
            >
                Trân trọng kính mời anh/chị/em đến tham dự buổi lễ đánh dấu cột mốc đặc biệt của
                <span className="ml-2 font-semibold text-transparent gold-text">{invitation.hostName}</span>.
            </motion.p>

            <motion.div
                variants={lineVariants}
                className="grid gap-4 rounded-2xl border border-[#b3c8e8] bg-[#f7faff]/90 p-3 sm:grid-cols-[auto_1fr] sm:p-4"
            >
                <div className="h-32 w-24 overflow-hidden rounded-xl border border-[#bad0ee] bg-[#eff5ff] sm:h-36 sm:w-28">
                    {!imageError ? (
                        <img
                            src={portraitSrc}
                            alt="Ảnh tốt nghiệp của Lâm Nguyễn Anh Hào"
                            className="h-full w-full object-contain object-center"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <span className="font-['Playfair_Display'] text-lg text-[#8b7642]">LNAH</span>
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <p className="font-['Inter'] text-sm uppercase tracking-[0.2em] text-[#4e73a8] sm:text-base">
                        {invitation.degree}
                    </p>
                    <p className="font-['Inter'] text-sm text-[#264b82] sm:text-base">
                        <span className="font-semibold text-transparent gold-text">Thời gian:</span> {invitation.dateText} - {invitation.timeText}
                    </p>
                    <p className="font-['Inter'] text-sm text-[#264b82] sm:text-base">
                        <span className="font-semibold text-transparent gold-text">Địa điểm:</span> {invitation.venue}
                    </p>
                </div>
            </motion.div>

            <motion.p
                variants={lineVariants}
                className="font-['Inter'] text-sm italic leading-relaxed text-[#35598d] sm:text-base"
            >
                "{invitation.note}"
            </motion.p>

            {showResultPage ? (
                <RsvpResultNotice
                    outcome={rsvpOutcome}
                    message={submitMessage}
                    onClose={onCloseResultPopup}
                />
            ) : (
                <motion.form
                    variants={lineVariants}
                    onSubmit={onSubmitRsvp}
                    className="mt-3 rounded-2xl border border-[#8cb1df] bg-[linear-gradient(160deg,#f1f7ff_0%,#e2eeff_100%)] p-4 shadow-[0_14px_28px_rgba(14,48,96,0.25)] sm:p-5"
                >
                    <div className="mb-4">
                        <h3 className="font-['Playfair_Display'] text-2xl text-[#214c87] sm:text-3xl">
                            Xác nhận tham gia
                        </h3>
                        <p className="mt-1 font-['Inter'] text-sm text-[#4f6f9c]">
                            Điền thông tin để gửi xác nhận trực tiếp đến email của Hào.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="flex flex-col gap-1 text-sm font-medium text-[#2e5288]">
                            Họ và tên
                            <input
                                required
                                type="text"
                                name="guestName"
                                value={formData.guestName}
                                onChange={onInputChange}
                                className="rounded-xl border border-[#bfd0ea] bg-white px-3 py-2 text-[#1e467e] outline-none transition focus:border-[#4f7cbb] focus:ring-2 focus:ring-[#7fa3d8]/30"
                                placeholder="Nhập họ tên của anh/chị/em"
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm font-medium text-[#2e5288]">
                            Email
                            <input
                                required
                                type="email"
                                name="guestEmail"
                                value={formData.guestEmail}
                                onChange={onInputChange}
                                className="rounded-xl border border-[#bfd0ea] bg-white px-3 py-2 text-[#1e467e] outline-none transition focus:border-[#4f7cbb] focus:ring-2 focus:ring-[#7fa3d8]/30"
                                placeholder="you@example.com"
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm font-medium text-[#2e5288]">
                            Số điện thoại
                            <input
                                type="tel"
                                name="guestPhone"
                                value={formData.guestPhone}
                                onChange={onInputChange}
                                className="rounded-xl border border-[#bfd0ea] bg-white px-3 py-2 text-[#1e467e] outline-none transition focus:border-[#4f7cbb] focus:ring-2 focus:ring-[#7fa3d8]/30"
                                placeholder="090xxxxxxx"
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm font-medium text-[#2e5288]">
                            Trạng thái
                            <select
                                name="attendance"
                                value={formData.attendance}
                                onChange={onInputChange}
                                className="rounded-xl border border-[#bfd0ea] bg-white px-3 py-2 text-[#1e467e] outline-none transition focus:border-[#4f7cbb] focus:ring-2 focus:ring-[#7fa3d8]/30"
                            >
                                <option value="Tham gia">Tham gia</option>
                                <option value="Không thể tham gia">Không thể tham gia</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-1 text-sm font-medium text-[#2e5288] sm:col-span-2">
                            Số lượng khách
                            <select
                                name="guestCount"
                                value={formData.guestCount}
                                onChange={onInputChange}
                                className="rounded-xl border border-[#bfd0ea] bg-white px-3 py-2 text-[#1e467e] outline-none transition focus:border-[#4f7cbb] focus:ring-2 focus:ring-[#7fa3d8]/30"
                            >
                                <option value="1">1 người</option>
                                <option value="2">2 người</option>
                                <option value="3">3 người</option>
                                <option value="4">4 người</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-1 text-sm font-medium text-[#2e5288] sm:col-span-2">
                            Lời nhắn
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={onInputChange}
                                rows={3}
                                className="rounded-xl border border-[#bfd0ea] bg-white px-3 py-2 text-[#1e467e] outline-none transition focus:border-[#4f7cbb] focus:ring-2 focus:ring-[#7fa3d8]/30"
                                placeholder="Gửi lời nhắn"
                            />
                        </label>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="submit"
                            disabled={submitState === 'loading'}
                            className="inline-flex items-center justify-center rounded-full border border-[#7ea5da] bg-[#103b76] px-6 py-3 font-['Inter'] text-xs uppercase tracking-[0.2em] text-white shadow-[0_10px_20px_rgba(10,36,79,0.35)] transition hover:bg-[#1a4a8a] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {submitState === 'loading' ? 'Đang gửi...' : 'Xác nhận'}
                        </button>

                        <p
                            className={`font-['Inter'] text-sm ${submitState === 'error'
                                ? 'text-red-700'
                                : submitState === 'loading'
                                    ? 'text-[#355d95]'
                                    : 'text-[#4f6f9c]'
                                }`}
                            role="status"
                            aria-live="polite"
                        >
                            {submitState === 'error' || submitState === 'loading'
                                ? submitMessage
                                : ''}
                        </p>
                    </div>
                </motion.form>
            )}
        </motion.div>
    )
}

export default InvitationBackContent
