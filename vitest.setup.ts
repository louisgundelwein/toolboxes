import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "",
}));

// Mock next-intl
vi.mock("next-intl/server", () => ({
  getTranslations: () => {
    return (key: string) => key;
  },
}));
