import { motion } from 'framer-motion'
import type { RsvpOutcome } from './invitationTypes'

type RsvpResultNoticeProps = {
    outcome: Exclude<RsvpOutcome, null>
    message: string
    onClose: () => void
}

function RsvpResultNotice({ outcome, message, onClose }: RsvpResultNoticeProps) {
    const isAttending = outcome === 'attending'

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.65, 0.3, 0.95] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(4,18,40,0.62)] p-4"
        >
            <section className="w-full max-w-xl rounded-2xl border border-[#7fa8de] bg-[linear-gradient(165deg,#0d2f63_0%,#123a75_55%,#194889_100%)] p-5 shadow-[0_24px_55px_rgba(9,28,60,0.55)] sm:p-6">
                <p className="font-['Inter'] text-xs uppercase tracking-[0.28em] text-[#a7c9f5]">
                    Trạng thái xác nhận
                </p>
                <div className="mt-3 flex items-start gap-3 rounded-xl bg-[#e8f3ff] px-4 py-3">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d6e8ff] text-[#194b87]">
                        {isAttending ? (
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
                                <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
                                <path d="M8 14c1 1.4 2.3 2 4 2s3-.6 4-2" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
                                <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
                                <path d="M8 16c1-1.4 2.3-2 4-2s3 .6 4 2" />
                            </svg>
                        )}
                    </span>
                    <h3 className="font-['Playfair_Display'] text-2xl leading-tight text-[#133d72] sm:text-3xl">
                        {isAttending ? 'Cảm ơn anh/chị/em/bạn đã xác nhận tham gia' : 'Lấy làm tiếc vì anh/chị/em/bạn không thể tham gia'}
                    </h3>
                </div>
                <p className="mt-3 rounded-xl bg-[#e8f3ff] px-4 py-3 font-['Inter'] text-base leading-relaxed text-[#133d72] sm:text-lg">
                    {message}
                </p>

                <div className="mt-5 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center rounded-full border border-[#9ec1ef] bg-white px-6 py-3 font-['Inter'] text-xs uppercase tracking-[0.2em] text-[#1b4a89] transition hover:bg-[#e8f2ff]"
                    >
                        Đóng
                    </button>
                </div>
            </section>
        </motion.div>
    )
}

export default RsvpResultNotice
