import type { ComponentType, ReactNode, SVGProps } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";

import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import AutorenewOutlined from "@mui/icons-material/AutorenewOutlined";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import CalculateOutlined from "@mui/icons-material/CalculateOutlined";
import CallMadeOutlined from "@mui/icons-material/CallMadeOutlined";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import Check from "@mui/icons-material/Check";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CreditScoreOutlined from "@mui/icons-material/CreditScoreOutlined";
import DirectionsCarOutlined from "@mui/icons-material/DirectionsCarOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import FlareOutlined from "@mui/icons-material/FlareOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import HandshakeOutlined from "@mui/icons-material/HandshakeOutlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";
import MoodOutlined from "@mui/icons-material/MoodOutlined";
import PercentOutlined from "@mui/icons-material/PercentOutlined";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutlineOutlined";
import SavingsOutlined from "@mui/icons-material/SavingsOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import SpeedOutlined from "@mui/icons-material/SpeedOutlined";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import StarRounded from "@mui/icons-material/StarRounded";
import StorefrontOutlined from "@mui/icons-material/StorefrontOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import SwapHorizOutlined from "@mui/icons-material/SwapHorizOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";

type IconProps = SVGProps<SVGSVGElement>;

/** The white rounded chip that sits behind feature icons. Shared so every surface uses the same size/shadow. */
export function IconBox({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`w-10 h-9 shrink-0 rounded-lg bg-white flex items-center justify-center shadow-[0px_1px_3px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </span>
  );
}

/** The Carmonia mark — a ring with a notched inner counter. Bespoke brand asset, not a stock icon. */
export function Logo(props: IconProps) {
  return (
    <svg height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16 3C27 3 31 10 31 16C31 22 27 29 16 29C5 29 1 22 1 16C1 10 5 3 16 3ZM15 9C11.134 9 8 12.134 8 16C8 19.866 11.134 23 15 23H17C20.866 23 24 19.866 24 16C24 12.134 20.866 9 17 9H15Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Wrap a Material UI icon so it honours the conventions the call sites already use:
 * `width`/`height` (px) set the rendered size, `className` colours it via `currentColor`.
 * MUI icons size via `font-size` (their svg is 1em), so we map the size onto `fontSize`
 * and drop the svg-only props (`viewBox`, `color`) that don't apply to an MUI icon.
 */
function muiIcon(Icon: ComponentType<SvgIconProps>, defaultSize: number) {
  return function Icon_({ width, height, viewBox: _viewBox, color: _color, style, ...rest }: IconProps) {
    const size = width ?? height ?? defaultSize;
    return <Icon {...(rest as SvgIconProps)} style={{ fontSize: size as number | string, ...(style ?? {}) }} />;
  };
}

export const ChevronRight = muiIcon(ChevronRightIcon, 16);
export const ChevronLeft = muiIcon(ChevronLeftIcon, 16);
export const ChevronDown = muiIcon(ExpandMore, 14);
export const Speedometer = muiIcon(SpeedOutlined, 20);
export const Clock = muiIcon(AccessTimeOutlined, 20);
export const Heart = muiIcon(FavoriteBorderOutlined, 20);
export const DollarCircle = muiIcon(MonetizationOnOutlined, 20);
export const Globe = muiIcon(PublicOutlined, 20);
export const Smiley = muiIcon(MoodOutlined, 16);
export const ArrowRight = muiIcon(ArrowForwardOutlined, 16);
export const Sparkle = muiIcon(AutoAwesomeOutlined, 16);
export const Burst = muiIcon(FlareOutlined, 16);
export const Chart = muiIcon(BarChartOutlined, 16);
export const CheckCircle = muiIcon(CheckCircleOutlined, 20);
export const MinusCircle = muiIcon(RemoveCircleOutline, 20);
export const CrossCircle = muiIcon(CancelOutlined, 20);
export const BadgeCheck = muiIcon(VerifiedOutlined, 16);
export const Shield = muiIcon(ShieldOutlined, 72);
export const CheckSmall = muiIcon(Check, 16);

/* ---- car-finance icon set ---- */
export const Car = muiIcon(DirectionsCarOutlined, 20);
export const CreditScore = muiIcon(CreditScoreOutlined, 20);
export const Calculator = muiIcon(CalculateOutlined, 20);
export const Handshake = muiIcon(HandshakeOutlined, 20);
export const Percent = muiIcon(PercentOutlined, 16);
export const Search = muiIcon(SearchOutlined, 20);
export const Swap = muiIcon(SwapHorizOutlined, 20);
export const Refresh = muiIcon(AutorenewOutlined, 20);
export const Groups = muiIcon(GroupsOutlined, 16);
export const Savings = muiIcon(SavingsOutlined, 20);
export const Tag = muiIcon(LocalOfferOutlined, 16);
export const FactCheck = muiIcon(FactCheckOutlined, 16);
export const Star = muiIcon(StarRounded, 16);
export const Storefront = muiIcon(StorefrontOutlined, 28);
export const Bank = muiIcon(AccountBalanceOutlined, 28);
export const Direct = muiIcon(CallMadeOutlined, 28);
export const Support = muiIcon(SupportAgentOutlined, 16);
