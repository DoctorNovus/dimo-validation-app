'use client';

import dynamic from "next/dynamic";
import DimoLogin from "./DimoLogin";

import { useState } from "react";

const Wrapper = dynamic(() => import("./DimoWrapper"), { ssr: false });

export default function DimoInterface() {
    const [isAuthorized, setAuthorized] = useState(false);

    return (
        <Wrapper>
            <DimoLogin />
        </Wrapper>
    )
}