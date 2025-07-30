import { AiOutlineFieldNumber } from "react-icons/ai";
import { BsMailboxFlag } from "react-icons/bs";
import { FaHouse, FaCity } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";

export const SEARCH_FORM: {Icon: IconType, placeholder: string, name: string}[] = [
  {
    Icon: AiOutlineFieldNumber,
    placeholder: 'Enter your number',
    name: 'number'
  },
  {
    Icon: FaHouse,
    placeholder: 'Enter your street name',
    name: 'street'
  },
  {
    Icon: FaCity,
    placeholder: 'Enter your city',
    name: 'city'
  },
  {
    Icon: BsMailboxFlag,
    placeholder: 'Enter your postal code',
    name: 'postalCode'
  },
]