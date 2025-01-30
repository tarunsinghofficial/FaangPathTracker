"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Meta from "../public/assets/meta.png";
import Apple from "../public/assets/apple-logo.png";
import Amazon from "../public/assets/social.png";
import Netflix from "../public/assets/netflix.png";
import Google from "../public/assets/search.png";
import Microsoft from "../public/assets/microsoft.png";
import Oracle from "../public/assets/oracle.png";
import Adobe from "../public/assets/adobe.png";
import SAP from "../public/assets/sap.png";

const LOGOS = [
    { name: "Meta", path: Meta },
    { name: "Apple", path: Apple },
    { name: "Amazon", path: Amazon },
    { name: "Netflix", path: Netflix },
    { name: "Google", path: Google },
    { name: "Microsoft", path: Microsoft },
    { name: "Oracle", path: Oracle },
    { name: "Adobe", path: Adobe },
    { name: "SAP", path: SAP },
];

export function InfiniteLogoScroll() {
    return (
        <div className="relative flex overflow-hidden py-12">
            <div className="animate-infinite-scroll flex">
                {[...LOGOS, ...LOGOS].map((logo, index) => (
                    <Image
                        key={index}
                        src={logo.path}
                        alt={`${logo.name} logo`}
                        width={300}
                        height={120}
                        className="object-contain h-12 md:h-16 lg:h-24 w-auto flex items-center justify-center mx-8 grayscale hover:grayscale-0 transition-all duration-500"
                    />
                ))}
            </div>
        </div>
    );
} 