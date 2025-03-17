'use client';

import dynamic from "next/dynamic";

const Wrapper = dynamic(() => import("./DimoWrapper"), { ssr: false });

export default function DimoInterface({ children }) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}