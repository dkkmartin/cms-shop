import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const IP = '192.168.0.9';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeAndRemoveHyphen(input: string): string {
  return input
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
