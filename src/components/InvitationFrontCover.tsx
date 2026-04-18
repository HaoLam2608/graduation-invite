import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { InvitationDetails } from './invitationTypes'

type InvitationFrontCoverProps = {
    isOpen: boolean
    invitation: InvitationDetails
    portraitSrc: string
    onContinue: () => void
}

function InvitationFrontCover({ isOpen, invitation, portraitSrc, onContinue }: InvitationFrontCoverProps) {
    const [imageError, setImageError] = useState(false)

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.div
                    key="cover"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '102%', opacity: 0.2 }}
                    transition={{ duration: 0.95, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute inset-0 z-20 cursor-pointer bg-[linear-gradient(145deg,#071a36_0%,#0a2a57_45%,#12396f_100%)] p-6 sm:p-8 lg:p-10"
                    aria-hidden="true"
                >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(117,167,236,0.18)_0%,transparent_40%,rgba(149,193,255,0.2)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(165,199,248,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(165,199,248,0.22)_1px,transparent_1px)] [background-size:40px_40px]" />

                    <div className="relative rounded-[1.5rem] border border-[#88adde]/55 bg-[linear-gradient(160deg,rgba(16,46,90,0.86),rgba(11,34,72,0.9))] p-5 shadow-[0_12px_30px_rgba(8,24,50,0.5)] sm:p-7 lg:p-8">
                        <div className="flex flex-col">
                            <div className="space-y-3">
                                <p className="font-['Inter'] text-xs uppercase tracking-[0.34em] text-[#8bb5ec]">
                                    Lời mời kỹ thuật số 2026
                                </p>
                                <h2 className="font-['Playfair_Display'] text-[clamp(2rem,5.3vw,3.35rem)] leading-[1.15] text-transparent gold-text">
                                    Thân mời tham dự Lễ Tốt Nghiệp
                                </h2>
                                <p className="max-w-2xl font-['Inter'] text-sm leading-relaxed text-[#cfe2ff] sm:text-base">
                                    Một thiết kế mang tinh thần công nghệ tối giản. Nhấn mở để xem đầy đủ thông tin và xác nhận tham dự.
                                </p>
                            </div>

                            <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                                <div className="rounded-2xl border border-[#739ed8]/50 bg-[rgba(12,36,76,0.66)] p-4 shadow-[0_10px_24px_rgba(7,22,47,0.35)] transition duration-300 hover:-translate-y-0.5 sm:p-5">
                                    <p className="font-['Inter'] text-[0.72rem] uppercase tracking-[0.22em] text-[#8eb8ef]">
                                        Thông tin nổi bật
                                    </p>
                                    <div className="mt-4 space-y-3 rounded-xl border border-[#6f9ad4]/60 bg-[rgba(15,44,90,0.78)] p-3">
                                        <p className="font-['Inter'] text-xs uppercase tracking-[0.2em] text-[#9ec2f2]">
                                            Thời gian
                                        </p>
                                        <p className="font-['Inter'] text-sm text-[#e5efff] sm:text-base">
                                            {invitation.dateText} - {invitation.timeText}
                                        </p>
                                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#81a9df] to-transparent" />
                                        <p className="font-['Inter'] text-xs uppercase tracking-[0.2em] text-[#9ec2f2]">
                                            Địa điểm
                                        </p>
                                        <p className="font-['Inter'] text-sm text-[#e5efff] sm:text-base">
                                            {invitation.venue}
                                        </p>
                                    </div>
                                    <div className="mt-4 rounded-xl border border-[#719cd7]/45 bg-[rgba(20,52,102,0.75)] px-3 py-2">
                                        <p className="font-['Inter'] text-xs italic leading-relaxed text-[#d4e5ff] sm:text-sm">
                                            "Mỗi dòng code hôm nay là nền tảng cho thành công ngày mai."
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#739ed8]/50 bg-[rgba(12,36,76,0.66)] p-4 shadow-[0_10px_24px_rgba(7,22,47,0.35)] transition duration-300 hover:-translate-y-0.5 sm:p-5">
                                    <p className="font-['Inter'] text-[0.72rem] uppercase tracking-[0.22em] text-[#8eb8ef]">
                                        Ảnh chân dung
                                    </p>
                                    <div className="mt-3 aspect-[3/4] overflow-hidden rounded-xl border border-[#82aadd]/55 bg-[rgba(17,45,90,0.85)]">
                                        {!imageError ? (
                                            <img
                                                src={portraitSrc}
                                                alt="Ảnh tốt nghiệp của Lâm Nguyễn Anh Hào"
                                                className="h-full w-full object-contain object-center"
                                                onError={() => setImageError(true)}
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <span className="font-['Playfair_Display'] text-2xl text-[#cfe3ff]">LNAH</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-3 font-['Inter'] text-xs uppercase tracking-[0.2em] text-[#b2cdf1]">
                                        {invitation.hostName}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 pt-5">
                                <div className="flex items-center justify-between gap-3 border-t border-[#749fd9]/45 pt-4">
                                    <p className="font-['Inter'] text-xs uppercase tracking-[0.26em] text-[#a4c5f1]">
                                        Năm 2026 | CNTT
                                    </p>
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            onContinue()
                                        }}
                                        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#8cb5ea] bg-[#1a4f94] px-4 py-2 font-['Inter'] text-[0.65rem] uppercase tracking-[0.2em] text-[#eef5ff] shadow-[0_8px_18px_rgba(8,27,58,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2360ad]"
                                        aria-label="Tiếp tục để xem mặt sau thiệp"
                                    >
                                        Tiếp tục
                                        <span aria-hidden="true">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default InvitationFrontCover
