import { onBoardUser } from "@/src/features/auth/actions/index";

export default async function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await onBoardUser();

  return children;
}
