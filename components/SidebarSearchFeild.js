"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

function Spinner({ isActive = true }) {
    return (
        <div
            className={["spinner", isActive && "spinner-active"].join(" ")}
            role="progressbar"
            aria-busy={isActive ? true : false}
        />
    );
}

export default function SidebarSearchFeild() {
    const { replace } = useRouter();
    const pathName = usePathname();

    // 此為防止頻繁輸入而造成阻塞的hook
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term) => {
        const params = new URLSearchParams(window.location.search);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        startTransition(() => {
            replace(`${pathName}?${params.toString()}`);
        });
    };
    return (
        <div className="search" role="search">
            <label className="offscreen" htmlFor="sidebar-search-input">
                Search for a note by title
            </label>
            <input
                id="sidebar-search-input"
                placeholder="Search"
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Spinner isActive={isPending} />
        </div>
    );
}
