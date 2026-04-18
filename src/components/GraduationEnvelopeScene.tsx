import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GraduationInvitationCard from './GraduationInvitationCard'

function GraduationEnvelopeScene() {
    const [isOpened, setIsOpened] = useState(false)

    const handleOpenEnvelope = () => {
        if (!isOpened) {
            setIsOpened(true)
        }
    }

    return (
        <section className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-6 sm:px-8 lg:px-10">
            <div className="relative h-[min(94vh,56rem)] w-full max-w-5xl">
                <AnimatePresence>
                    {isOpened && (
                        <motion.div
                            key="opened-card"
                            initial={{ opacity: 0, y: 230, scale: 0.74 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 48, scale: 0.96 }}
                            transition={{
                                duration: 1.1,
                                delay: 0.48,
                                ease: [0.2, 0.65, 0.3, 0.95],
                            }}
                            className="absolute inset-0 z-30 flex items-center justify-center"
                        >
                            <div className="w-[min(92vw,58rem)]">
                                <GraduationInvitationCard embedded showToggleButton={false} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute left-1/2 top-1/2 z-20 w-[min(92vw,44rem)] -translate-x-1/2 -translate-y-1/2 perspective-[1000px] [perspective:1000px]">
                    <motion.div
                        initial={false}
                        animate={isOpened ? { opacity: 0, scale: 0.9, y: 120 } : { opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: isOpened ? 0.75 : 0.35,
                            delay: isOpened ? 0.9 : 0,
                            ease: [0.22, 0.61, 0.36, 1],
                        }}
                        className="relative h-[21rem] w-full cursor-pointer [transform-style:preserve-3d] sm:h-[24rem]"
                        onClick={handleOpenEnvelope}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if ((event.key === 'Enter' || event.key === ' ') && !isOpened) {
                                event.preventDefault()
                                handleOpenEnvelope()
                            }
                        }}
                        aria-label="Mở phong bì lễ tốt nghiệp"
                    >
                        <div className="absolute inset-0 rounded-[1.75rem] border border-[#5f8fc4]/80 bg-[linear-gradient(155deg,#1f5e9c_0%,#2e74b8_42%,#5fa3e3_100%)] shadow-[0_34px_70px_rgba(33,75,128,0.34),inset_0_1px_0_rgba(227,242,255,0.38),inset_0_-14px_22px_rgba(34,78,131,0.26)]" />
                        <div className="pointer-events-none absolute inset-[1px] rounded-[1.65rem] bg-[linear-gradient(180deg,rgba(232,245,255,0.34)_0%,rgba(174,209,245,0.16)_20%,transparent_42%),radial-gradient(circle_at_22%_16%,rgba(164,201,241,0.3),transparent_44%),radial-gradient(circle_at_82%_78%,rgba(96,149,218,0.26),transparent_50%),linear-gradient(145deg,rgba(49,103,171,0.54)_0%,rgba(71,136,206,0.34)_100%)]" />

                        <div className="pointer-events-none absolute inset-x-0 top-[16%] z-10 flex justify-center">
                            <motion.div
                                initial={false}
                                animate={isOpened ? { y: -168, opacity: 0 } : { y: 30, opacity: 0.98 }}
                                transition={{
                                    duration: isOpened ? 0.9 : 0.35,
                                    delay: isOpened ? 0.42 : 0,
                                    ease: [0.2, 0.65, 0.3, 0.95],
                                }}
                                className="h-[74%] w-[68%] rounded-[1.1rem] border border-[#9fc3ea]/72 bg-[linear-gradient(180deg,rgba(94,152,215,0.95)_0%,rgba(67,128,195,0.9)_100%)] shadow-[0_14px_26px_rgba(37,80,131,0.34)] sm:w-[70%]"
                            >
                                <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-[linear-gradient(145deg,rgba(217,237,255,0.34)_0%,rgba(120,170,231,0.2)_45%,rgba(184,218,255,0.26)_100%)]">
                                    <div className="absolute inset-x-6 top-6 h-px bg-[linear-gradient(90deg,transparent,rgba(236,247,255,0.92),transparent)]" />
                                    <div className="absolute inset-x-6 top-10 h-px bg-[linear-gradient(90deg,transparent,rgba(207,230,255,0.62),transparent)]" />
                                    <div className="absolute inset-x-6 bottom-8 h-px bg-[linear-gradient(90deg,transparent,rgba(196,224,255,0.52),transparent)]" />
                                </div>
                            </motion.div>
                        </div>

                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[55%] rounded-b-[1.75rem] bg-[linear-gradient(180deg,rgba(220,240,255,0.35)_0%,rgba(131,184,236,0.58)_14%,rgba(58,121,191,0.92)_48%,rgba(79,149,219,0.98)_100%)] shadow-[inset_0_14px_24px_rgba(41,91,149,0.34)]" />
                        <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[58%] w-1/2 [clip-path:polygon(0_0,100%_100%,0_100%)] bg-[linear-gradient(145deg,#2467aa_0%,#3f88cf_54%,#6db0ec_100%)]" />
                        <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-[58%] w-1/2 [clip-path:polygon(100%_0,100%_100%,0_100%)] bg-[linear-gradient(215deg,#2467aa_0%,#3f88cf_54%,#6db0ec_100%)]" />
                        <div className="pointer-events-none absolute bottom-[39%] left-[13%] z-20 h-px w-[26%] bg-[linear-gradient(90deg,transparent,rgba(237,249,255,0.66),transparent)]" />
                        <div className="pointer-events-none absolute bottom-[39%] right-[13%] z-20 h-px w-[26%] bg-[linear-gradient(90deg,transparent,rgba(237,249,255,0.66),transparent)]" />
                        <div className="pointer-events-none absolute bottom-[54%] left-[10%] right-[10%] z-20 h-px bg-[linear-gradient(90deg,transparent,rgba(208,233,255,0.6),transparent)]" />
                        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[56%] w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(192,223,255,0.18)_0%,rgba(222,241,255,0.74)_100%)]" />

                        <motion.div
                            initial={false}
                            animate={isOpened ? { rotateX: 180 } : { rotateX: 0 }}
                            transition={{
                                duration: isOpened ? 0.95 : 0.35,
                                delay: isOpened ? 0.2 : 0,
                                ease: [0.2, 0.7, 0.2, 1],
                            }}
                            style={{
                                transformOrigin: 'top center',
                                filter: 'drop-shadow(0 10px 14px rgba(34,75,124,0.36)) drop-shadow(0 4px 6px rgba(34,75,124,0.3))',
                            }}
                            className="pointer-events-none absolute left-0 top-0 z-30 h-[57%] w-full overflow-hidden rounded-t-[1.75rem] border border-[#6d9fd4] bg-[linear-gradient(180deg,#3278be_0%,#4b93d7_45%,#79b7ee_100%)] [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)]"
                        >
                            <div className="absolute inset-x-[2%] top-0 h-px bg-white/72" />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(239,249,255,0.34)_0%,rgba(147,190,235,0.2)_28%,transparent_62%)]" />
                            <div className="absolute inset-x-[10%] top-[16%] h-px bg-[linear-gradient(90deg,transparent,rgba(230,246,255,0.68),transparent)]" />
                            <div className="absolute bottom-[20%] left-1/2 h-[58%] w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(226,242,255,0.22),rgba(208,232,255,0.62))]" />
                        </motion.div>

                        <div className="pointer-events-none absolute left-1/2 top-[calc(43%+20px)] z-30 h-[5.9rem] w-[5.9rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(50,100,160,0.34)_0%,rgba(50,100,160,0.18)_48%,rgba(50,100,160,0)_76%)] blur-[2px]" />

                        <AnimatePresence>
                            {!isOpened && (
                                <div className="absolute left-1/2 top-[calc(43%+20px)] z-40 -translate-x-1/2 -translate-y-1/2">
                                    <motion.button
                                        key="wax-seal"
                                        type="button"
                                        initial={{ opacity: 0, scale: 0.7, y: -8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.38, ease: [0.2, 0.7, 0.2, 1] }}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            handleOpenEnvelope()
                                        }}
                                        className="relative flex h-[5.75rem] w-[5.75rem] items-center justify-center overflow-hidden rounded-full border border-[#9db7de]/70 bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.98)_0%,rgba(228,238,252,0.96)_45%,rgba(200,220,246,0.96)_100%)] p-1.5 shadow-[0_18px_28px_rgba(5,12,24,0.5),0_4px_0_rgba(8,20,38,0.32),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-10px_14px_rgba(86,118,165,0.32)]"
                                        aria-label="Mở phong bì bằng logo HUIT"
                                    >
                                        <span className="pointer-events-none absolute inset-[5px] rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,0.75),inset_0_-7px_11px_rgba(80,112,158,0.35)]" />
                                        <span className="pointer-events-none absolute inset-[8px] rounded-full border border-white/60" />
                                        <img
                                            src="/images/huitlogo.png"
                                            alt="Logo HUIT"
                                            className="relative h-full w-full rounded-full object-contain drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]"
                                            draggable={false}
                                        />
                                    </motion.button>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <AnimatePresence>
                        {!isOpened && (
                            <div className="pointer-events-none absolute left-1/2 top-[calc(100%+3.2rem)] z-40 w-[min(92vw,44rem)] -translate-x-1/2 px-4">
                                <motion.p
                                    key="envelope-hint"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.35 }}
                                    className="text-center font-['Inter'] text-xs uppercase tracking-[0.24em] text-[#3c6698]/92 sm:text-sm"
                                >
                                    Nhấn vào phong bì hoặc logo HUIT để mở thiệp
                                </motion.p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

export default GraduationEnvelopeScene