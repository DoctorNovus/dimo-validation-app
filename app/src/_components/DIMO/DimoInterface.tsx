'use client';

import dynamic from "next/dynamic";
import DimoCore from "./DimoCore";

const Wrapper = dynamic(() => import("./DimoWrapper"), { ssr: false });

export default function DimoInterface() {
    return (
        <Wrapper>
            <DimoCore />
        </Wrapper>
    )
}