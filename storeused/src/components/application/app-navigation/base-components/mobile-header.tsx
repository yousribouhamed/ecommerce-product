"use client";

import type { PropsWithChildren } from "react";
import { X as CloseIcon } from "@untitledui/icons";
import {
    Button as AriaButton,
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { cx } from "@/lib/utils/cx";

export const MobileNavigationHeader = ({ children }: PropsWithChildren) => {
    return (
        <AriaDialogTrigger>
            <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between bg-primary px-4 lg:hidden">
                <UntitledLogo />

                <AriaButton
                    aria-label="Expand navigation menu"
                    className="group flex items-center justify-center rounded-md bg-white p-2.5 outline-focus-ring hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <svg
                        width="20"
                        height="14"
                        viewBox="0 0 20 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition duration-200 ease-in-out group-aria-expanded:opacity-0"
                    >
                        <path
                            d="M0 1H20"
                            stroke="#1C1C1C"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M0 7H20"
                            stroke="#1C1C1C"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M0 13H20"
                            stroke="#1C1C1C"
                            strokeWidth="1.5"
                        />
                    </svg>
                    <CloseIcon className="absolute size-6 text-black opacity-0 transition duration-200 ease-in-out group-aria-expanded:opacity-100" />
                </AriaButton>
            </header>

            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    cx(
                        "fixed inset-0 z-50 cursor-pointer bg-overlay/70 backdrop-blur-md lg:hidden",
                        isEntering && "duration-300 ease-in-out animate-in fade-in",
                        isExiting && "duration-200 ease-in-out animate-out fade-out",
                    )
                }
            >
                {({ state }) => (
                    <AriaModal className="w-full max-w-sm cursor-auto will-change-transform">
                        <AriaDialog className="h-dvh outline-hidden focus:outline-hidden">
                            <AriaButton
                                aria-label="Close navigation menu"
                                onPress={() => state.close()}
                                className="absolute top-3 right-3 flex cursor-pointer items-center justify-center rounded-lg p-2 text-fg-secondary outline-focus-ring hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <CloseIcon className="size-6" />
                            </AriaButton>
                            {children}
                        </AriaDialog>
                    </AriaModal>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
};
