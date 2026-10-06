import type { Pair } from './data/pairs';

declare global {
  namespace App {
    interface Locals {
      analysis?: Pair;
    }
  }
}
