"use client";

import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <div>
      <ThemeProvider enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
    </div>
  );
};

export default Providers;
