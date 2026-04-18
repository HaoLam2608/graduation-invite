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
                <h3 className="mt-3 font-['Playfair_Display'] text-3xl leading-tight text-transparent gold-text sm:text-4xl">
                    {isAttending ? 'Cảm ơn anh/chị/em đã xác nhận tham gia' : 'Lấy làm tiếc vì anh/chị/em không thể tham gia'}
                </h3>
                <p className="mt-3 font-['Inter'] text-base leading-relaxed text-[#e5efff] sm:text-lg">
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
