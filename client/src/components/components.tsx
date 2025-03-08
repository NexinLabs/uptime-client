import { lazy } from "react";

export const NavBar = lazy( async ()=> import("@/components/block/NavBar"))
export const Footer = lazy( async ()=> import("@/components/block/Footer"))