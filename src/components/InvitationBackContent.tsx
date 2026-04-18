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
                Trân trọng kính mời anh/chị/em/bạn  đến tham dự buổi lễ đánh dấu cột mốc đặc biệt của
                <span className="ml-2 font-semibold text-transparent gold-text">{invitation.hostName}</span>.
            </motion.p>

            <motion.div
                variants={lineVariants}
                className="flex flex-wrap items-center gap-2"
            >
                <span className="tech-border-pulse rounded-full border border-[#8fb4e2] bg-[#edf5ff] px-3 py-1 font-['JetBrains_Mono','Consolas','Courier_New',monospace] text-[0.65rem] uppercase tracking-[0.14em] text-[#2f5f99]">
                    module: graduation.invite
                </span>
                <span className="tech-border-pulse inline-flex items-center gap-2 rounded-full border border-[#8fb4e2] bg-[#e5f0ff] px-3 py-1 font-['JetBrains_Mono','Consolas','Courier_New',monospace] text-[0.65rem] uppercase tracking-[0.14em] text-[#2f5f99]">
                    <span className="tech-dot-pulse h-1.5 w-1.5 rounded-full bg-[#2f88df]" />
                    status: online
                </span>
                <span className="tech-border-pulse rounded-full border border-[#8fb4e2] bg-[#e5f0ff] px-3 py-1 font-['JetBrains_Mono','Consolas','Courier_New',monospace] text-[0.65rem] uppercase tracking-[0.14em] text-[#2f5f99]">
                    mode: one-face card
                </span>
            </motion.div>

            <motion.div
                variants={lineVariants}
                className="relative grid gap-4 overflow-hidden rounded-2xl border border-[#9fbee6] bg-[linear-gradient(155deg,#e9f3ff_0%,#dcecff_46%,#cfe2fb_100%)] p-3 sm:grid-cols-[auto_1fr] sm:p-4"
            >
                <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(124,164,220,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(124,164,220,0.24)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="tech-scanline opacity-35" />
                <div className="h-32 w-24 overflow-hidden rounded-xl border border-[#a8c5e9] bg-[#d7e8ff] sm:h-36 sm:w-28">
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
                <div className="relative space-y-2 rounded-xl border border-[#a8c4e8]/85 bg-[#e8f2ff]/82 p-3">
                    <p className="font-['JetBrains_Mono','Consolas','Courier_New',monospace] text-[0.64rem] uppercase tracking-[0.16em] text-[#5b7fb3]">
                        system overview
                    </p>
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
                    className="relative mt-3 overflow-hidden rounded-2xl border border-[#7fa8dc] bg-[linear-gradient(160deg,#e4f0ff_0%,#d3e4fb_100%)] p-4 shadow-[0_14px_28px_rgba(14,48,96,0.28)] sm:p-5"
                >
                    <div className="tech-circuit-map opacity-12" />
                    <div className="tech-scanline opacity-40" />

                    <div className="relative">
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
                                    className="rounded-xl border border-[#bfd0ea] bg-white/92 px-3 py-2 text-[#1e467e] outline-none transition duration-300 focus:border-[#3676c3] focus:ring-2 focus:ring-[#6fa9e6]/30 focus:shadow-[0_0_0_1px_rgba(54,118,195,0.22),0_0_14px_rgba(76,141,215,0.22)]"
                                    placeholder="Nhập họ tên của anh/chị/em/bạn "
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
                                    pattern={'^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'}
                                    title="Email hợp lệ, ví dụ: ten@example.com"
                                    autoComplete="email"
                                    className="rounded-xl border border-[#bfd0ea] bg-white/92 px-3 py-2 text-[#1e467e] outline-none transition duration-300 focus:border-[#3676c3] focus:ring-2 focus:ring-[#6fa9e6]/30 focus:shadow-[0_0_0_1px_rgba(54,118,195,0.22),0_0_14px_rgba(76,141,215,0.22)]"
                                    placeholder="you@example.com"
                                />
                            </label>

                            <label className="flex flex-col gap-1 text-sm font-medium text-[#2e5288]">
                                Số điện thoại
                                <input
                                    required
                                    type="tel"
                                    name="guestPhone"
                                    value={formData.guestPhone}
                                    onChange={onInputChange}
                                    inputMode="tel"
                                    autoComplete="tel"
                                    pattern={'^(?:\\+84|84|0)(?:3|5|7|8|9)\\d{8}$'}
                                    title="Số di động Việt Nam, ví dụ: 0912345678 hoặc +84912345678"
                                    className="rounded-xl border border-[#bfd0ea] bg-white/92 px-3 py-2 text-[#1e467e] outline-none transition duration-300 focus:border-[#3676c3] focus:ring-2 focus:ring-[#6fa9e6]/30 focus:shadow-[0_0_0_1px_rgba(54,118,195,0.22),0_0_14px_rgba(76,141,215,0.22)]"
                                    placeholder="0912345678 hoặc +84912345678"
                                />
                            </label>

                            <label className="flex flex-col gap-1 text-sm font-medium text-[#2e5288]">
                                Trạng thái
                                <select
                                    name="attendance"
                                    value={formData.attendance}
                                    onChange={onInputChange}
                                    className="rounded-xl border border-[#bfd0ea] bg-white/92 px-3 py-2 text-[#1e467e] outline-none transition duration-300 focus:border-[#3676c3] focus:ring-2 focus:ring-[#6fa9e6]/30 focus:shadow-[0_0_0_1px_rgba(54,118,195,0.22),0_0_14px_rgba(76,141,215,0.22)]"
                                >
                                    <option value="Tham gia">Tham gia</option>
                                    <option value="Không thể tham gia">Không thể tham gia</option>
                                </select>
                            </label>

                            <label className="flex flex-col gap-1 text-sm font-medium text-[#2e5288] sm:col-span-2">
                                Lời nhắn
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={onInputChange}
                                    rows={3}
                                    className="rounded-xl border border-[#bfd0ea] bg-white/92 px-3 py-2 text-[#1e467e] outline-none transition duration-300 focus:border-[#3676c3] focus:ring-2 focus:ring-[#6fa9e6]/30 focus:shadow-[0_0_0_1px_rgba(54,118,195,0.22),0_0_14px_rgba(76,141,215,0.22)]"
                                    placeholder="Gửi lời nhắn"
                                />
                            </label>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="submit"
                                disabled={submitState === 'loading'}
                                className="inline-flex items-center justify-center rounded-full border border-[#7ea5da] bg-[linear-gradient(135deg,#103b76_0%,#1d5ca8_100%)] px-6 py-3 font-['Inter'] text-xs uppercase tracking-[0.2em] text-white shadow-[0_10px_20px_rgba(10,36,79,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(10,44,92,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
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
                    </div>
                </motion.form>
            )}
        </motion.div>
    )
}

export default InvitationBackContent
