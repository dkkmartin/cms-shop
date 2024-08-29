import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const IP = '192.168.0.9';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
